import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api/api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await API.get(`/users?email=${email}&password=${password}`);
      if (response.data.length > 0) {
        localStorage.setItem("user", JSON.stringify(response.data[0]));
        navigate("/");
      } else {
        setError("Credenciales inválidas. Verifica tu correo y contraseña.");
      }
    } catch (err) {
      setError("Ocurrió un error de conexión con el servidor.");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
      <div className="card shadow-lg border-0 rounded-4 p-4" style={{ maxWidth: "420px", width: "100%" }}>
        <div className="card-body">
          <div className="text-center mb-4">
            <h3 className="fw-bold text-primary">¡Bienvenido!</h3>
            <p className="text-muted small">Ingresa tus datos para acceder al sistema</p>
          </div>

          {error && <div className="alert alert-danger py-2 rounded-3 small text-center">{error}</div>}
          
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label className="form-label small fw-bold text-muted">Correo Electrónico</label>
              <input
                type="email"
                className="form-control rounded-3 border-0 bg-light py-2"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="form-label small fw-bold text-muted">Contraseña</label>
              <input
                type="password"
                className="form-control rounded-3 border-0 bg-light py-2"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary w-100 rounded-3 py-2 fw-semibold shadow-sm">
              Iniciar Sesión
            </button>
          </form>

          <p className="mt-4 text-center mb-0 text-muted small">
            ¿No tienes cuenta? <Link to="/register" className="text-primary fw-bold text-decoration-none">Regístrate aquí</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;