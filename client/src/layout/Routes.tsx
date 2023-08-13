import { RouteObject } from "react-router";
import App from "./App";
import PostsDashboard from "../features/posts/PostsDashboard";
import { createBrowserRouter } from "react-router-dom";
import PostDetails from "../features/posts/PostDetails";
import RequireAuthentication from "./RequireAuthentication";
import WelcomePage from "../features/login/WelcomePage";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        element: <RequireAuthentication />,
        children: [
          { path: "/", element: <PostsDashboard /> },
          { path: "posts/:id", element: <PostDetails /> },
        ],
      },
      { path: "/welcome", element: <WelcomePage /> },
    ],
  },
];

export const router = createBrowserRouter(routes);
