import { FC, ReactNode } from "react";
import Box  from "@mui/material/Box";

import Navbar from "./Navbar";

const Layout: FC<{ children: ReactNode }> = ({ children }): JSX.Element => {
  return (
    <Box sx={{ height: "100vh" }}>
      <Navbar />
      {children}
    </Box>
  );
};

export default Layout;
