import { useState } from "react";
import { FaPlus, FaBox, FaTruck, FaEdit, FaTrash } from "react-icons/fa";
import ProductModal from "./ProductModal";

const MOCK_PRODUCTS = [
  { id: 1, name: "Arroz", unit: "kg", category: "Granos", stock: 120, supplier: "Gubernamental" },
  { id: 2, name: "Harina de Maíz", unit: "kg", category: "Harinas", stock: 250, supplier: "Gubernamental" },
  { id: 3, name: "Aceite vegetal", unit: "L", category: "Aceites", stock: 85, supplier: "Compra Local" },
  { id: 4, name: "Leche en polvo", unit: "unidad (400g)", category: "Lácteos", stock: 40, supplier: "Donación" },
];

const ClapProducts = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="space-y-6">
      <ProductModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-bold text-base-content flex items-center gap-2">
            <FaBox className="text-primary" /> Catálogo de Productos
          </h3>
          <p className="text-sm text-base-content/60">Gestión de rubros y proveedores</p>
        </div>
        <button 
          className="btn btn-neutral btn-sm md:btn-md gap-2"
          onClick={() => setIsModalOpen(true)}
        >
          <FaPlus /> Nuevo Producto
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {MOCK_PRODUCTS.map((product) => (
          <div key={product.id} className="card bg-base-100 border border-base-200 shadow-sm hover:shadow-md transition-all">
            <div className="card-body p-5">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-bold text-lg">{product.name}</h4>
                  <span className="badge badge-ghost badge-sm">{product.category}</span>
                </div>
                <div className="flex gap-1">
                  <button className="btn btn-ghost btn-xs btn-square text-info"><FaEdit /></button>
                  <button className="btn btn-ghost btn-xs btn-square text-error"><FaTrash /></button>
                </div>
              </div>
              
              <div className="divider my-1 opacity-20"></div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="opacity-60">Unidad:</span>
                  <span className="font-medium">{product.unit}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="opacity-60">Proveedor:</span>
                  <span className="badge badge-outline badge-sm flex items-center gap-1">
                    <FaTruck size={10} /> {product.supplier}
                  </span>
                </div>
                <div className="flex justify-between text-sm items-center">
                  <span className="opacity-60">Stock Total:</span>
                  <span className={`font-bold ${product.stock < 50 ? 'text-error' : 'text-success'}`}>
                    {product.stock} {product.unit}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClapProducts;
