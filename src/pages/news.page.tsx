import { Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";

import { ImageMasonry } from "components/masonry-list/masonry-list";
import { Loader } from "components/loader/loader";
import { NewsCard } from "components/news-card/news-card";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import { catFacts } from "mock-data/cat-facts";
import {
  clearState,
  deleteCat,
  getCats,
  selectCatsState,
} from "store/cats/cats.slice";
import { CatPost, getPosts } from "utils/cat-posts";

const styles = {
  container: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    gap: "20px",
  },
  noData: { color: "black" },
};

export const NewsPage = () => {
  const [catPosts, setCatPosts] = useState<CatPost[]>([]);
  const dispatch = useAppDispatch();
  const {
    cats,
    pagination: { hasMore, page },
    isLoading,
  } = useAppSelector(selectCatsState);

  const handleLoadMore = () => {
    dispatch(getCats(page + 1));
  };

  const deletePost = (id: string) => {
    setCatPosts(catPosts.filter((cat) => cat.id !== id));
    dispatch(deleteCat(id));
  };

  useEffect(() => {
    dispatch(getCats(page));

    return () => {
      dispatch(clearState());
    };
  }, []);

  useEffect(() => {
    const posts = getPosts(catFacts, cats, catPosts);

    setCatPosts((prev) => [...prev, ...posts]);
  }, [cats]);

  const renderItem = (item: CatPost) => (
    <NewsCard key={item.id} item={item} onDelete={deletePost} />
  );

  return (
    <Container sx={styles.container}>
      {!!cats.length && (
        <ImageMasonry
          list={catPosts}
          renderItem={renderItem}
          pagination={{
            hasMore,
            isLoading,
            loadMore: handleLoadMore,
          }}
        />
      )}
      {isLoading && <Loader />}
      {!cats.length && !isLoading && (
        <Typography sx={styles.noData}>
          Дані про котиків зникли у мріях.
        </Typography>
      )}
    </Container>
  );
};
