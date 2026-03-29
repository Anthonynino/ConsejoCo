import { useState } from "react";
import { FaUsers, FaBox, FaHistory } from "react-icons/fa";
import ClapBeneficiaries from "./components/ClapBeneficiaries";
import ClapProducts from "./components/ClapProducts";
import ClapInventory from "./components/ClapInventory";

const ClapPage = () => {
  const [activeTab, setActiveTab] = useState("beneficiaries");

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
        
        {/* Tabs Navigation */}
        <div className="tabs tabs-box bg-base-200/50 p-1 rounded-xl border border-base-200">
          <button 
            className={`tab tab-sm md:tab-md gap-2 font-bold transition-all ${activeTab === "beneficiaries" ? "tab-active bg-base-100 shadow-sm" : "opacity-60 hover:opacity-100"}`}
            onClick={() => setActiveTab("beneficiaries")}
          >
            <FaUsers size={14} /> <span className="hidden sm:inline">Beneficiarios</span>
          </button>
          <button 
            className={`tab tab-sm md:tab-md gap-2 font-bold transition-all ${activeTab === "products" ? "tab-active bg-base-100 shadow-sm" : "opacity-60 hover:opacity-100"}`}
            onClick={() => setActiveTab("products")}
          >
            <FaBox size={14} /> <span className="hidden sm:inline">Catálogo</span>
          </button>
          <button 
            className={`tab tab-sm md:tab-md gap-2 font-bold transition-all ${activeTab === "inventory" ? "tab-active bg-base-100 shadow-sm" : "opacity-60 hover:opacity-100"}`}
            onClick={() => setActiveTab("inventory")}
          >
            <FaHistory size={14} /> <span className="hidden sm:inline">Inventario</span>
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
        {activeTab === "beneficiaries" && <ClapBeneficiaries />}
        {activeTab === "products" && <ClapProducts />}
        {activeTab === "inventory" && <ClapInventory />}
      </div>
    </div>
  );
};

export default ClapPage;
