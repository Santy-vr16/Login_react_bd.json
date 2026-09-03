import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api/api";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const checkUser = await API.get(`/users?email=${email}`);
      if (checkUser.data.length > 0) {
        setError("El correo electrónico ya se encuentra registrado.");
        return;
      }
      await API.post("/users", { email, password });
      alert("Registro exitoso. Ahora puedes iniciar sesión.");
      navigate("/login");
    } catch (err) {
      setError("Error al registrar el usuario.");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
      <div className="card shadow-lg border-0 rounded-4 p-4" style={{ maxWidth: "420px", width: "100%" }}>
        <div className="card-body">
          <div className="text-center mb-4">
            <h3 className="fw-bold text-success">Crear Cuenta</h3>
            <p className="text-muted small">Regístrate para empezar a gestionar tus productos</p>
          </div>

          {error && <div className="alert alert-danger py-2 rounded-3 small text-center">{error}</div>}
          
          <form onSubmit={handleRegister}>
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

            <button type="submit" className="btn btn-success w-100 rounded-3 py-2 fw-semibold shadow-sm">
              Registrarse
            </button>
          </form>

          <p className="mt-4 text-center mb-0 text-muted small">
            ¿Ya tienes cuenta? <Link to="/login" className="text-success fw-bold text-decoration-none">Inicia sesión</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;