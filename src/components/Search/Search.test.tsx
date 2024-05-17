import { render, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore, { MockStoreEnhanced } from "redux-mock-store";
import Search from "./Search";
import { RootState } from "../../store";
import { searchActions } from "../../store/search-slice";

const mockStore = configureStore<RootState>();

describe("Search Component", () => {
  let store: MockStoreEnhanced<RootState>;
  let handleClickOutside: EventListener;
  let dispatch: jest.Mock;

  beforeEach(() => {
    dispatch = jest.fn();
    store = mockStore({
      activeTab: { activeTab: "movies", loading: false },
      mediaShows: {
        media: [],
        meta: {
          page: 1,
          total_pages: 1,
          total_results: 1,
        },
        selectedMedia: {
          id: 0,
          backdrop_path: "",
          original_title: "",
          overview: "",
          poster_path: "",
          vote_average: 0,
          videoId: "",
        },
      },
      search: {
        search: "",
        active: false,
      },
    });

    store.dispatch = dispatch;

    handleClickOutside = jest.fn();
    document.addEventListener = jest.fn();
    document.removeEventListener = jest.fn();

    (document.addEventListener as jest.Mock).mockImplementation(
      (event, handler) => {
        if (event === "mousedown") {
          handleClickOutside = handler;
        }
      }
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders search input", () => {
    const { getByPlaceholderText } = render(
      <Provider store={store}>
        <Search tabRef={{ current: [] }} />
      </Provider>
    );

    const inputElement = getByPlaceholderText("Search");
    expect(inputElement).toBeInTheDocument();
  });

  test("handles input change", () => {
    const { getByPlaceholderText } = render(
      <Provider store={store}>
        <Search tabRef={{ current: [] }} />
      </Provider>
    );

    const inputElement = getByPlaceholderText("Search");
    fireEvent.change(inputElement, { target: { value: "interception" } });

    expect(dispatch).toHaveBeenCalledWith(
      searchActions.setSearch("interception")
    );
  });

  test("toggles search active state", () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <Search tabRef={{ current: [] }} />
      </Provider>
    );

    const searchButton = getByTestId("search-bar");
    fireEvent.click(searchButton);

    expect(dispatch).toHaveBeenCalledWith(searchActions.toggleSearch(true));
  });
});
