import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

interface MusicState {
  songid: number;
  isPlaying: boolean;
  duration: number;
  currentTime: number;
}

const songid: number =
  localStorage.getItem("song") !== null
    ? JSON.parse(localStorage.getItem("song")!)
    : 0;
const isPlaying: boolean =
  localStorage.getItem("isPlaying") !== null
    ? JSON.parse(localStorage.getItem("isPlaying")!)
    : false;
const duration: number =
  localStorage.getItem("duration") !== null
    ? JSON.parse(localStorage.getItem("duration")!)
    : 0;
const currentTime: number =
  localStorage.getItem("currentTime") !== null
    ? JSON.parse(localStorage.getItem("currentTime")!)
    : 0;

const setMusicState = (
  songid: number,
  isPlaying: boolean,
  duration: number,
  currentTime: number,
) => {
  localStorage.setItem("song", JSON.stringify(songid));
  localStorage.setItem("isPlaying", JSON.stringify(isPlaying));
  localStorage.setItem("duration", JSON.stringify(duration));
  localStorage.setItem("currentTime", JSON.stringify(currentTime));
};

const initialState: MusicState = {
  songid: songid,
  isPlaying: isPlaying,
  duration: duration,
  currentTime: currentTime,
};

export const playingMusicSlice = createSlice({
  name: "playingMusic",
  initialState,
  reducers: {
    //
    playingMusic: (state, action: PayloadAction<MusicState>) => {
      state.songid = action.payload.songid;
      state.isPlaying = action.payload.isPlaying;
      state.duration = action.payload.duration;
      state.currentTime = action.payload.currentTime;

      setMusicState(
        state.songid,
        state.isPlaying,
        state.duration,
        state.currentTime,
      );
    },
  },
});

export const {playingMusic} = playingMusicSlice.actions;
export const selectIdSong = (state : RootState) => state.playingMusic.songid;
export const selectIsPlaying = (state : RootState) => state.playingMusic.isPlaying;
export const selectDuration = (state : RootState) => state.playingMusic.duration;
export const selectCurrentTime = (state : RootState) => state.playingMusic.currentTime;

