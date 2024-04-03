import { AxiosError, AxiosResponse } from "axios";
import instance from "./Axios";
import { Song } from "../models/Song";

interface ResponseData {
  page: {
    number: number;
    size: number;
    totalElements: number;
    totalPages: number;
  };
  _embedded: {
    songList: Song[];
  };
}

const responseBody = (response: AxiosResponse) => response.data;
const responseError = (response: AxiosError<string>) => response.response?.data;
const songRequests = {
  get: (url: string) =>
    instance.get<Song>(url).then(responseBody).catch(responseError),
  post: (url: string, body: Song) =>
    instance.post<Song>(url, body).then(responseBody).catch(responseError),
  put: (url: string, body: Song) =>
    instance.put<Song>(url, body).then(responseBody).catch(responseError),
  delete: (url: string) =>
    instance.delete<Song>(url).then(responseBody).catch(responseError),
};

const getSongs = (size: number, page: number): Promise<ResponseData> => {
  const url = "/songs?page="+page+"&size="+size;
  return songRequests.get(url);
};

const getSingleSong = (id: string): Promise<Song> => {
  const url: string = "/songs/" + id;
  return songRequests.get(url);
};

const searchSong = (query: string): Promise<ResponseData> => {
  const url = "/songs/search?query=" + query;
  return songRequests.get(url);
};

const updateSong = (song: Song): Promise<Song> => {
  const url = "/songs/" + song.id;
  return songRequests.put(url, song);
}

const createSong = (song: Song): Promise<Song> => {
  const url = "/songs"
  return songRequests.post(url, song);
}

const deleteSong = (id: number): Promise<string> => {
  const url = "/songs/" + id;
  return songRequests.delete(url);
}

export { getSongs, getSingleSong, searchSong, updateSong, createSong, deleteSong };
