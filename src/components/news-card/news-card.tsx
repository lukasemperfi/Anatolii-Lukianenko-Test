import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { FC } from "react";

import { CatPost } from "utils/cat-posts";

interface NewsCardProps {
  item: CatPost;
  onDelete: (id: string) => void;
}

const styles = {
  fact: { color: "rgba(0, 0, 0, 0.87)" },
  deleteBtn: {
    color: "#4D8FC3",
  },
};

export const NewsCard: FC<NewsCardProps> = ({ item, onDelete }) => (
  <Card>
    <CardActionArea>
      <CardMedia component="img" image={item.url} loading="lazy" />
    </CardActionArea>
    <CardContent>
      <Typography variant="body2" sx={styles.fact}>
        {item.fact}
      </Typography>
    </CardContent>
    <Button fullWidth onClick={() => onDelete(item.id)} sx={styles.deleteBtn}>
      Delete
    </Button>
  </Card>
);
