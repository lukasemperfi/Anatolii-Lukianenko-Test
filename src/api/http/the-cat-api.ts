import axios from "axios";

export const theCatApi = axios.create({
  baseURL: process.env.REACT_APP_THECATAPI_BASE_URL,
  params: {
    api_key: process.env.REACT_APP_THECATAPI_API_KEY,
  },
});
