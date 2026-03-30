import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import MinuteStats from "./components/MinuteStats";
import MinuteTable from "./components/MinuteTable";
import CreateMinuteModal from "./components/CreateMinuteModal";

const MinutePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="w-full space-y-8 p-6 mx-auto animate-in fade-in duration-700">
      <CreateMinuteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-base-content tracking-tight">
            Registro de Actas
          </h2>

          <p className="text-sm text-base-content/60 mt-1">
            Gestión y archivo oficial de asambleas, reuniones y acuerdos
            comunitarios
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="btn btn-neutral btn-sm md:btn-md gap-2"
        >
          <FaPlus /> <span className="hidden sm:inline">Nueva Acta</span>
        </button>
      </div>

      {/* Stats Section */}
      <MinuteStats />

      {/* List Section */}
      <div className="space-y-4">
        <MinuteTable />
      </div>
    </div>
  );
};

export default MinutePage;
