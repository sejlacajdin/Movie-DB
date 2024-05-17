import { MutableRefObject, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "../../store";
import { searchActions } from "../../store/search-slice";
import "./search.scss";

interface Prop {
  tabRef: MutableRefObject<any[]>;
}

const Search = ({ tabRef }: Prop) => {
  const inputRef = useRef(null);
  const labelRef = useRef(null);
  const dispatch = useDispatch();
  const { active, search } = useSelector((state: RootState) => state.search);

  const handleClick = () => dispatch(searchActions.toggleSearch(!active));

  const handleClickOutside = (e: MouseEvent) => {
    if (
      inputRef.current === e.target ||
      labelRef.current === e.target ||
      tabRef?.current.some((current) => current === e.target)
    )
      return;

    dispatch(searchActions.toggleSearch(false));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(searchActions.setSearch(e.target.value));
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside, false);

    return () =>
      document.removeEventListener("mousedown", handleClickOutside, false);
  }, []);

  return (
    <div className={`search-container ${active && "search-container--active"}`}>
      <input
        ref={inputRef}
        className="search"
        id="search-bar"
        placeholder="Search"
        value={search}
        onChange={handleChange}
      />
      <label
        ref={labelRef}
        className="search-button"
        htmlFor="search-bar"
        onClick={handleClick}
        data-testid="search-bar"
      >
        <span className="mglass">&#9906;</span>
      </label>
    </div>
  );
};

export default Search;
