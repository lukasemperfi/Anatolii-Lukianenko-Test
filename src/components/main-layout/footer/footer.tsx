import { Box, Container, Typography } from "@mui/material";

const styles = {
  footer: { backgroundColor: "#4D8FC3" },
  copyrightContainer: {
    p: 3,
    display: "flex",
    justifyContent: "center",
  },
  copyright: {
    color: "rgba(0, 0, 0, 0.87)",
    fontWeight: 500,
  },
  author: {
    color: "#ffffff",
    fontWeight: 500,
  },
};

export const Footer = () => (
  <Box component="footer" sx={styles.footer}>
    <Container>
      <Box sx={styles.copyrightContainer}>
        <Box sx={styles.copyright}>
          © Created by{" "}
          <Typography
            component="a"
            href="https://github.com/lukasemperfi"
            target="_blank"
            sx={styles.author}
          >
            Anatolii Lukianenko.
          </Typography>
        </Box>
      </Box>
    </Container>
  </Box>
);
