"use client";
import React, { useState, useEffect } from "react";
import { fetchSourcesApi, fetchNoticiasApi } from "../api/newsApi";
import Image from "next/image";
import FavoritoBtn from "../components/FavoritoBtn";
import DarkModeToggle from "../components/DarkModeToggle";
import { useSelector } from "react-redux";

// 🔹 Componente SmartImage
const SmartImage = ({ src, alt, width = 600, height = 400, className }) => {
  if (!src || src.includes("politico.com") || src.includes("dcrainmaker.com")) {
    return (
      <img
        src={src || "/fallback.jpg"}
        alt={alt}
        width={width}
        height={height}
        className={className}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
    />
  );
};

const categories = ["business", "entertainment", "general", "health", "science", "sports", "technology"];

const Noticias = () => {
  const [pais, setPais] = useState("us");
  const [categoria, setCategoria] = useState("technology");
  const [noticias, setNoticias] = useState([]);
  const [sources, setSources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showSources, setShowSources] = useState(false);

  const darkMode = useSelector((state) => state.ui.darkMode);

  const fetchSources = async () => {
    const fuentes = await fetchSourcesApi(pais);
    setSources(fuentes);
  };

  const fetchNoticias = async () => {
    setLoading(true);
    const noticiasData = await fetchNoticiasApi(categoria, pais);
    setNoticias(noticiasData);
    setLoading(false);
  };

  useEffect(() => {
    fetchSources();
    fetchNoticias();
  }, [pais, categoria]);

  return (
    <div className={`${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"} min-h-screen`}>
      
      {/* CABECERA */}
      <div className={`${darkMode ? "bg-gray-800 border-gray-700 text-white" : "bg-white border-gray-200 text-gray-900"} border-b py-6 shadow-sm`}>
        <div className="flex justify-between items-center max-w-6xl mx-auto px-6">
          <div className="flex flex-wrap gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoria(cat)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition ${
                  categoria === cat
                    ? darkMode
                      ? "bg-yellow-400 text-black"
                      : "bg-black text-white"
                    : darkMode
                      ? "bg-gray-700 hover:bg-gray-600 text-white"
                      : "bg-gray-200 hover:bg-gray-300 text-gray-900"
                }`}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>
          <DarkModeToggle />
        </div>
      </div>

      {/* CONTENIDO */}
      <main className="max-w-6xl mx-auto p-6">
        {loading ? (
          <p className="text-center text-lg">Cargando noticias...</p>
        ) : noticias.length > 0 ? (
          <section className="grid md:grid-cols-3 gap-8">
            {noticias.slice(0, 9).map((noticia, index) => (
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
        ) : (
          <p className="text-center text-lg">No hay noticias disponibles en esta categoría.</p>
        )}
      </main>
    </div>
  );
};

export default Noticias;
