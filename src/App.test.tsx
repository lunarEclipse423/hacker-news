import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import App from "./App";
import store from "./store";

describe("App", () => {
  test("Should render app component", () => {
    // given
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    const titleText = screen.getByText(/Hacker News/i);
    const trendingText = screen.getByText(/Trending/i);

    // then
    expect(titleText).toBeInTheDocument();
    expect(trendingText).toBeInTheDocument();
  });
});
