import { useState, useEffect } from "react";
import { FaArrowUp, FaArrowDown, FaWallet, FaSearch } from "react-icons/fa";
import { toast } from "react-toastify";
import HeaderModules from "../../../components/HeaderModules";
import TransactionTable from "./components/TransactionTable";
import CreateTransactionModal from "./components/CreateTransactionModal";
import StadisticCard from "../../../components/StadisticCard";
import CustomInput from "../../../components/CustomInput";
import CustomSelect from "../../../components/CustomSelect";
import { getTransactions, getResumen } from "../../../services/finances";

export default function FinanzasPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [resumen, setResumen] = useState({ totalIngresos: 0, totalEgresos: 0, balance: 0 });
  const [loading, setLoading] = useState(false);
  const [filterType, setFilterType] = useState("Todos");
  const [filterSearch, setFilterSearch] = useState("");
  const [dateRange, setDateRange] = useState("All time");
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

const fetchData = async (currentPage = 1) => {
  setLoading(true)
  try {
    const [transData, resumenData] = await Promise.all([
      getTransactions(currentPage),
      getResumen()
    ])
    setTransactions(transData.data)
    setTotalPages(transData.meta.totalPages)
    setResumen(resumenData.data)
  } catch (error) {
    toast.error('Error al cargar los datos')
  } finally {
    setLoading(false)
  }
}

useEffect(() => {
  fetchData(page)
}, [page])

  const stats = [
    { label: "Saldo actual",   value: `$${Number(resumen.balance).toFixed(2)}`,       icon: FaWallet,    color: "text-primary", bg: "bg-primary/10" },
    { label: "Total ingresos", value: `$${Number(resumen.totalIngresos).toFixed(2)}`, icon: FaArrowUp,   color: "text-success", bg: "bg-success/10" },
    { label: "Total egresos",  value: `$${Number(resumen.totalEgresos).toFixed(2)}`,  icon: FaArrowDown, color: "text-error",   bg: "bg-error/10"   },
  ];

  const optionsFilter = ["Todos", "Ingreso", "Egreso"];
  const optionsDateRange = ["All time", "Last month", "Last 3 months", "Last 6 months"];

  const getDateFrom = () => {
    const now = new Date();
    if (dateRange === "Last month")    return new Date(now.setMonth(now.getMonth() - 1)).toISOString().split("T")[0];
    if (dateRange === "Last 3 months") return new Date(now.setMonth(now.getMonth() - 3)).toISOString().split("T")[0];
    if (dateRange === "Last 6 months") return new Date(now.setMonth(now.getMonth() - 6)).toISOString().split("T")[0];
    return null;
  };

  const filteredMovements = transactions
    .filter(m => filterType === "Todos" ? true : m.tipo === filterType.toUpperCase())
    .filter(m => m.descripcion.toLowerCase().includes(filterSearch.toLowerCase()))
    .filter(m => {
      if (dateRange === "All time") return true;
      const movDate  = new Date(m.fecha);
      const fromDate = new Date(getDateFrom());
      return movDate >= fromDate;
    });

  return (
    <div className="w-full space-y-6 mx-auto p-6">
      <CreateTransactionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={fetchData}
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

      <TransactionTable transaction={filteredMovements} loading={loading} page={page} totalPages={totalPages} onPageChange={setPage} />
    </div>
  );
}