import { AxiosResponse } from "axios";
import instance from "./Axios";
import { Artist } from "../models/Artist";
import { Song } from "../models/Song";
import { Album } from "../models/Album";

interface ResponseData {
  page: {
    number: number;
    size: number;
    totalElements: number;
    totalPages: number;
  };
  _embedded: {
    artistList: Artist[];
  };
}

const responseBody = (response: AxiosResponse) => response.data;

const artistRequests = {
  get: (url: string) => instance.get<Artist>(url).then(responseBody),
  post: (url: string, body: Artist) =>
    instance.post<Artist>(url, body).then(responseBody),
  put: (url: string, body: Artist) =>
    instance.put<Artist>(url, body).then(responseBody),
  delete: (url: string) => instance.delete<Artist>(url).then(responseBody),
};

const getArtists = (size: number, page: number): Promise<ResponseData> => {
  const url = "/artists?page=" + page + "&size=" + size;
  return artistRequests.get(url);
};

const getSingleArtist = (id: string): Promise<Artist> => {
  const url = "/artists/" + id;
  return artistRequests.get(url);
};

const getListSongByArtist = (id: string): Promise<Song[]> => {
  const url = "/artists/" + id + "/songs";
  return artistRequests.get(url);
};

const getListAlbumByArtist = (id: string): Promise<Album[]> => {
  const url = "/artists/" + id + "/albums";
  return artistRequests.get(url);
};

const searchArtist = (query: string): Promise<ResponseData> => {
  const url = "/artists/search?query=" + query;
  return artistRequests.get(url);
};

const createArtist = (artist: Artist): Promise<Artist> => {
  return artistRequests.post("/artists", artist);
};

const updateArtist = (artist: Artist): Promise<Artist> => {
  const url = "/artists/" + artist.id;
  return artistRequests.put(url, artist);
};

const deleteArtist = (id: number): Promise<string> => {
  const url = "/artists/" + id
  return artistRequests.delete(url);
}

export {
  getArtists,
  getSingleArtist,
  getListSongByArtist,
  getListAlbumByArtist,
  searchArtist,
  createArtist,
  updateArtist,
  deleteArtist,
};
