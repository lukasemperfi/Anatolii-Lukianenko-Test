import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

import { Footer } from "./footer/footer";
import { Header } from "./header/header";

const styles = {
  wrapper: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  },
  main: {
    flex: "1 1 auto",
    padding: "20px 0px",
    overflow: "hidden",
  },
};

export const MainLayout = () => (
  <Box sx={styles.wrapper}>
    <Header />
    <Box component="main" sx={styles.main}>
      <Outlet />
    </Box>
    <Footer />
  </Box>
);
