import { useState } from "react";
import { FaArrowUp, FaArrowDown, FaWallet } from "react-icons/fa";
import HeaderModules from "../../../components/HeaderModules";
import TransactionTable from "./components/TransactionTable";
import CreateTransactionModal from "./components/CreateTransactionModal";

const MOCK_MOVIMIENTOS = [
  { id: 1, tipo: "ingreso",  descripcion: "Aporte vecinos sector A", monto: 150.00, fecha: "2024-05-01" },
  { id: 2, tipo: "egreso",   descripcion: "Compra de materiales limpieza", monto: 45.50, fecha: "2024-05-03" },
  { id: 3, tipo: "ingreso",  descripcion: "Fondo gubernamental mayo", monto: 500.00, fecha: "2024-05-10" },
  { id: 4, tipo: "egreso",   descripcion: "Pago servicio electricista", monto: 80.00, fecha: "2024-05-12" },
  { id: 5, tipo: "ingreso",  descripcion: "Donación anónima", monto: 200.00, fecha: "2024-05-15" },
];

const totalIngresos = MOCK_MOVIMIENTOS.filter(m => m.tipo === "ingreso").reduce((acc, m) => acc + m.monto, 0);
const totalEgresos  = MOCK_MOVIMIENTOS.filter(m => m.tipo === "egreso").reduce((acc, m) => acc + m.monto, 0);
const saldo         = totalIngresos - totalEgresos;

export default function FinanzasPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="w-full space-y-6 mx-auto p-6">

      <CreateTransactionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      {/* Header */}
      <HeaderModules
        title="Finanzas"
        description="Control de ingresos y egresos de la comunidad"
        onActionBtn={() => setIsModalOpen(true)}
        titleBtn="Nuevo movimiento"
      />

      {/* Tarjetas resumen */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

        <div className="border border-base-200 rounded-xl p-5 flex items-center gap-4">
          <div className="bg-primary/10 text-primary p-3 rounded-lg">
            <FaWallet className="text-lg" />
          </div>
          <div>
            <p className="text-xs text-base-content/50 font-medium uppercase tracking-wide">Saldo actual</p>
            <p className="text-2xl font-semibold text-base-content">${saldo.toFixed(2)}</p>
          </div>
        </div>

        <div className="border border-base-200 rounded-xl p-5 flex items-center gap-4">
          <div className="bg-success/10 text-success p-3 rounded-lg">
            <FaArrowUp className="text-lg" />
          </div>
          <div>
            <p className="text-xs text-base-content/50 font-medium uppercase tracking-wide">Total ingresos</p>
            <p className="text-2xl font-semibold text-success">${totalIngresos.toFixed(2)}</p>
          </div>
        </div>

        <div className="border border-base-200 rounded-xl p-5 flex items-center gap-4">
          <div className="bg-error/10 text-error p-3 rounded-lg">
            <FaArrowDown className="text-lg" />
          </div>
          <div>
            <p className="text-xs text-base-content/50 font-medium uppercase tracking-wide">Total egresos</p>
            <p className="text-2xl font-semibold text-error">${totalEgresos.toFixed(2)}</p>
          </div>
        </div>

      </div>

      {/* Tabla */}
      <TransactionTable transaction={MOCK_MOVIMIENTOS} />

    </div>
  );
}