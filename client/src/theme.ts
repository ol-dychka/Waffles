import { PaletteMode } from "@mui/material";

// color design tokens export
export const colorTokens = {
  grey: {
    0: "#FFFFFF",
    10: "#F6F6F6",
    50: "#F0F0F0",
    100: "#E0E0E0",
    200: "#C2C2C2",
    300: "#A3A3A3",
    400: "#858585",
    500: "#666666",
    600: "#4D4D4D",
    700: "#333333",
    800: "#1A1A1A",
    900: "#0A0A0A",
    1000: "#000000",
  },
  primary_old: {
    100: "#f9d3da",
    200: "#f3a8b5",
    300: "#ed7c90",
    400: "#e7516b",
    500: "#e12546",
    600: "#b41e38",
    700: "#87162a",
    800: "#5a0f1c",
    900: "#2d070e",
  },
  primary: {
    100: "#d7e3f5",
    200: "#b0c6eb",
    300: "#88aae0",
    400: "#618dd6",
    500: "#3971cc",
    600: "#2e5aa3",
    700: "#22447a",
    800: "#172d52",
    900: "#0b1729",
  },
};

// mui theme settings
export const themeSettings = (mode: PaletteMode) => {
  return {
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
            // palette values for dark mode
            primary: {
              dark: colorTokens.primary[300],
              main: colorTokens.primary[500],
              light: colorTokens.primary[700],
            },
            secondary: {
              dark: colorTokens.grey[100],
              main: colorTokens.grey[500],
              light: colorTokens.grey[700],
            },
            background: {
              default: colorTokens.grey[800],
            },
          }
        : {
            // palette values for light mode
            primary: {
              dark: colorTokens.primary[700],
              main: colorTokens.primary[500],
              light: colorTokens.primary[300],
            },
            secondary: {
              dark: colorTokens.grey[700],
              main: colorTokens.grey[100],
              light: colorTokens.grey[0],
            },
            background: {
              default: colorTokens.grey[50],
            },
          }),
    },
    typography: {
      fontFamily: ["Inter", "sans-serif"].join(","),
      fontSize: 12,
      h1: {
        fontFamily: ["Merriweather", "sans-serif"].join(","),
        fontSize: 40,
      },
      h2: {
        fontFamily: ["Merriweather", "sans-serif"].join(","),
        fontSize: 32,
      },
      h3: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 24,
      },
      h4: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 20,
      },
      h5: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 16,
      },
      h6: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 14,
      },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            // scrollbarColor: "#6b6b6b #2b2b2b",
            "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
              backgroundColor:
                mode === "dark" ? colorTokens.grey[700] : colorTokens.grey[0],
            },
            "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
              borderRadius: 8,
              backgroundColor:
                mode === "dark" ? colorTokens.grey[600] : colorTokens.grey[100],
              minHeight: 24,
              border: `3px solid ${
                mode === "dark" ? colorTokens.grey[700] : colorTokens.grey[0]
              }`,
            },
            "&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus":
              {
                backgroundColor:
                  mode === "dark"
                    ? colorTokens.grey[500]
                    : colorTokens.grey[200],
              },
            "&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active":
              {
                backgroundColor:
                  mode === "dark"
                    ? colorTokens.grey[500]
                    : colorTokens.grey[200],
              },
            "&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover":
              {
                backgroundColor:
                  mode === "dark"
                    ? colorTokens.grey[500]
                    : colorTokens.grey[200],
              },
            "&::-webkit-scrollbar-corner, & *::-webkit-scrollbar-corner": {
              backgroundColor:
                mode === "dark" ? colorTokens.grey[700] : colorTokens.grey[0],
            },
          },
        },
      },
    },
  };
};
