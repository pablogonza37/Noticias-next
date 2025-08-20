import { createSlice } from "@reduxjs/toolkit";

const saved = typeof window !== "undefined"
  ? JSON.parse(localStorage.getItem("ui") || '{"darkMode":false}')
  : { darkMode: false };

const uiSlice = createSlice({
  name: "ui",
  initialState: saved,
  reducers: {
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
      localStorage.setItem("ui", JSON.stringify(state));
    },
  },
});

export const { toggleDarkMode } = uiSlice.actions;
export default uiSlice.reducer;
