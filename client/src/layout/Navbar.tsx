import React from "react";
import FlexBetween from "../components/FlexBetween";
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
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
  ArrowDropDownOutlined,
} from "@mui/icons-material";
import { router } from "./Routes";

const Navbar = () => {
  const {
    appStore: { mode, changeMode },
    userStore: { logout, user },
  } = useStore();

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
    <Box
      padding="1rem"
      position="fixed"
      width="100%"
      zIndex="7"
      sx={{
        background:
          "linear-gradient(90deg, rgba(71,0,26,1) 0%, rgba(214,16,55,1) 35%, rgba(255,91,110,1) 100%)",
      }}
    >
      <FlexBetween>
        <FlexBetween>
          <CookieOutlined
            sx={{ fontSize: "2rem", color: "primary.contrastText" }}
          />
          <Typography
            variant="h1"
            ml="0.5rem"
            onClick={() => router.navigate("/")}
            color="primary.contrastText"
            sx={{
              "&:hover": {
                cursor: "pointer",
              },
            }}
          >
            Waffles
          </Typography>
        </FlexBetween>
        <FlexBetween gap="2rem">
          <IconButton onClick={changeMode}>
            {mode === "dark" ? (
              <DarkModeOutlined
                sx={{ fontSize: "2rem", color: "primary.contrastText" }}
              />
            ) : (
              <LightModeOutlined
                sx={{ fontSize: "2rem", color: "primary.contrastText" }}
              />
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
              <img
                src={user?.image || "/user.png"}
                alt="user"
                style={{ width: "2rem", borderRadius: "50%" }}
              />
              <Typography variant="h5" ml="1rem" color="primary.contrastText">
                {user?.displayName}
              </Typography>
              <ArrowDropDownOutlined
                sx={{
                  fontSize: "1rem",
                  color: "primary.contrastText",
                }}
              />
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
