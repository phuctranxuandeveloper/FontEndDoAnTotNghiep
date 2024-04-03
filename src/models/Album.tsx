import { Artist } from "./Artist";
import { Song } from "./Song";

export interface Album {
  id: number;
  nameAlbum: string;
  releaseDate: string;
  avatar: string;
  track: number;
  artist: Artist;
  songs: Song[];
}
