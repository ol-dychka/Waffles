import { KeyboardDoubleArrowUpOutlined } from "@mui/icons-material";
import { Box, IconButton, useTheme } from "@mui/material";
import { useState } from "react";

const GoToTop = () => {
  const theme = useTheme();

  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setVisible(true);
    } else if (scrolled <= 300) {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // "auto" works well too
    });
  };

  window.addEventListener("scroll", toggleVisible);

  return (
    <Box
      position="fixed"
      bottom="2rem"
      right="6%"
      bgcolor={theme.palette.primary.main}
      borderRadius="50%"
      padding="0.5rem"
      display={visible ? "block" : "none"}
      sx={{
        "&:hover": {
          bgcolor: theme.palette.primary.dark,
        },
      }}
    >
      <IconButton onClick={scrollToTop}>
        <KeyboardDoubleArrowUpOutlined
          sx={{
            color: theme.palette.primary.contrastText,
          }}
        />
      </IconButton>
    </Box>
  );
};

export default GoToTop;
