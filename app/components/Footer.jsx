"use client";
import React from "react";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 border-t border-gray-700">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Logo + Descripción */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-3">Noticias Premium</h2>
          <p className="text-sm leading-relaxed">
            Tu fuente confiable de noticias internacionales, con información clara, precisa y en tiempo real.
          </p>
        </div>

        {/* Enlaces útiles */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Enlaces</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-white transition">Inicio</a></li>
            <li><a href="#" className="hover:text-white transition">Política</a></li>
            <li><a href="#" className="hover:text-white transition">Economía</a></li>
            <li><a href="#" className="hover:text-white transition">Tecnología</a></li>
            <li><a href="#" className="hover:text-white transition">Contacto</a></li>
          </ul>
        </div>

        {/* Redes sociales */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Síguenos</h3>
          <div className="flex space-x-5">
            <a href="#" className="hover:text-white transition"><Facebook /></a>
            <a href="#" className="hover:text-white transition"><Twitter /></a>
            <a href="#" className="hover:text-white transition"><Instagram /></a>
            <a href="#" className="hover:text-white transition"><Linkedin /></a>
          </div>
        </div>
      </div>

      {/* Línea inferior */}
      <div className="mt-10 border-t border-gray-700 pt-6 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} The Daily Chronicle. Todos los derechos reservados.
      </div>
    </footer>
  );
};

export default Footer;
