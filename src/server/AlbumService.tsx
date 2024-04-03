import { Album } from "../models/Album";
import { Song } from "../models/Song";
import instance from "./Axios";
import { AxiosResponse } from "axios";

interface ResponseData {
  page: {
    number: number;
    size: number;
    totalElements: number;
    totalPages: number;
  };
  _embedded: {
    albumList: Album[];
  };
}

const responseBody = (response: AxiosResponse) => response.data;

const albumRequests = {
  get: (url: string) => instance.get<Album>(url).then(responseBody),
  post: (url: string, body: Album) =>
    instance.post<Album>(url, body).then(responseBody),
  put: (url: string, body: Album) =>
    instance.put<Album>(url, body).then(responseBody),
  delete: (url: string) => instance.delete<Album>(url).then(responseBody),
};

const getAlbums = (size: number, page: number): Promise<ResponseData> => {
  const url = "/albums?page=" + page + "&size=" + size;
  return albumRequests.get(url);
};

const getSingleAlbum = (id: string): Promise<Album> => {
  const url = "/albums/" + id;
  return albumRequests.get(url);
};

const getListSongByAlbum = (id: string): Promise<Song[]> => {
  const url = "/albums/" + id + "/songs";
  return albumRequests.get(url);
};

const searchAlbum = (query: string): Promise<ResponseData> => {
  const url = "/albums/search?query=" + query;
  return albumRequests.get(url);
};

const createAlbum = (album: Album): Promise<Album> => {
  return albumRequests.post("/albums", album);
}

const updateAlbum = (album: Album): Promise<Album> => {
  const url = "/albums/"+album.id;
  return albumRequests.put(url, album);
}

const deleteAlbum = (id: number): Promise<string> => {
  const url = "/albums/"+id;
  return albumRequests.delete(url);
}
export { getAlbums, getSingleAlbum, getListSongByAlbum, searchAlbum, createAlbum, updateAlbum, deleteAlbum };
