import { Box, Link, Typography, useMediaQuery } from "@mui/material";
import React, { useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { useStore } from "../../store/store";
import { observer } from "mobx-react-lite";

type Props = {};

const WelcomePage = (props: Props) => {
  const {
    userStore: { isLogged },
  } = useStore();

  const isMobile = useMediaQuery("(max-width:750px)");

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
