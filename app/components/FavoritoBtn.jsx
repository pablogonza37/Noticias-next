"use client";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite, removeFavorite } from "../redux/favoritesSlice";

const FavoritoBtn = ({ noticia }) => {
  const dispatch = useDispatch();
  const favoritos = useSelector((state) => state.favorites);
  const isFav = favoritos.some((f) => f.url === noticia.url);

  return (
    <button
      onClick={() =>
        isFav ? dispatch(removeFavorite(noticia)) : dispatch(addFavorite(noticia))
      }
      className={`px-3 py-1 rounded-md transition ${
        isFav
          ? "bg-red-500 text-white hover:bg-red-600"
          : "bg-yellow-400 hover:bg-yellow-500"
      }`}
    >
      {isFav ? "Quitar de Favoritos" : "Agregar a Favoritos"}
    </button>
  );
};

export default FavoritoBtn;
