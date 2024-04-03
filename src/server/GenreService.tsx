import { AxiosError, AxiosResponse } from "axios";
import instance from "./Axios";
import { Genre } from "../models/Genre";

interface ResponseData {
  page: {
    number: number;
    size: number;
    totalElements: number;
    totalPages: number;
  };
  _embedded: {
    genreList: Genre[];
  };
}

const responseBody = (response: AxiosResponse) => response.data;
const responseError = (response: AxiosError<string>) => response.response?.data;
const genreRequests = {
  get: (url: string) =>
    instance.get<Genre>(url).then(responseBody).catch(responseError),
  post: (url: string, body: Genre) =>
    instance.post<Genre>(url, body).then(responseBody).catch(responseError),
  put: (url: string, body: Genre) =>
    instance.put<Genre>(url, body).then(responseBody).catch(responseError),
  delete: (url: string) =>
    instance.delete<Genre>(url).then(responseBody).catch(responseError),
};

const getGenres = (): Promise<ResponseData> => {
  return genreRequests.get("/genres");
};

const getSingleGenre = (id: string): Promise<Genre> => {
  const url: string = "/genres/" + id;
  return genreRequests.get(url);
};


const updateGenre = (genre: Genre): Promise<ResponseData> => {
  const url = "/genres/" + genre.id;
  return genreRequests.put(url, genre);
}

export { getGenres, getSingleGenre, updateGenre };
