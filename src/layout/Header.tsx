import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import Search from "../components/Search/Search";
import { RootState } from "../store";
import { activeTabsActions } from "../store/tabs-slice";
import "./header.scss";
import { Tabs } from "../types/tabs";

interface NavigationLink {
  to: Tabs;
  label: string;
}

const LINKS: NavigationLink[] = [
  { to: "tv-shows", label: "TV shows" },
  { to: "movies", label: "Movies" },
];

const Header = () => {
  const tabRef = useRef(new Array());
  const dispatch = useDispatch();
  const { activeTab } = useSelector((state: RootState) => state.activeTab);

  const setActiveTab = (tab: Tabs) => {
    dispatch(activeTabsActions.setActiveTab(tab));
  };

  return (
    <div className="header">
      <div className="header__tabs">
        {LINKS.map(({ to, label }, i) => (
          <div
            ref={(element) => tabRef.current.push(element)}
            key={i}
            className={`${activeTab === to && "header__tab--active"}`}
            onClick={() => setActiveTab(to)}
          >
            {label}
          </div>
        ))}
      </div>
      <Search tabRef={tabRef} />
    </div>
  );
};

export default Header;
