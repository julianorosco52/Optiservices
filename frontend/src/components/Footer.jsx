import React from "react";
import { Link } from "react-router-dom";
import { Github, Twitter, Linkedin, Mail, Heart, Phone } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <section className="py-2 bg-gradient-to-br from-blue-800 to-blue-800 dark:from-blue-800 dark:to-blue-800">
      <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 mt-auto">
        <div className="container-custom py-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Columna de marca */}
            <div className="space-y-4">
              <Link to="/" className="flex items-center space-x-2">
                <span className="text-xl font-bold text-blue-800 dark:text-white">
                  Optiservices
                  <span className="text-indigo-600 dark:text-indigo-400"></span>
                </span>
              </Link>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Sistema de tickets y reportes en tiempo real para optimizar el soporte biomédico.
              </p>
              <div className="flex space-x-4">
                <a
                  href="https://github.com/julianorosco52"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                >
                  <Github className="h-5 w-5" />
                </a>
              </div>
            </div>
           

            {/* Columna de contacto */}
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Contacto</h3>
              <ul className="space-y-3">
                <li className="flex items-center space-x-2">
                  <Mail className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                  <a
                    className="text-gray-600 dark:text-gray-400 text-sm"
                  >
                    julianorosco52@gmail.com <br />
                  </a>
                </li>
                <li className="flex items-center space-x-2">
                  <Phone className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                  <span className="text-gray-600 dark:text-gray-400 text-sm">
                    +57 312 345 6789
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-200 dark:border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              &copy; {currentYear} Optiservices — Desarrollado por el equipo de Optiservices . <br /> Todos los derechos reservados.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0"></div>
          </div>
        </div>
      </footer>
    </section>
  );
};

export default Footer;
