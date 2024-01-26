import { Box } from "@mui/material";
import { styled } from "@mui/system";

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.light,
  borderRadius: "0.5rem",
  padding: "0.75rem",
}));

export default StyledBox;
