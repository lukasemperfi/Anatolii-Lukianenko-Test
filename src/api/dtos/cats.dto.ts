export interface CatsDto {
  breeds: string[];
  categories: {
    id: number;
    name: string;
  }[];
  id: string;
  url: string;
  width: number;
  height: number;
}
