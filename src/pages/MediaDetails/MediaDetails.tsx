import { DateTime } from "luxon";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import PlaceholderImage from "../../assets/placeholder-image.svg";
import BackButton from "../../components/BackButton/BackButton";
import { imageSize, posterSize } from "../../constants/imageSizes";
import { RootState } from "../../store";
import { createMediaLink } from "../../utils/createMediaLink";
import "./mediaDetails.scss";

const MediaDetails = () => {
  const navigate = useNavigate();
  const { selectedMedia } = useSelector((state: RootState) => state.mediaShows);
  const release_date =
    selectedMedia.release_date ?? selectedMedia.first_air_date ?? "";

  const handleBack = () => navigate("/");

  return (
    <div className="media-details">
      <div className="media-details__backdrop">
        <div className="backdrop__shadow" />
        <BackButton onClick={handleBack} />
        {selectedMedia.videoId ? (
          <iframe
            width="100%"
            height="500"
            allow="autoplay"
            src={`https://www.youtube.com/embed/${selectedMedia.videoId}?loop=1&controls=0&autoplay=1&mute=1`}
          ></iframe>
        ) : selectedMedia.backdrop_path ? (
          <img
            src={createMediaLink(selectedMedia.backdrop_path, imageSize)}
            className="backdrop__image"
            alt="backdrop__image"
          />
        ) : (
          <div className="backdrop__image---black" />
        )}
        <img
          src={
            selectedMedia.poster_path
              ? createMediaLink(selectedMedia.poster_path, posterSize)
              : PlaceholderImage
          }
          className="backdrop__poster"
          alt="poster"
        />
      </div>

      <div className="details__overview">
        <p className="overview__title">{selectedMedia.title}</p>
        <p className="overview__date">
          {DateTime.fromISO(release_date).toFormat("MMMM dd, yyyy")}
        </p>

        <label>Overview</label>
        <p className="overview__description">{selectedMedia.overview}</p>
      </div>
    </div>
  );
};

export default MediaDetails;
