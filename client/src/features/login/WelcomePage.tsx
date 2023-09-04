import { Box, Link, Typography, useMediaQuery } from "@mui/material";
import { useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { useStore } from "../../store/store";
import { observer } from "mobx-react-lite";
import StyledBox from "../../components/StyledBox";

const WelcomePage = () => {
  const {
    userStore: { isLogged },
  } = useStore();

  const isMobile = useMediaQuery("(max-width:1000px)");

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
      <Box flexBasis="30%">
        <Typography
          fontSize="5rem"
          fontWeight="700"
          textAlign={isMobile ? "center" : "right"}
        >
          WELCOME TO WAFFLES!
        </Typography>
      </Box>
      <StyledBox flexBasis="60%">
        {isLogin ? <LoginForm /> : <RegisterForm />}

        <Link
          onClick={() => setIsLogin(!isLogin)}
          sx={{
            "&:hover": {
              cursor: "pointer",
            },
          }}
        >
          {isLogin
            ? "Don't have an account? Register"
            : "Already have an account? Log in"}
        </Link>
      </StyledBox>
    </Box>
  );
};

export default observer(WelcomePage);
