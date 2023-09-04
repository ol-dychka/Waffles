import { Box, CircularProgress, Typography } from "@mui/material";

type Props = {
  text: string;
};

const LoadingComponent = ({ text }: Props) => {
  return (
    <Box
      height="90%"
      width="100%"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <CircularProgress color="inherit" />
      <Typography>{text}</Typography>
    </Box>
  );
};

export default LoadingComponent;
