import { createSlice } from "@reduxjs/toolkit";

const saved = typeof window !== "undefined"
  ? JSON.parse(localStorage.getItem("favorites") || "[]")
  : [];

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: saved,
  reducers: {
    addFavorite: (state, action) => {
      const exists = state.find((item) => item.url === action.payload.url);
      if (!exists) {
        state.push(action.payload);
        localStorage.setItem("favorites", JSON.stringify(state));
      }
    },
    removeFavorite: (state, action) => {
      const updated = state.filter((item) => item.url !== action.payload.url);
      localStorage.setItem("favorites", JSON.stringify(updated));
      return updated;
    },
  },
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
