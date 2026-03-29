import { useState } from "react";
import { FaUsers, FaUserPlus, FaSearch, FaEllipsisV } from "react-icons/fa";
import RegisterBeneficiaryModal from "./RegisterBeneficiaryModal";

const MOCK_FAMILIES = [
  { id: 1, head: "Laura Martínez", idNumber: "V-12.345.678", members: 4, address: "Sector 1, Casa #12", status: "Activo" },
  { id: 2, head: "Carlos Rondón", idNumber: "V-18.765.432", members: 3, address: "Sector 2, Calle Principal", status: "Activo" },
  { id: 3, head: "María Useche", idNumber: "V-20.111.222", members: 5, address: "Sector 1, Vereda 3", status: "Suspendido" },
];

const ClapBeneficiaries = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="space-y-6">
      <RegisterBeneficiaryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-bold text-base-content flex items-center gap-2">
            <FaUsers className="text-primary" /> Registro de Beneficiarios
          </h3>
          <p className="text-sm text-base-content/60">Familias calificadas para el programa</p>
        </div>
        <div className="flex gap-2">
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 opacity-30 h-3 w-3" />
            <input 
              type="text" 
              placeholder="Buscar familia..." 
              className="input input-sm input-bordered pl-9 w-48 md:w-64"
            />
          </div>
          <button 
            className="btn btn-neutral btn-sm gap-2"
            onClick={() => setIsModalOpen(true)}
          >
            <FaUserPlus /> Vincular Jefe
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {MOCK_FAMILIES.map((family) => (
          <div key={family.id} className="card bg-base-100 border border-base-200 shadow-sm overflow-hidden flex-row">
            <div className={`w-2 ${family.status === 'Activo' ? 'bg-success' : 'bg-error'}`}></div>
            <div className="card-body p-5 flex-1">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="avatar placeholder">
                    <div className="bg-neutral text-neutral-content rounded-full w-10">
                      <span className="text-xs font-bold">{family.head.substring(0, 2).toUpperCase()}</span>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold leading-none">{family.head}</h4>
                    <span className="text-[10px] opacity-50 font-mono italic">{family.idNumber}</span>
                  </div>
                </div>
                <div className="dropdown dropdown-end">
                  <label tabIndex={0} className="btn btn-ghost btn-xs btn-circle"><FaEllipsisV /></label>
                  <ul tabIndex={0} className="dropdown-content z-1 menu p-2 shadow bg-base-100 rounded-box w-52 border border-base-200">
                    <li><a>Ver Ficha Familiar</a></li>
                    <li><a>Editar Información</a></li>
                    <li><a className="text-error">Suspender Beneficio</a></li>
                  </ul>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-2 mt-4 text-sm">
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase opacity-40 font-bold">Cargas Familiares</span>
                  <span className="font-medium">{family.members} personas</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase opacity-40 font-bold">Dirección</span>
                  <span className="font-medium truncate">{family.address}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClapBeneficiaries;
