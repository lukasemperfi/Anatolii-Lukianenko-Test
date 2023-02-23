import { Container } from "@mui/material";

import welcomeImg from "assets/welcome.jpg";

const styles = {
  container: {
    background: `url(${welcomeImg}) 50%/cover no-repeat`,
    height: "500px",
  },
};

export const HomePage = () => <Container sx={styles.container}></Container>;
