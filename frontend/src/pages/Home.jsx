import React from "react";
import { Link } from "react-router-dom";
import { CheckCircle, ArrowRight, BarChart3, Shield, Users, Ticket } from "lucide-react";

const Home = () => {
  return (
    <div className="bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-sky-50 dark:from-gray-900 dark:to-gray-900 z-0"></div>
        <div className="absolute inset-0 opacity-30 dark:opacity-10">
          <div className="absolute right-0 top-0 w-80 h-80 bg-indigo-400 rounded-full filter blur-3xl opacity-20 -translate-y-1/2"></div>
          <div className="absolute left-0 bottom-0 w-80 h-80 bg-sky-400 rounded-full filter blur-3xl opacity-20 translate-y-1/2"></div>
        </div>
        <div className="container-custom relative z-10 py-20 md:py-28">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <div className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-indigo-100 dark:bg-blue-950 text-blue-700 dark:text-white mb-6">
                <span className="flex h-2 w-2 rounded-full bg-blue-700 mr-2"></span>
                Sistema de tickets para equipos biomedicos en tiempo real
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
                Optimizando servicios
              </h1>
              <p className="mt-6 text-lg text-gray-600 dark:text-gray-300 max-w-xl">
                Sistema diseñado para la creación de tickets y <span className="text-blue-700 dark:text-blue-400 font-medium">reportes en tiempo real</span> con el fin
                de optimizar el mantenimiento y soporte de equipos biomédicos basado en roles.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link to="/signup" className="btn btn-primary">
                  Empezar
                </Link>
                <Link to="/login" className="btn bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700">
                  Iniciar sesión
                </Link>
              </div>
            </div>

            <div className="relative flex justify-center md:justify-end animate-fade-in">
              <div className="relative w-full max-w-lg">
                <img
                  src="/thicketing_system.PNG"
                  alt="Ticketing System Dashboard"
                  className="w-[400px] h-auto object-contain"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800/25">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-750 dark:text-white">
              Algunas funciones de Optiservices
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
              La forma más rápida de gestionar reportes y mantener el control de tus usuarios
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Característica 1 */}
            <div className="card bg-gray-800 dark:bg-gray-800 hover:shadow-md transition-all duration-200 animate-fade-in">
              <div className="rounded-full bg-indigo-100 dark:bg-indigo-900/30 p-3 w-12 h-12 flex items-center justify-center mb-5">
                <Shield className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Acceso basado en roles
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Asigna roles específicos a los usuarios para un mejor control y eficiencia del flujo de trabajo. Separa las vistas de usuario y administrador.
              </p>
            </div>

            {/* Característica 2 */}
            <div className="card bg-gray-800 dark:bg-gray-800 hover:shadow-md transition-all duration-200 animate-fade-in" style={{ animationDelay: "0.1s" }}>
              <div className="rounded-full bg-sky-100 dark:bg-sky-900/30 p-3 w-12 h-12 flex items-center justify-center mb-5">
                <Ticket className="h-6 w-6 text-sky-600 dark:text-sky-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Solución rapida a problemas
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Realice un seguimiento y reporte problemas más rápidamente con un flujo de tickets eficiente y una gestión de estado intuitiva.
              </p>
            </div>

            {/* Característica 3 */}
            <div className="card bg-gray-800 dark:bg-gray-800 hover:shadow-md transition-all duration-200 animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <div className="rounded-full bg-amber-100 dark:bg-amber-900/30 p-3 w-12 h-12 flex items-center justify-center mb-5">
                <Users className="h-6 w-6 text-amber-600 dark:text-amber-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Comunicación eficiente
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Colabora fácilmente con tu equipo para gestionar reportes y mantenimientos de forma ágil, asegurando un servicio rápido y efectivo.
              </p>
            </div>

            {/* Característica 4 */}
            <div className="card bg-gray-800 dark:bg-gray-800 hover:shadow-md transition-all duration-200 animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <div className="rounded-full bg-green-100 dark:bg-green-900/30 p-3 w-12 h-12 flex items-center justify-center mb-5">
                <BarChart3 className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Reportes en tiempo real
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Supervisa el estado de los equipos y los reportes de mantenimiento con datos actualizados que optimizan el rendimiento en las areas de trabajo.
              </p>
            </div>

            {/* Característica 5 */}
            <div className="card bg-gray-800 dark:bg-gray-800 hover:shadow-md transition-all duration-200 animate-fade-in" style={{ animationDelay: "0.4s" }}>
              <div className="rounded-full bg-purple-100 dark:bg-purple-900/30 p-3 w-12 h-12 flex items-center justify-center mb-5">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600 dark:text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Autenticación segura
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                La autenticación basada en JWT garantiza que los datos permanezcan seguros y accesibles, solo para usuarios autorizados.
              </p>
            </div>

            {/* Característica 6 */}
            <div className="card bg-gray-800 dark:bg-gray-800 hover:shadow-md transition-all duration-200 animate-fade-in" style={{ animationDelay: "0.5s" }}>
              <div className="rounded-full bg-pink-100 dark:bg-pink-900/30 p-3 w-12 h-12 flex items-center justify-center mb-5">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-pink-600 dark:text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Diseño intuitivo
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Un diseño moderno, intuitivo y fácil de usar, adaptado a cualquier dispositivo o sistema operativo
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sobre nosotros */}
      <section className="py-16 px-8 bg-white dark:bg-[#0f172a] ">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6 text-black dark:text-white">
            Sobre nosotros
          </h2>

          <p className="text-gray-700 dark:text-gray-300 max-w-3xl mx-auto mb-12 text-lg leading-relaxed">
            Somos un grupo de estudiantes apasionados por la tecnología y el desarrollo de software.
            <span className="font-semibold text-blue-700 dark:text-blue-400"> Optiservices </span>
            es una plataforma creada con dedicación y compromiso para mejorar la gestión y creación de tickets con
            tiempos de resolución rapidos.
          </p>

          {/* Integrantes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

            {/* Integrante 1 */}
            <div className="bg-gray-100 dark:bg-gray-700 p-6 rounded-2xl shadow-md hover:shadow-lg transition">
              <h3 className="text-xl font-semibold text-black dark:text-white mb-2">
               Julian Andrés Orosco Páez
              </h3>
              <p className="text-blue-800 dark:text-blue-400 font-medium mb-2">
                Desarrollador Backend
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                Encargado de la arquitectura de la base de datos y la integración con MongoDB Atlas.
              </p>
            </div>

            {/* Integrante 2 */}
            <div className="bg-gray-100 dark:bg-gray-700 p-6 rounded-2xl shadow-md hover:shadow-lg transition">
              <h3 className="text-xl font-semibold text-black dark:text-white mb-2">
                María Alejandra Amaya Meló
              </h3>
              <p className="text-blue-800 dark:text-blue-400 font-medium mb-2">
                Desarrolladora Frontend
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                Especialista en diseño de interfaces y experiencia de usuario con React y Tailwind.
              </p>
            </div>

            {/* Integrante 3 */}
            <div className="bg-gray-100 dark:bg-gray-700 p-6 rounded-2xl shadow-md hover:shadow-lg transition">
              <h3 className="text-xl font-semibold text-black dark:text-white mb-2">
                Diego Andrés Moya Rincón
              </h3>
              <p className="text-blue-800 dark:text-blue-400 font-medium mb-2">
                Tester y QA
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                Responsable de las pruebas funcionales y unitarias, asegurando la calidad del sistema.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>

  );

};

export default Home;
