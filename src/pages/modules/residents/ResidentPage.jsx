import { useState } from "react";
import { FaPlus, FaUsers } from "react-icons/fa";
import ResidentStats from "./components/ResidentStats";
import ResidentTable from "./components/ResidentTable";
import CreateResidentModal from "./components/CreateResidentModal";

const ResidentPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="w-full space-y-8 p-6 mx-auto animate-in fade-in duration-700">
      <CreateResidentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-base-content tracking-tight">
            Gestión de Habitantes
          </h2>

          <p className="text-sm text-base-content/60 mt-1">
            Visualización y administración de los habitantes registrados en la
            comunidad
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="btn btn-neutral btn-sm md:btn-md gap-2"
        >
          <FaPlus /> <span className="hidden sm:inline">Nuevo Habitante</span>
        </button>
      </div>

      {/* Dashboard Stats */}
      <ResidentStats />

      {/* Residents Table Area */}
      <div className="space-y-4">
        <ResidentTable />
      </div>
    </div>
  );
};

export default ResidentPage;
