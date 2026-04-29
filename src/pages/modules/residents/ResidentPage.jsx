import { useState } from "react";
import ResidentTable from "./components/ResidentTable";
import CreateResidentModal from "./components/CreateResidentModal";
import HeaderModules from "../../../components/HeaderModules";
import StadisticCard from "../../../components/StadisticCard";
import { FaBlind, FaChild, FaUsers, FaVenusMars } from "react-icons/fa";

const ResidentPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

    const stats = [
      { label: "Total Habitantes", value: "1,240", icon: FaUsers, color: "text-primary", bg: "bg-primary/10" },
      { label: "Menores de Edad", value: "320", icon: FaChild, color: "text-info", bg: "bg-info/10" },
      { label: "Adultos Mayores", value: "156", icon: FaBlind, color: "text-warning", bg: "bg-warning/10" },
      { label: "Diversidad Género", value: "52% F / 48% M", icon: FaVenusMars, color: "text-secondary", bg: "bg-secondary/10" },
    ];

  return (
    <div className="w-full space-y-8 p-6 mx-auto animate-in fade-in duration-700">
      <CreateResidentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      {/* Header */}
      <HeaderModules
        title={"Gestión de Habitantes"}
        description={`Visualización y administración de los habitantes registrados en la
            comunidad`}
        onActionBtn={() => setIsModalOpen(true)}
        titleBtn={"Nuevo Habitante"}
      />

      {/* Dashboard Stats */}
      <StadisticCard stats={stats}/>

      {/* Residents Table Area */}
      <div className="space-y-4">
        <ResidentTable />
      </div>
    </div>
  );
};

export default ResidentPage;
