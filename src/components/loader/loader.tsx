import { Box, CircularProgress, CircularProgressProps } from "@mui/material";
import { FC } from "react";

const styles = {
  loaderContainer: { display: "flex", justifyContent: "center" },
};

export const Loader: FC<CircularProgressProps> = (props) => (
  <Box sx={styles.loaderContainer}>
    <CircularProgress {...props} />
  </Box>
);
