import { Box } from "@mui/material";
import { styled } from "@mui/system";

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.light,
  borderRadius: "1rem",
  padding: "1rem",
}));

export default StyledBox;
