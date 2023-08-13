import { ThemeProvider } from "@emotion/react";
import FlexBetween from "../components/FlexBetween";
import {
  Container,
  CssBaseline,
  Palette,
  PaletteMode,
  Typography,
  createTheme,
} from "@mui/material";
import { useEffect, useMemo } from "react";
import { themeSettings } from "../theme";
import Navbar from "./Navbar";
import { Outlet } from "react-router";
import { useStore } from "../store/store";
import { observer } from "mobx-react-lite";
import LoadingComponent from "../components/LoadingComponent";

function App() {
  const {
    appStore: { mode, token, appLoaded, setAppLoaded },
    userStore: { isLogged, getUser, user },
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
  }, [token, getUser]);

  if (!appLoaded) {
    return <LoadingComponent text="App is Loading" />;
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {isLogged && <Navbar />}
      <Container>
        <Outlet />
      </Container>
    </ThemeProvider>
  );
}

export default observer(App);
