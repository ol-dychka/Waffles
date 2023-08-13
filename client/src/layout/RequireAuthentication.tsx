import React from "react";
import { useStore } from "../store/store";
import { Navigate, Outlet, useLocation } from "react-router";
import { observer } from "mobx-react-lite";

type Props = {};

const RequireAuthentication = (props: Props) => {
  const {
    userStore: { isLogged },
  } = useStore();

  const location = useLocation();

  if (!isLogged) return <Navigate to="/welcome" state={{ from: location }} />;
  return <Outlet />;
};

export default observer(RequireAuthentication);
