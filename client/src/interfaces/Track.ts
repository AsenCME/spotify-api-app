import { Album } from "./Album";
import { Artist } from "./Artist";

export interface Track {
  duration: number;
  name: string;
  link: string;
  album: Album;
  artists: Artist[];
  preview_url: string;
  popularity: number;
}
