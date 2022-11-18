import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import AppRouter from "./AppRouter";
import store from "../../store";

describe("App Router", () => {
  test("Should render home page", () => {
    // given
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/home"]}>
          <AppRouter />
        </MemoryRouter>
      </Provider>
    );
    const titleText = screen.getByText(/Hacker News/i);

    // then
    expect(titleText).toBeInTheDocument();
  });
});
