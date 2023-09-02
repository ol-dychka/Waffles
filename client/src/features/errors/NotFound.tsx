import { Box, Typography } from "@mui/material";
import StyledBox from "../../components/StyledBox";
import { SearchOutlined } from "@mui/icons-material";
import StyledButton from "../common/StyledButton";
import { router } from "../../layout/Routes";

const NotFound = () => {
  return (
    <StyledBox mt="6rem">
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <SearchOutlined color="secondary" sx={{ fontSize: "4rem" }} />
        <Typography variant="h4" mb="1rem" textAlign="center">
          We looked everywhere - but could not find what you are looking for!
        </Typography>
        <StyledButton
          text="Back to Home Page"
          handleClick={() => router.navigate("/")}
        />
      </Box>
    </StyledBox>
  );
};

export default NotFound;
