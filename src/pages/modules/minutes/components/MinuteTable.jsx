import { FaSearch } from "react-icons/fa";
import CardMinute from "./CardMinute";
import CustomInput from "../../../../components/CustomInput";
import CustomSelect from "../../../../components/CustomSelect";

const MOCK_MINUTES = [
  {
    id: 1,
    title: "Asamblea General de Presupuesto 2024",
    date: "2024-03-20",
    type: "Ordinaria",
    attendance: 85,
    status: "Firmada",
  },
  {
    id: 2,
    title: "Reunión de Emergencia: Alumbrado Calle 3",
    date: "2024-03-15",
    type: "Extraordinaria",
    attendance: 24,
    status: "Firmada",
  },
  {
    id: 3,
    title: "Elección de Comité Electoral",
    date: "2024-03-05",
    type: "Asamblea General",
    attendance: 112,
    status: "En Revisión",
  },
  {
    id: 4,
    title: "Planificación de Jornada CLAP Abril",
    date: "2024-02-28",
    type: "Ordinaria",
    attendance: 30,
    status: "Firmada",
  },
];

const MinuteTable = () => {
  const typeColors = {
    Ordinaria: "badge-ghost",
    Extraordinaria: "badge-warning",
    "Asamblea General": "badge-primary",
  };
  
  const optionsFilter = ["Todos", "Ordinaria", "Extraordinaria", "Asamblea General"]

  return (
    <div className="space-y-4">
      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4 border-y border-base-200 py-4">
        <CustomInput
          className={"md:max-w-80"}
          placeholder={"Buscar por título o fecha..."}
          icon={FaSearch}
        />
        <CustomSelect
          className={"md:max-w-80"}
          options={optionsFilter}
        />
      </div>

      {/* Grid de tarjetas */}
      <div className="mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {MOCK_MINUTES.map((acta) => (
          <CardMinute key={acta.id} acta={acta} typeColors={typeColors} />
        ))}
      </div>
    </div>
  );
};

export default MinuteTable;
