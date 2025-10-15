
import React from "react";
import { Loader2 } from "lucide-react";

const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
    <div className="text-center">
      <Loader2 className="h-10 w-10 animate-spin text-blue-800 dark:text-blue-700 mx-auto" />
      <p className="mt-4 text-gray-600 dark:text-gray-400">Cargando...</p>
    </div>
  </div>
);

export default LoadingFallback;
