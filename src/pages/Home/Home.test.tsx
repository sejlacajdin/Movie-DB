import { render, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import configureStore, { MockStoreEnhanced } from "redux-mock-store";
import Home from "./Home";
import { RootState } from "../../store";
import * as useMediaModule from "../../hooks/useMedia";

const mockStore = configureStore<RootState>();

describe("Home Component", () => {
  let store: MockStoreEnhanced<RootState>;
  let getTopRatedMoviesMock: jest.Mock;
  let getTopRatedShowsMock: jest.Mock;

  beforeEach(() => {
    getTopRatedMoviesMock = jest.fn();
    getTopRatedShowsMock = jest.fn();

    jest.spyOn(useMediaModule, "useMedia").mockReturnValue({
      getTopRatedMovies: getTopRatedMoviesMock,
      getTopRatedShows: getTopRatedShowsMock,
    });

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
  });

  test("renders component without crashing", () => {
    render(
      <Provider store={store}>
        <Router>
          <Home />
        </Router>
      </Provider>
    );
  });

  test("dispatches action to get top rated movies", async () => {
    store.dispatch = jest.fn();
    render(
      <Provider store={store}>
        <Router>
          <Home />
        </Router>
      </Provider>
    );

    await waitFor(() => {
      expect(getTopRatedMoviesMock).toHaveBeenCalled();
    });
  });
});
