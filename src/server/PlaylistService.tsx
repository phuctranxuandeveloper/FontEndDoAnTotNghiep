import { AxiosResponse } from "axios";
import { Playlist } from "../models/Playlist";
import instance from "./Axios";

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

const playlistRequests = {
  get: (url: string) => instance.get<Playlist>(url).then(responseBody),
  post: (url: string, body: Playlist) =>
    instance.post<Playlist>(url, body).then(responseBody),
  delete: (url: string) => instance.delete<Playlist>(url).then(responseBody),
};

const getPlaylists = (id : string) : Promise<Playlist[]> => {
    const url = "/users/"+id+"/playlists"
    return playlistRequests.get(url);
}

const addSongToPlaylist = (idSong : number, idPlaylist: number) : Promise<Playlist> => {
  const url = "/playlists/"+idPlaylist+"/addSong?songId="+idSong;
  return playlistRequests.get(url);
}

export {getPlaylists, addSongToPlaylist}
