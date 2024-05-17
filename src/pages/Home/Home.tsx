import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { LoadingSpinner } from "../../components/LoadingSpinner/LoadingSpinner";
import MovieShowCard from "../../components/MediaCard/MediaCard";
import { useInfiniteScroll } from "../../hooks/useInfiniteScroll";
import { useMedia } from "../../hooks/useMedia";
import { useSearchMedia } from "../../hooks/useSearchMedia";
import { useVideo } from "../../hooks/useVideo";
import Header from "../../layout/Header";
import { RootState } from "../../store";
import { mediaActions } from "../../store/media-slice";
import { searchActions } from "../../store/search-slice";
import { Media } from "../../types/media";
import "./home.scss";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const homeRef = useRef<HTMLDivElement>(null);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  const { activeTab, loading } = useSelector(
    (state: RootState) => state.activeTab
  );
  const { media, meta } = useSelector((state: RootState) => state.mediaShows);
  const { search } = useSelector((state: RootState) => state.search);

  const { getTopRatedMovies, getTopRatedShows } = useMedia();
  const { getSearchedMovies, getSearchedShows } = useSearchMedia();
  const { getMovieVideo, getShowVideo } = useVideo();
  const [isFetching, setIsFetching] = useInfiniteScroll(homeRef, hasMore);

  const setSearchedMedia = (page: number) => {
    activeTab === "movies" ? getSearchedMovies(page) : getSearchedShows(page);
  };

  const handleRedirect = async (item: Media) => {
    const videoId =
      activeTab === "movies"
        ? await getMovieVideo(item.id)
        : await getShowVideo(item.id);

    dispatch(
      mediaActions.setSelectedMedia({ ...item, videoId: videoId ?? null })
    );
    dispatch(searchActions.toggleSearch(true));
    navigate("/media-details");
  };

  useEffect(() => {
    if (isFetching && !loading) {
      setIsFetching(false);
      setPage(page + 1);
    }
  }, [isFetching, loading]);

  useEffect(() => {
    if (!meta) return;

    setHasMore(meta?.page < meta?.total_pages);
  }, [meta]);

  useEffect(() => {
    if (search.length < 3) {
      activeTab === "movies" ? getTopRatedMovies() : getTopRatedShows();
    } else {
      const timeoutId = setTimeout(() => {
        setPage(1);
        setSearchedMedia(1);
      }, 1000);
      return () => clearTimeout(timeoutId);
    }
  }, [search, activeTab]);

  useEffect(() => {
    if (search.length >= 3 && page > 1) setSearchedMedia(page);
  }, [page, search]);

  return (
    <div className="home">
      <Header />

      <div className="home__movie-show-list" ref={homeRef}>
        {loading && search.length >= 3 && page === 1 ? (
          <LoadingSpinner loading={loading} />
        ) : media.length > 0 ? (
          media.map((item: Media, key: number) => (
            <MovieShowCard
              onClick={() => handleRedirect(item)}
              item={item}
              key={key}
            />
          ))
        ) : (
          !loading && <p className="home__nothing-found">No results found</p>
        )}
      </div>
    </div>
  );
};

export default Home;
