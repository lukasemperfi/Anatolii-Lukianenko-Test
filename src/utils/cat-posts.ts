import { CatsDto } from "api/dtos/cats.dto";

export interface CatPost {
  id: string;
  url: string;
  width: number;
  height: number;
  fact: string;
}

export interface Facts {
  fact: string;
}

const mergeArrays = (facts: Facts[], cats: CatsDto[]): CatPost[] => {
  const result = cats.map((cat) => ({
    id: cat.id,
    url: cat.url,
    width: cat.width,
    height: cat.height,
    fact: getRandomElement(facts).fact,
  }));

  return result;
};

const getRandomElement = <T>(array: T[]): T => {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
};

export const getPosts = (
  facts: Facts[],
  cats: CatsDto[],
  posts: CatPost[]
): CatPost[] => {
  const uniqCats = cats.filter(
    (cat) => !posts.some((post) => post.id === cat.id)
  );
  const uniqFacts = facts.filter(
    (fact) => !posts.some((post) => post.fact === fact.fact)
  );

  if (!uniqFacts.length) {
    return mergeArrays(facts, uniqCats);
  }

  return mergeArrays(uniqFacts, uniqCats);
};
