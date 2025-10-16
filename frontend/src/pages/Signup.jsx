import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../utils/api";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!formData.username) newErrors.username = "Username is required";
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email address is invalid";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    return newErrors;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setErrors({});
    setApiError("");
    setSuccess("");
    setLoading(true);

    try {
      await api.post("/auth/signup", formData);
      setSuccess("Signup successful! Redirecting to login...");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      setApiError(
        err.response?.data?.message || "Signup failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-background-light dark:bg-background-dark min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 animate-fade-in animate-slide-up">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-blue-800 dark:text-text-dark">
            Crear una cuenta
          </h2>
          <p className="mt-2 text-gray-500">
            Acceda con su nueva cuenta
          </p>
        </div>

        <div className="card">
          {apiError && (
            <p className="bg-accent-error bg-opacity-20 text-accent-error p-3 rounded-lg text-sm text-center">
              {apiError}
            </p>
          )}
          {success && (
            <p className="bg-accent-success bg-opacity-20 text-accent-success p-3 rounded-lg text-sm text-center">
              {success}
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <div>
              <label className="block text-sm font-medium text-text-muted mb-1">
                Nombre de usuario
              </label>
              <input
                type="text"
                name="username"
                className={`input ${errors.username ? "border-accent-error" : ""
                  }`}
                value={formData.username}
                onChange={handleChange}
                required
              />
              {errors.username && (
                <p className="text-accent-error text-xs mt-1">
                  {errors.username}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-text-muted mb-1">
                Correo electrónico
              </label>
              <input
                type="email"
                name="email"
                className={`input ${errors.email ? "border-accent-error" : ""}`}
                value={formData.email}
                onChange={handleChange}
                required
              />
              {errors.email && (
                <p className="text-accent-error text-xs mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-text-muted mb-1">
                Contraseña
              </label>
              <input
                type="password"
                name="password"
                className={`input ${errors.password ? "border-accent-error" : ""
                  }`}
                value={formData.password}
                onChange={handleChange}
                required
              />
              {errors.password && (
                <p className="text-accent-error text-xs mt-1">
                  {errors.password}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary w-full flex justify-center items-center"
            >
              {loading ? "Creando cuenta..." : "Crear cuenta"}
            </button>
          </form>

          <p className="text-sm text-center text-text-muted mt-6">
            ¿Ya tienes una cuenta?{" "}
            <Link
              to="/login"
              className="font-medium text-blue-400 hover:text-opacity-80"
            >
              Iniciar sesión
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
