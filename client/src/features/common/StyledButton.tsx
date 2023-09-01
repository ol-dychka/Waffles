import { Button, CircularProgress, useTheme } from "@mui/material";
import React from "react";

type Props = {
  text: string;
  handleClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  submit?: boolean;
  secondary?: boolean;
  fullWidth?: boolean;
};

const StyledButton = ({
  text,
  handleClick,
  disabled,
  loading,
  submit,
  secondary,
  fullWidth,
}: Props) => {
  const theme = useTheme();
  return (
    <Button
      type={submit ? "submit" : "button"}
      onClick={handleClick}
      sx={{
        width: fullWidth ? "100%" : "auto",
        borderRadius: "1rem",
        bgcolor: secondary
          ? theme.palette.secondary.main
          : theme.palette.primary.main,
        color: secondary
          ? theme.palette.secondary.contrastText
          : theme.palette.primary.contrastText,
        "&:hover": {
          bgcolor: secondary
            ? theme.palette.secondary.light
            : theme.palette.primary.dark,
        },
      }}
      disabled={disabled || loading}
    >
      {loading ? (
        <CircularProgress
          color={secondary ? "inherit" : "secondary"}
          size="1.2rem"
        />
      ) : (
        text
      )}
    </Button>
  );
};

export default StyledButton;
