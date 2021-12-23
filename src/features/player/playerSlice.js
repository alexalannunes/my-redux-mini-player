import { createSelector, createSlice } from "@reduxjs/toolkit";
import { audios } from "../../audios";

const initialState = {
  current: {
    isPlaying: false,
  },
  audios,
};

const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    play: (state, action) => {
      state.current = { isPlaying: true, ...action.payload };
    },
    pause: (state, action) => {
      state.current = { isPlaying: false, ...action.payload };
    },
  },
});

export const { play, pause } = playerSlice.actions;

export const playSelector = (state) => state.player;

export const selectPlayerMemo = createSelector(
  [playSelector],
  (player) => player
);

export default playerSlice.reducer;
