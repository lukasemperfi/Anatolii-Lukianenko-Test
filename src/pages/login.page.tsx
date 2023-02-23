import { Container } from "@mui/material";

import { LoginForm } from "components/login-form/login-form";

const styles = {
  container: { p: 2 },
};

export const LoginPage = () => (
  <Container sx={styles.container}>
    <LoginForm />
  </Container>
);
