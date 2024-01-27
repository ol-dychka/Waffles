import { Box } from "@mui/material";
import { styled } from "@mui/system";

const HoverBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: "0.5rem",
  marginBottom: "0.1rem",
  borderRadius: "0.5rem",
  "&:hover": {
    backgroundColor: theme.palette.secondary.main,
    cursor: "pointer",
  },
}));

export default HoverBox;
