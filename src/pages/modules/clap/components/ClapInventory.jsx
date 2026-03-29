import { useState } from "react";
import { FaHistory, FaPlus, FaCalendarAlt, FaExclamationTriangle } from "react-icons/fa";
import InventoryEntryModal from "./InventoryEntryModal";

const MOCK_ENTRIES = [
  { id: 1, product: "Arroz", quantity: 100, unit: "kg", batch: "L-2024-001", expiry: "2025-06-15", date: "2024-03-20" },
  { id: 2, product: "Harina de Maíz", quantity: 200, unit: "kg", batch: "L-2024-085", expiry: "2024-12-10", date: "2024-03-22" },
  { id: 3, product: "Aceite vegetal", quantity: 50, unit: "L", batch: "L-2024-033", expiry: "2024-09-30", date: "2024-03-25" },
];

const ClapInventory = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="space-y-6">
      <InventoryEntryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-bold text-base-content flex items-center gap-2">
            <FaHistory className="text-primary" /> Historial de Entradas
          </h3>
          <p className="text-sm text-base-content/60">Registro masivo de suministros y vencimientos</p>
        </div>
        <button 
          className="btn btn-neutral btn-sm md:btn-md gap-2"
          onClick={() => setIsModalOpen(true)}
        >
          <FaPlus /> Cargar Entrada
        </button>
      </div>

      <div className="overflow-x-auto bg-base-100 rounded-xl border border-base-200">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th className="text-[10px] uppercase opacity-50">Producto</th>
              <th className="text-[10px] uppercase opacity-50">Fecha Entrada</th>
              <th className="text-[10px] uppercase opacity-50">Cantidad</th>
              <th className="text-[10px] uppercase opacity-50">Lote</th>
              <th className="text-[10px] uppercase opacity-50">Vencimiento</th>
              <th className="text-[10px] uppercase opacity-50">Estado</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_ENTRIES.map((entry) => {
              const isCloseToExpiry = new Date(entry.expiry) < new Date("2025-01-01"); // Mock logic
              return (
                <tr key={entry.id} className="hover">
                  <td className="font-bold">{entry.product}</td>
                  <td className="text-xs opacity-70 italic">{entry.date}</td>
                  <td>{entry.quantity} {entry.unit}</td>
                  <td className="font-mono text-xs">{entry.batch}</td>
                  <td className="text-xs">
                    <span className="flex items-center gap-1">
                      <FaCalendarAlt className="opacity-40" /> {entry.expiry}
                    </span>
                  </td>
                  <td>
                    {isCloseToExpiry ? (
                      <span className="badge badge-warning badge-sm gap-1 uppercase font-bold text-[9px]">
                        <FaExclamationTriangle /> Pronto a vencer
                      </span>
                    ) : (
                      <span className="badge badge-success badge-sm uppercase font-bold text-[9px]">Al día</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClapInventory;
