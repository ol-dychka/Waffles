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
import { useMemo } from "react";
import { themeSettings } from "../theme";
import Navbar from "./Navbar";
import { Outlet } from "react-router";
import { useStore } from "../store/store";
import { observer } from "mobx-react-lite";

function App() {
  const {
    appStore: { mode },
  } = useStore();
  const colorMode = mode;
  const theme = useMemo(
    () => createTheme(themeSettings(colorMode)),
    [colorMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar />
      <Container>
        <Outlet />
      </Container>
    </ThemeProvider>
  );
}

export default observer(App);
