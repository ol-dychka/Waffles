import { Box, Link, Typography, useMediaQuery, useTheme } from "@mui/material";
import React, { useState } from "react";
import { themeSettings } from "../../theme";
import { Navigate, Link as RouterLink, useLocation } from "react-router-dom";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { useStore } from "../../store/store";
import { observer } from "mobx-react-lite";

type Props = {};

const WelcomePage = (props: Props) => {
  const {
    userStore: { isLogged, user },
  } = useStore();
  const theme = useTheme();

  const isMobile = useMediaQuery("(max-width:600px)");

  const location = useLocation();

  const [isLogin, setIsLogin] = useState(true);

  if (isLogged) return <Navigate to="/" state={{ from: location }} />;

  return (
    <Box
      padding="3rem"
      display={isMobile ? "block" : "flex"}
      justifyContent="space-between"
      alignItems="center"
      gap="3rem"
    >
      <Box width="30%">
        <Typography fontSize="6rem" fontWeight="700">
          WELCOME TO WAFFLES
        </Typography>
      </Box>
      <Box>
        {isLogin ? <LoginForm /> : <RegisterForm />}

        <Link onClick={() => setIsLogin(!isLogin)}>
          {isLogin
            ? "Don't have an account? Register"
            : "Already have an account? Log in"}
        </Link>
      </Box>
    </Box>
  );
};

export default observer(WelcomePage);
