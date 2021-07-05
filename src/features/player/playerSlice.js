import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  playing: false,
  audio: null,
};

const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    play: (state, action) => {
      return {
        ...state,
        playing: true,
        audio: action.payload,
      };
    },
    pause: (state, action) => {
      return {
        ...state,
        playing: false,
        audio: action.payload,
      };
    },
  },
});

export const { play, pause } = playerSlice.actions;

export const playSelector = (state) => state.player;

export default playerSlice.reducer;
