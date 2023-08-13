import React from "react";
import FlexBetween from "../components/FlexBetween";
import {
  Avatar,
  Box,
  Button,
  Divider,
  Icon,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import { observer } from "mobx-react-lite";
import { useStore } from "../store/store";

import {
  CookieOutlined,
  DarkModeOutlined,
  LightModeOutlined,
  Logout,
  PersonAdd,
  Settings,
} from "@mui/icons-material";
import { router } from "./Routes";

type Props = {};

const Navbar = (props: Props) => {
  const {
    appStore: { mode, changeMode },
    userStore: { logout },
  } = useStore();

  const theme = useTheme();

  //user menu
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box bgcolor={theme.palette.primary.main} padding="1rem">
      <FlexBetween>
        <FlexBetween>
          <CookieOutlined sx={{ fontSize: "2rem" }} />
          <Typography
            variant="h1"
            ml="0.5rem"
            onClick={() => router.navigate("/")}
            sx={{
              "&:hover": {
                cursor: "pointer",
                color: theme.palette.secondary.dark,
              },
            }}
          >
            Waffles
          </Typography>
        </FlexBetween>
        <FlexBetween>
          <IconButton onClick={changeMode}>
            {mode === "dark" ? (
              <DarkModeOutlined sx={{ fontSize: "2rem" }} />
            ) : (
              <LightModeOutlined sx={{ fontSize: "2rem" }} />
            )}
          </IconButton>

          <Tooltip title="Account settings">
            <IconButton
              onClick={handleClick}
              size="small"
              sx={{ ml: 2 }}
              aria-controls={open ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
              <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
            </IconButton>
          </Tooltip>
        </FlexBetween>
      </FlexBetween>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={handleClose}>
          <Avatar /> Profile
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Avatar /> My account
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          Add another account
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={logout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default observer(Navbar);
