import { useState } from "react";
import { FaArrowUp, FaArrowDown, FaWallet } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import HeaderModules from "../../../components/HeaderModules";
import TransactionTable from "./components/TransactionTable";
import CreateTransactionModal from "./components/CreateTransactionModal";
import StadisticCard from "../../../components/StadisticCard";
import CustomInput from "../../../components/CustomInput";
import CustomSelect from "../../../components/CustomSelect";

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
  const [filterType, setFilterType] = useState("Todos");
  const [filterSearch, setFilterSearch] = useState("");
  const [dateRange, setDateRange] = useState("all");

  const stats = [
    { label: "Saldo actual",    value: `$${saldo.toFixed(2)}`,         icon: FaWallet,   color: "text-primary", bg: "bg-primary/10" },
    { label: "Total ingresos",  value: `$${totalIngresos.toFixed(2)}`, icon: FaArrowUp,  color: "text-success", bg: "bg-success/10" },
    { label: "Total egresos",   value: `$${totalEgresos.toFixed(2)}`,  icon: FaArrowDown, color: "text-error",  bg: "bg-error/10" },
  ];

  const optionsFilter = ["Todos", "Ingreso", "Egreso"];

  const optionsDateRange = ["All time", "Last month", "Last 3 months", "Last 6 months"];

  const getDateFrom = () => {
    const now = new Date();
    if (dateRange === "Last month") return new Date(now.setMonth(now.getMonth() - 1)).toISOString().split("T")[0];
    if (dateRange === "Last 3 months") return new Date(now.setMonth(now.getMonth() - 3)).toISOString().split("T")[0];
    if (dateRange === "Last 6 months") return new Date(now.setMonth(now.getMonth() - 6)).toISOString().split("T")[0];
    return null;
  };

  const filteredMovements = MOCK_MOVIMIENTOS
    .filter(m => filterType === "Todos" ? true : m.tipo === filterType.toLowerCase())
    .filter(m => m.descripcion.toLowerCase().includes(filterSearch.toLowerCase()))
    .filter(m => {
      if (dateRange === "All time") return true;
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

      <HeaderModules
        title="Finanzas"
        description="Control de ingresos y egresos de la comunidad"
        onActionBtn={() => setIsModalOpen(true)}
        titleBtn="Nuevo movimiento"
      />

      <StadisticCard stats={stats} cols={3} />

      <div className="flex flex-col md:flex-row gap-4 border-y border-base-200 py-4">
        <CustomInput
          label="Búsqueda"
          className="md:max-w-80"
          placeholder="Buscar movimiento..."
          icon={FaSearch}
          value={filterSearch}
          onChange={(e) => setFilterSearch(e.target.value)}
        />
        <CustomSelect
          label="Tipo"
          className="md:max-w-60"
          options={optionsFilter}
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
        />
        <CustomSelect
          label="Rango de fechas"
          className="md:max-w-60"
          options={optionsDateRange}
          value={dateRange}
          onChange={(e) => setDateRange(e.target.value)}
        />
      </div>

      <TransactionTable transaction={filteredMovements} />
    </div>
  );
}