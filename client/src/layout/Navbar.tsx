import React from "react";
import FlexBetween from "../components/FlexBetween";
import {
  Box,
  Button,
  Icon,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";
import { observer } from "mobx-react-lite";
import { useStore } from "../store/store";

import {
  CookieOutlined,
  DarkModeOutlined,
  LightModeOutlined,
} from "@mui/icons-material";

type Props = {};

const Navbar = (props: Props) => {
  const {
    appStore: { mode, changeMode },
  } = useStore();

  const theme = useTheme();

  return (
    <Box bgcolor={theme.palette.primary.main} padding="1rem">
      <FlexBetween>
        <FlexBetween>
          <CookieOutlined sx={{ fontSize: "2rem" }} />
          <Typography variant="h1" ml="0.5rem">
            Waffles
          </Typography>
        </FlexBetween>
        <IconButton onClick={changeMode}>
          {mode === "dark" ? (
            <DarkModeOutlined sx={{ fontSize: "2rem" }} />
          ) : (
            <LightModeOutlined sx={{ fontSize: "2rem" }} />
          )}
        </IconButton>
      </FlexBetween>
    </Box>
  );
};

export default observer(Navbar);
