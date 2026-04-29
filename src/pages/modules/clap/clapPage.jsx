import ClapBeneficiaries from "./components/ClapBeneficiaries";
import HeaderModules from "../../../components/HeaderModules";
import { useState } from "react";
import RegisterBeneficiaryModal from "./components/RegisterBeneficiaryModal";

const ClapPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <div className="w-full space-y-6 mx-auto p-6">
        {/* Header */}
        <HeaderModules
          title={"Módulo CLAP"}
          description={`Gestión integral de suministro y distribución de alimentos`}
          onActionBtn={() => setIsModalOpen(true)}
          titleBtn={"Vincular Jefe"}
        />
        {/* Content Area */}
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
          <ClapBeneficiaries />
        </div>
      </div>
      <RegisterBeneficiaryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default ClapPage;
