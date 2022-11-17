import HomePage from "../pages/HomePage/HomePage";
import StoryPage from "../pages/StoryPage/StoryPage";

export const routes = [
  { path: "/home", element: HomePage },
  { path: "/home/:id", element: StoryPage },
];
