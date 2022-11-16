import HomePage from "../pages/HomePage/HomePage";
import NewsPage from "../pages/NewsPage/NewsPage";

export const routes = [
  { path: "/home", element: HomePage },
  { path: "/home/:id", element: NewsPage },
];
