import React, { useEffect, useState } from "react";
import API from "../api/api";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await API.get("/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Error al obtener productos:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (editingId) {
        const productData = { name, price: Number(price), category };
        await API.put(`/products/${editingId}`, productData);
        setEditingId(null);
      } else {
        const nextIdNumber = products.length > 0 ? Math.max(...products.map(p => {
          const match = p.code ? p.code.match(/\d+/) : null;
          return match ? parseInt(match[0]) : p.id;
        })) + 1 : 1;

        const generatedCode = `PROD-${String(nextIdNumber).padStart(3, '0')}`;

        const productData = { 
          code: generatedCode, 
          name, 
          price: Number(price), 
          category 
        };

        await API.post("/products", productData);
      }

      setName("");
      setPrice("");
      setCategory("");
      fetchProducts();
    } catch (error) {
      console.error("Error al guardar producto:", error);
    }
  };

  const handleEdit = (product) => {
    setEditingId(product.id);
    setName(product.name);
    setPrice(product.price);
    setCategory(product.category);
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Deseas eliminar este producto?")) {
      try {
        await API.delete(`/products/${id}`);
        fetchProducts();
      } catch (error) {
        console.error("Error al eliminar producto:", error);
      }
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setName("");
    setPrice("");
    setCategory("");
  };

  return (
    <div className="container pb-5">
      <div className="d-flex align-items-center mb-4">
        <h2 className="fw-bold text-dark m-0">Panel de Productos</h2>
      </div>

      <div className="card border-0 shadow-lg rounded-4 mb-5 overflow-hidden">
        <div className={`card-header py-3 px-4 text-white ${editingId ? "bg-warning" : "bg-primary"}`}>
          <h5 className="m-0 fw-semibold">
            {editingId ? "✏️ Editando Producto" : "➕ Agregar Nuevo Producto"}
          </h5>
        </div>
        <div className="card-body p-4 bg-light">
          <form onSubmit={handleSubmit} className="row g-3">
            <div className="col-md-4">
              <label className="form-label small text-muted fw-bold">Nombre</label>
              <input
                type="text"
                className="form-control rounded-3 border-0 shadow-sm"
                placeholder="Ej. Laptop Gamer"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="col-md-3">
              <label className="form-label small text-muted fw-bold">Precio</label>
              <input
                type="number"
                className="form-control rounded-3 border-0 shadow-sm"
                placeholder="Ej. 1200"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </div>
            <div className="col-md-3">
              <label className="form-label small text-muted fw-bold">Categoría</label>
              <input
                type="text"
                className="form-control rounded-3 border-0 shadow-sm"
                placeholder="Ej. Tecnología"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              />
            </div>
            <div className="col-md-2 d-flex align-items-end gap-2">
              <button
                type="submit"
                className={`btn ${editingId ? "btn-warning text-dark" : "btn-primary"} w-100 rounded-3 shadow-sm fw-semibold`}
              >
                {editingId ? "Actualizar" : "Guardar"}
              </button>
              {editingId && (
                <button
                  type="button"
                  className="btn btn-secondary rounded-3 shadow-sm"
                  onClick={handleCancel}
                >
                  ✕
                </button>
              )}
            </div>
          </form>
        </div>
      </div>

      <div className="card border-0 shadow-lg rounded-4 overflow-hidden">
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-dark text-uppercase fs-7">
                <tr>
                  <th className="py-3 ps-4">Código</th>
                  <th className="py-3">Nombre</th>
                  <th className="py-3">Precio</th>
                  <th className="py-3">Categoría</th>
                  <th className="py-3 text-center pe-4">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {products.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center py-5 text-muted">
                      No hay productos registrados actualmente.
                    </td>
                  </tr>
                ) : (
                  products.map((p) => (
                    <tr key={p.id}>
                      <td className="ps-4 fw-bold text-secondary">{p.code || `#${p.id}`}</td>
                      <td className="fw-semibold text-dark">{p.name}</td>
                      <td className="text-success fw-bold">${p.price}</td>
                      <td>
                        <span className="badge bg-primary bg-opacity-10 text-primary px-3 py-2 rounded-pill">
                          {p.category}
                        </span>
                      </td>
                      <td className="text-center pe-4">
                        <button
                          className="btn btn-sm btn-light text-warning fw-bold me-2 border shadow-sm rounded-pill px-3"
                          onClick={() => handleEdit(p)}
                        >
                          Editar
                        </button>
                        <button
                          className="btn btn-sm btn-light text-danger fw-bold border shadow-sm rounded-pill px-3"
                          onClick={() => handleDelete(p.id)}
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;