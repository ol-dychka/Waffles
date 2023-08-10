import { RouteObject } from "react-router";
import App from "./App";
import PostsDashboard from "../features/posts/PostsDashboard";
import { createBrowserRouter } from "react-router-dom";
import PostDetails from "../features/posts/PostDetails";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <PostsDashboard /> },
      { path: "posts/:id", element: <PostDetails /> },
    ],
  },
];

export const router = createBrowserRouter(routes);
