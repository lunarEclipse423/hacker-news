import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import HomePage from "./HomePage";
import store from "../../store";

describe("Home page", () => {
  test("Should render home page", () => {
    // given
    render(
      <Provider store={store}>
        <Router>
          <HomePage />
        </Router>
      </Provider>
    );

    const titleText = screen.getByText(/Hacker News/i);
    const trendingText = screen.getByText(/Trending/i);

    // then
    expect(titleText).toBeInTheDocument();
    expect(trendingText).toBeInTheDocument();
  });
});
