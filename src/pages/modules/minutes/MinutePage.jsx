import { useState } from "react";
import MinuteTable from "./components/MinuteTable";
import CreateMinuteModal from "./components/CreateMinuteModal";
import HeaderModules from "../../../components/HeaderModules";
import StadisticCard from "../../../components/StadisticCard";
import {
  FaCalendarCheck,
  FaExclamationCircle,
  FaFileSignature,
  FaUsers,
} from "react-icons/fa";

const MinutePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const stats = [
    {
      label: "Total de Actas",
      value: "42",
      icon: FaFileSignature,
      color: "text-primary",
      bg: "bg-primary/10",
    },
    {
      label: "Asambleas este Mes",
      value: "3",
      icon: FaCalendarCheck,
      color: "text-info",
      bg: "bg-info/10",
    },
    {
      label: "Promedio Asistencia",
      value: "78%",
      icon: FaUsers,
      color: "text-success",
      bg: "bg-success/10",
    },
    {
      label: "Extraordinarias",
      value: "5",
      icon: FaExclamationCircle,
      color: "text-warning",
      bg: "bg-warning/10",
    },
  ];

  return (
    <div className="w-full space-y-8 p-6 mx-auto animate-in fade-in duration-700">
      <CreateMinuteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      {/* Header */}
      <HeaderModules
        title={"Registro de Actas"}
        description={`Gestión y archivo oficial de asambleas, reuniones y acuerdos
            comunitarios`}
        onActionBtn={() => setIsModalOpen(true)}
        titleBtn={"Nueva Acta"}
      />

      <StadisticCard stats={stats} />

      {/* List Section */}
      <div className="space-y-4">
        <MinuteTable />
      </div>
    </div>
  );
};

export default MinutePage;
