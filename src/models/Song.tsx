import { Artist } from "./Artist";
import { Genre } from "./Genre";
export interface Song {
  id: number;
  nameSong: string;
  releaseDate: string;
  duration: string;
  avatar: string;
  describe: string;
  urlMusic: string;
  artists: Artist[];
  genres: Genre[];
}
