import { Box, Grid, Paper, Typography } from "@mui/material";

interface Item {
  id: string;
  title: string;
  description: string;
}

interface Props {
  items: Item[];
}

export const NewsList = ({ items }: Props) => (
  <Box>
    <Grid container spacing={2}>
      {items.map((item) => (
        <Grid key={item.id} item xs={12} sm={6} md={4} lg={3}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h5" component="h2" gutterBottom>
              {item.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {item.description}
            </Typography>
          </Paper>
        </Grid>
      ))}
    </Grid>
  </Box>
);
