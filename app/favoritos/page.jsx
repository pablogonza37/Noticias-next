"use client";
import React from "react";
import { useSelector } from "react-redux";
//import SmartImage from "./SmartImage";
import FavoritoBtn from "../components/FavoritoBtn";
import SmartImage from "../components/SmartImage";

const Favoritos = () => {
  const favoritos = useSelector((state) => state.favorites);
  const darkMode = useSelector((state) => state.ui.darkMode);

  if (!favoritos || favoritos.length === 0) {
    return (
      <div className={`${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"} min-h-screen flex items-center justify-center`}>
        <p className="text-xl">No hay noticias favoritas aún.</p>
      </div>
    );
  }

  return (
    <div className={`${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"} min-h-screen p-6`}>
      <h2 className="text-3xl font-bold mb-6 text-center">Noticias Favoritas</h2>
      <section className="grid md:grid-cols-3 gap-8">
        {favoritos.map((noticia, index) => (
          <article
            key={index}
            className={`${darkMode ? "bg-gray-800 border-gray-700 text-white" : "bg-white border-gray-200 text-gray-900"} shadow-sm rounded-md overflow-hidden hover:shadow-lg transition`}
          >
            <SmartImage
              width={500}
              height={500}
              src={noticia.urlToImage}
              alt={noticia.title}
              className="object-cover w-full h-60 grayscale hover:grayscale-0 transition duration-500"
            />
            <div className="p-4">
              <h3 className="text-xl font-serif font-bold mb-2">{noticia.title}</h3>
              <p className={`${darkMode ? "text-gray-400" : "text-gray-500"} text-sm mb-2`}>
                {noticia.author || "Desconocido"} | {new Date(noticia.publishedAt).toLocaleDateString()}
              </p>
              <p className="text-base leading-relaxed">{noticia.description}</p>
              <a
                href={noticia.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`${darkMode ? "text-blue-400" : "text-blue-600"} underline mt-2 inline-block`}
              >
                Leer más →
              </a>
              <div className="mt-3">
                <FavoritoBtn noticia={noticia} />
              </div>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
};

export default Favoritos;
