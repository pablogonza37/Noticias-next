import { configureStore } from "@reduxjs/toolkit";
import favoritesReducer from "./favoritesSlice";
import uiReducer from "./uiSlice";

export const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
    ui: uiReducer,
  },
});

export default store;
