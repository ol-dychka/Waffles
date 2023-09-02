import { ThemeProvider } from "@emotion/react";
import { Box, CssBaseline, createTheme } from "@mui/material";
import { useEffect, useMemo } from "react";
import { themeSettings } from "../theme";
import Navbar from "./Navbar";
import { Outlet } from "react-router";
import { useStore } from "../store/store";
import { observer } from "mobx-react-lite";
import LoadingComponent from "../features/common/LoadingComponent";
import { ToastContainer } from "react-toastify";

function App() {
  const {
    appStore: { mode, token, appLoaded, setAppLoaded },
    userStore: { isLogged, getUser },
  } = useStore();

  const colorMode = mode;

  const theme = useMemo(
    () => createTheme(themeSettings(colorMode)),
    [colorMode]
  );

  useEffect(() => {
    if (token) {
      getUser().finally(() => setAppLoaded());
    } else {
      setAppLoaded();
    }
  }, [token, getUser, setAppLoaded]);

  if (!appLoaded) {
    return <LoadingComponent text="App is Loading" />;
  }

  return (
    <>
      <ToastContainer position="bottom-left" theme={theme.palette.mode} />

      <ThemeProvider theme={theme}>
        <CssBaseline />
        {isLogged && <Navbar />}
        <Box padding="1rem 6%">
          <Outlet />
        </Box>
      </ThemeProvider>
    </>
  );
}

export default observer(App);
