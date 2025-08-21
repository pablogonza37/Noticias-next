'use client'

import { Provider, useDispatch } from "react-redux";
import { store } from "./store";
import { useEffect } from "react";
import { setDarkMode } from "./uiSlice";

function InitDarkMode() {
  const dispatch = useDispatch();

  useEffect(() => {
    const saved = localStorage.getItem("ui");
    if (saved) {
      const parsed = JSON.parse(saved);
      dispatch(setDarkMode(parsed.darkMode));
    }
  }, [dispatch]);

  return null;
}

export default function Providers({ children }) {
  return (
    <Provider store={store}>
      <InitDarkMode />
      {children}
    </Provider>
  );
}
