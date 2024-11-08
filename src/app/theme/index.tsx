import { FC, ReactNode } from "react";
import { ThemeProvider, createTheme, ThemeOptions } from "@mui/material";

import { inputStyles } from "./inputStyles";


export const themeOptions: ThemeOptions = {
  palette: {
    mode: "dark",
  },
  shape: {
    borderRadius: 4,
  },
  spacing: 8,
  components: {
    ...inputStyles,
  },
};

const theme = createTheme(themeOptions);
 const Theme: FC<{children: ReactNode}> = ({ children }): JSX.Element => {
	return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}

export default Theme