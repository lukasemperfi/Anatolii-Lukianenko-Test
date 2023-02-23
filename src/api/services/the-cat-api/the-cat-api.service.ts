import { AxiosResponse } from "axios";

import { theCatApi } from "api/http/the-cat-api";

class Cats {
  getCats = async (page: number): Promise<AxiosResponse> => {
    const response = await theCatApi.get<AxiosResponse>("/images/search", {
      params: {
        order: "ASC",
        limit: 10,
        page,
      },
    });

    return response;
  };
}

export const catsService = new Cats();
