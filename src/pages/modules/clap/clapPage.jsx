import { FaUserPlus } from "react-icons/fa";
import ClapBeneficiaries from "./components/ClapBeneficiaries";

const ClapPage = () => {
  return (
    <div className="w-full space-y-6 mx-auto p-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-base-content">Módulo CLAP</h2>
          <p className="text-sm text-base-content/60 mt-0.5">
            Gestión integral de suministro y distribución de alimentos
          </p>
        </div>
        <button className="btn btn-neutral btn-sm md:btn-md">
         <FaUserPlus /> Vincular Jefe 
        </button>
      </div>

      {/* Content Area */}
      <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
        <ClapBeneficiaries />
      </div>
    </div>
  );
};

export default ClapPage;
