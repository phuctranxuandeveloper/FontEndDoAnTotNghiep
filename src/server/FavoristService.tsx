import { AxiosResponse } from "axios";
import { Favorist } from "../models/Favorist";
import instance from "./Axios";
import { Song } from "../models/Song";

// interface ResponseData {
//   page: {
//     number: number;
//     size: number;
//     totalElements: number;
//     totalPages: number;
//   };
//   _embedded: {
//     playlistList: Playlist[];
//   };
// }

const responseBody = (response: AxiosResponse) => response.data;

const favoristRequests = {
  get: (url: string) => instance.get<Favorist>(url).then(responseBody),
  post: (url: string, body: Favorist) =>
    instance.post<Favorist>(url, body).then(responseBody),
  delete: (url: string) => instance.delete<Favorist>(url).then(responseBody),
};

const getFavorists = (id : number) : Promise<Song[]> => {
    const url = "/users/"+id+"/favorists"
    return favoristRequests.get(url);
}

const addSongToFavorist = (idSong : number, idUser: number) : Promise<Favorist> => {
  const url = "/favorists/"+idUser+"/addSong?songId="+idSong;
  return favoristRequests.get(url);
}

const removeSongToFavorist = (idSong : number, idUser: number) : Promise<Favorist> => {
    const url = "/favorists/"+idUser+"/removeSong?songId="+idSong;
    return favoristRequests.get(url);
  }

const checkSongToFavorist = (idSong : number, idUser: number) : Promise<string> => {
    const url = "/favorists/"+idUser+"/checkSong?songId="+idSong;
    return favoristRequests.get(url);
  }

export {getFavorists, addSongToFavorist, removeSongToFavorist, checkSongToFavorist}
