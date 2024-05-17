import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore, { MockStoreEnhanced } from "redux-mock-store";
import Header from "./Header";
import { RootState } from "../store";

const mockStore = configureStore<RootState>();

describe("Header Component", () => {
  let store: MockStoreEnhanced<RootState>;

  beforeEach(() => {
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

  test("renders navigation links correctly", () => {
    const { getByText } = render(
      <Provider store={store}>
        <Header />
      </Provider>
    );

    expect(getByText("Movies")).toBeInTheDocument();
    expect(getByText("TV shows")).toBeInTheDocument();
  });
});
