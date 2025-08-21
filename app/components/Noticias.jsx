"use client";
import React, { useState, useEffect } from "react";
import { fetchSourcesApi, fetchNoticiasApi } from "../api/newsApi";
import DarkModeToggle from "./DarkModeToggle";
import SmartImage from "./SmartImage";
import { useSelector } from "react-redux";

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
          <>
            
           {/* Noticia principal */}
<section className="mb-12 relative">
  <SmartImage
    width={1224}
    //height={600}
    src={noticias[0].urlToImage}
    alt={noticias[0].title}
    className="object-cover w-full h-[600px] grayscale hover:grayscale-0 transition duration-500 rounded-md"
  />
  <div className="absolute bottom-0 left-0 bg-black bg-opacity-60 text-white p-8 rounded-tr-md max-w-3xl">
    <h2 className="text-4xl md:text-5xl font-serif font-bold leading-tight mb-4">
      {noticias[0].title}
    </h2>
    <p className="text-sm text-gray-200 mb-3">
      {noticias[0].author || "Desconocido"} | {new Date(noticias[0].publishedAt).toLocaleDateString()}
    </p>
    <p className="text-base md:text-lg">{noticias[0].description}</p>
    <a
      href={noticias[0].url}
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-300 underline mt-4 inline-block"
    >
      Leer más →
    </a>
  </div>
</section>


            {/* Noticias secundarias */}
            <section className="grid md:grid-cols-3 gap-8">
              {noticias.slice(1, 9).map((noticia, index) => (
                <article
                  key={index}
                  className={`${darkMode ? "bg-gray-800 border-gray-700 text-white" : "bg-white border-gray-200 text-gray-900"} shadow-sm rounded-md overflow-hidden hover:shadow-lg transition`}
                >
                  <SmartImage
                    width={500}
                    //height={500}
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
                    
                  </div>
                </article>
              ))}
            </section>

            {/* Mostrar fuentes disponibles */}
            <section className="mt-12">
              <button
                onClick={() => setShowSources(!showSources)}
                className="flex items-center justify-between w-full bg-gray-200 px-4 py-2 rounded-md font-semibold hover:bg-gray-300 transition"
              >
                <span>Fuentes disponibles</span>
                <span>{showSources ? "▲" : "▼"}</span>
              </button>

              {showSources && (
                <ul className="grid md:grid-cols-1 gap-4 mt-4">
                  {sources.map((src) => (
                    <li
                      key={src.id}
                      className="border border-gray-200 bg-white text-white dark:bg-gray-800 dark:border-gray-700 rounded-md p-2 shadow-sm hover:shadow-md transition"
                    >
                      <h4 className="font-bold">{src.name}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{src.description}</p>
                      <a
                        href={src.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 dark:text-blue-400 underline text-sm mt-1 inline-block"
                      >
                        Visitar fuente →
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          </>
        ) : (
          <p className="text-center text-lg">No hay noticias disponibles en esta categoría.</p>
        )}
      </main>
    </div>
  );
};

export default Noticias;
