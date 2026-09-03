import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm py-3 mb-5">
      <div className="container">
        <Link className="navbar-brand fw-bold text-uppercase tracking-wider" to="/">
          <i className="bi bi-box-seam me-2"></i>Gestor Pro
        </Link>
        <div className="navbar-nav ms-auto">
          {user ? (
            <div className="d-flex align-items-center gap-3">
              <span className="navbar-text text-light bg-secondary bg-opacity-25 px-3 py-1 rounded-pill small">
                <i className="bi bi-person-circle me-1"></i> Hola, <strong>{user.email}</strong>
              </span>
              <button
                onClick={handleLogout}
                className="btn btn-outline-danger btn-sm rounded-pill px-3"
              >
                Cerrar Sesión
              </button>
            </div>
          ) : (
            <div className="d-flex gap-2">
              <Link className="btn btn-outline-light btn-sm rounded-pill px-3" to="/login">
                Login
              </Link>
              <Link className="btn btn-primary btn-sm rounded-pill px-3 shadow-sm" to="/register">
                Registro
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;