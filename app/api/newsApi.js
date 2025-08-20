
const API_KEY = "fe537b17005a493290bda5031bbaba01";

export const fetchSourcesApi = async (pais) => {
  try {
    const res = await fetch(
      `https://newsapi.org/v2/top-headlines/sources?country=${pais}&apiKey=${API_KEY}`
    );
    const data = await res.json();
    return data.sources || [];
  } catch (error) {
    console.error("Error al cargar fuentes", error);
    return [];
  }
};

export const fetchNoticiasApi = async (categoria, pais) => {
  try {
    const res = await fetch(
      `https://newsapi.org/v2/top-headlines?country=${pais}&category=${categoria}&apiKey=${API_KEY}`
    );
    const data = await res.json();
    return data.articles || [];
  } catch (error) {
    console.error("Error al cargar noticias", error);
    return [];
  }
};

