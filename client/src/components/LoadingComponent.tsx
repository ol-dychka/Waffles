import { useTheme } from "@emotion/react";
import { Box, CircularProgress, Typography } from "@mui/material";
import React from "react";

type Props = {
  text: string;
};

const LoadingComponent = ({ text }: Props) => {
  const theme = useTheme();
  return (
    <Box
      height="100%"
      width="100%"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Box>
        <CircularProgress color="inherit" />
      </Box>
      <Typography>{text}</Typography>
    </Box>
  );
};

export default LoadingComponent;
