import Box from "@mui/material/Box";
import Masonry from "@mui/lab/Masonry";
import { Button } from "@mui/material";

interface ImageMasonryProps<T> {
  list: T[];
  renderItem: (item: T) => JSX.Element;
  pagination: {
    hasMore: boolean;
    isLoading: boolean;
    loadMore: () => void;
  };
}

const styles = {
  buttonContainer: {
    marginTop: "20px",
    display: "flex",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "#F7C815",
    color: "rgba(0, 0, 0, 0.87)",
    fontWeight: 600,
    "&:hover": {
      backgroundColor: "#ac8c0e",
    },
    "&:active": {
      backgroundColor: "#ac8c0e",
    },
    "&:focus": {
      backgroundColor: "#ac8c0e",
    },
  },
};

export const ImageMasonry = <T extends {}>({
  list,
  renderItem,
  pagination: { hasMore, isLoading, loadMore },
}: ImageMasonryProps<T>) => (
  <Box>
    <Masonry columns={{ xs: 1, sm: 2, md: 3, lg: 4 }} spacing={2}>
      {list.map((item) => renderItem(item))}
    </Masonry>
    {hasMore && !isLoading && (
      <Box sx={styles.buttonContainer}>
        <Button variant="contained" onClick={loadMore} sx={styles.button}>
          завантажити ще
        </Button>
      </Box>
    )}
  </Box>
);
