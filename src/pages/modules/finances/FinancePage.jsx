import { useState } from "react";
import { FaArrowUp, FaArrowDown, FaWallet } from "react-icons/fa";
import HeaderModules from "../../../components/HeaderModules";
import TransactionTable from "./components/TransactionTable";
import CreateTransactionModal from "./components/CreateTransactionModal";

const MOCK_MOVIMIENTOS = [
  { id: 1, tipo: "ingreso",  descripcion: "Aporte vecinos sector A", amount: 150.00, fecha: "2024-05-01" },
  { id: 2, tipo: "egreso",   descripcion: "Compra de materiales limpieza", amount: 45.50, fecha: "2024-05-03" },
  { id: 3, tipo: "ingreso",  descripcion: "Fondo gubernamental mayo", amount: 500.00, fecha: "2024-05-10" },
  { id: 4, tipo: "egreso",   descripcion: "Pago servicio electricista", amount: 80.00, fecha: "2024-05-12" },
  { id: 5, tipo: "ingreso",  descripcion: "Donación anónima", amount: 200.00, fecha: "2024-05-15" },
];

const totalIngresos = MOCK_MOVIMIENTOS.filter(m => m.tipo === "ingreso").reduce((acc, m) => acc + m.amount, 0);
const totalEgresos  = MOCK_MOVIMIENTOS.filter(m => m.tipo === "egreso").reduce((acc, m) => acc + m.amount, 0);
const saldo         = totalIngresos - totalEgresos;

export default function FinanzasPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterType, setFilterType] = useState("todos");
  const [filterSearch, setFilterSearch] = useState("");
  const [dateRange, setDateRange] = useState("all");

  {/*Date Range */}

  const getDateFrom = () => {
  const now = new Date();
  if (dateRange === "1m") return new Date(now.setMonth(now.getMonth() - 1)).toISOString().split("T")[0];
  if (dateRange === "3m") return new Date(now.setMonth(now.getMonth() - 3)).toISOString().split("T")[0];
  if (dateRange === "6m") return new Date(now.setMonth(now.getMonth() - 6)).toISOString().split("T")[0];
  return null;
};
  

  const filteredMovements = MOCK_MOVIMIENTOS
  .filter(m => filterType === "todos" ? true : m.tipo === filterType)
  .filter(m => m.descripcion.toLowerCase().includes(filterSearch.toLowerCase()))
  .filter(m => {
    if (dateRange === "all") return true;
    const movDate = new Date(m.fecha);
    const fromDate = new Date(getDateFrom());
    return movDate >= fromDate;
  });
  

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

      {/* Filtros */}
      <div className="flex flex-wrap gap-4">
        <div className="flex-1 min-w-xs">
          <label className="text-xs font-medium text-base-content/50 uppercase tracking-wide">
            Tipo
          </label>
          <div className="flex gap-3 mt-1">
            <button
              className={`flex-1 py-2.5 rounded-lg border text-sm font-medium transition-colors${filterType === "todos"
                ? "border-primary/40 bg-primary/10 text-primary"
                : "border-base-200 text-base-content/50 hover:border-primary/40 hover:bg-primary/10 hover:text-primary"
                }`}
              onClick={() => setFilterType("todos")}
            >
              Todos
            </button>
            <button
              className={`flex-1 py-2.5 rounded-lg border text-sm font-medium transition-colors${filterType === "ingreso"
                ? "border-success/40 bg-success/10 text-success"
                : "border-base-200 text-base-content/50 hover:border-success/40 hover:bg-success/10 hover:text-success"
                }`}
              onClick={() => setFilterType("ingreso")}
            >
              Ingresos
            </button>
            <button
              className={`flex-1 py-2.5 rounded-lg border text-sm font-medium transition-colors${filterType === "egreso"
                ? "border-error/40 bg-error/10 text-error"
                : "border-base-200 text-base-content/50 hover:border-error/40 hover:bg-error/10 hover:text-error"
                }`}
              onClick={() => setFilterType("egreso")}
            >
              Egresos
            </button>
          </div>
        </div>

        <div className="flex-1 min-w-xs">
          <label className="text-xs font-medium text-base-content/50 uppercase tracking-wide">
            Buscar
          </label>
          <input
            type="text"
            placeholder="Buscar movimiento..."
            className="input input-bordered w-full mt-1"
            value={filterSearch}
            onChange={(e) => setFilterSearch(e.target.value)}
          />
        </div>
        <div className="flex-1 min-w-xs">
          <label className="text-xs font-medium text-base-content/50 uppercase tracking-wide">
            Rango de fechas 
          </label>
          <select
          value={dateRange}
          onChange={(e) => setDateRange(e.target.value)}
          className="w-full mt-1 border border-base-300 rounded-lg px-3 py-2 text-sm text-base-content/70 bg-base-100 outline-none cursor-pointer"
          >
            <option value="all">All time</option>
            <option value="1m">Last month</option>
            <option value="3m">Last 3 months</option>
            <option value="6m">Last 6 months</option>
          </select>
        </div>
      </div>

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
      <TransactionTable transaction={filteredMovements} />

    </div>
  );
}