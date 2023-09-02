import { Navigate, RouteObject } from "react-router";
import App from "./App";
import PostsDashboard from "../features/posts/PostsDashboard";
import { createBrowserRouter } from "react-router-dom";
import PostDetails from "../features/posts/PostDetails";
import RequireAuthentication from "./RequireAuthentication";
import WelcomePage from "../features/login/WelcomePage";
import ProfilePage from "../features/profile/ProfilePage";
import ProfileConfigurations from "../features/profile/ProfileConfigurations";
import FollowingsPage from "../features/profile/FollowingsPage";
import NotFound from "../features/errors/NotFound";
import ServerError from "../features/errors/ServerError";

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
          { path: "profiles/:username", element: <ProfilePage /> },
          { path: "followings/:username", element: <FollowingsPage /> },
          { path: "myprofile", element: <ProfileConfigurations /> },
        ],
      },
      { path: "/welcome", element: <WelcomePage /> },
      { path: "/notfound", element: <NotFound /> },
      { path: "/servererror", element: <ServerError /> },
      { path: "*", element: <Navigate replace to="/notfound" /> },
    ],
  },
];

export const router = createBrowserRouter(routes);
