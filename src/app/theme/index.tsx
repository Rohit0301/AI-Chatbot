import { FC, ReactNode } from "react";
import { ThemeProvider, createTheme, ThemeOptions } from "@mui/material";

import { inputStyles } from "./inputStyles";

export const themeOptions: ThemeOptions = {
  palette: {
    mode: "dark",
    primary: {
      main: "#0D92F4",
    },
    secondary: {
      main: "#fff",
    },
  },
  shape: {
    borderRadius: 10,
  },
  spacing: 8,
  components: {
    ...inputStyles,
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: "#424242",
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          backgroundColor: "#424242",
        },
      },
    },
  },
};

const theme = createTheme(themeOptions);
const Theme: FC<{ children: ReactNode }> = ({ children }): JSX.Element => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default Theme;
