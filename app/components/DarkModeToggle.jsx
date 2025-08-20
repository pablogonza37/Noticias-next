"use client";
import { useDispatch, useSelector } from "react-redux";
import { toggleDarkMode } from "../redux/uiSlice";

const DarkModeToggle = () => {
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.ui.darkMode);

  return (
    <button
      onClick={() => dispatch(toggleDarkMode())}
      className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:text-white"
    >
      {darkMode ? "☀️ Modo Claro" : "🌙 Modo Oscuro"}
    </button>
  );
};

export default DarkModeToggle;
