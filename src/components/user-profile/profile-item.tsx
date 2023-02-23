import { Grid, Typography } from "@mui/material";
import { FC } from "react";

interface ProfileItemProps {
  name: string;
  value: string;
}

const styles = {
  grid: { margin: "0px", width: "auto", overflow: "auto" },
  item: { borderBottom: "1px solid gray" },
};

export const ProfileItem: FC<ProfileItemProps> = ({ name, value }) => (
  <Grid container spacing={2} sx={styles.grid}>
    <Grid item xs={6} sx={styles.item}>
      <Typography sx={{ p: 1 }}>{name}</Typography>
    </Grid>
    <Grid item xs={6} sx={styles.item}>
      <Typography sx={{ p: 1 }}>{value}</Typography>
    </Grid>
  </Grid>
);
