import { useState } from "react";
import CardMember from "./components/CardMember";
import CreateMemberModal from "./components/CreateMemberModal";
import HeaderModules from "../../../components/HeaderModules";
import { FaSearch } from "react-icons/fa";
import CustomInput from "../../../components/CustomInput";

const MOCK_MIEMBROS = [
  {
    id: 1,
    nombre: "Laura Martínez",
    cedula: "V-12.345.678",
    telefono: "0414-123-4567",
    correo: "laura@correo.com",
    cargo: "Jefe/a",
    iniciales: "LM",
    color: "bg-violet-100 text-violet-700",
  },
  {
    id: 2,
    nombre: "Carlos Rondón",
    cedula: "V-18.765.432",
    telefono: "0424-987-6543",
    correo: "carlos@correo.com",
    cargo: "Ninguno",
    iniciales: "CR",
    color: "bg-sky-100 text-sky-700",
  },
  {
    id: 3,
    nombre: "María Useche",
    cedula: "V-20.111.222",
    telefono: "0416-555-0011",
    correo: "maria@correo.com",
    cargo: "Lider",
    iniciales: "MU",
    color: "bg-emerald-100 text-emerald-700",
  },
  {
    id: 4,
    nombre: "Pedro Salinas",
    cedula: "V-15.999.001",
    telefono: "0412-300-1122",
    correo: "pedro@correo.com",
    cargo: "Ninguno",
    iniciales: "PS",
    color: "bg-amber-100 text-amber-700",
  },
  {
    id: 5,
    nombre: "Ana Figueroa",
    cedula: "V-22.456.789",
    telefono: "0426-741-8520",
    correo: "ana@correo.com",
    cargo: "Tesorero/a",
    iniciales: "AF",
    color: "bg-rose-100 text-rose-700",
  },
  {
    id: 6,
    nombre: "Jorge Tovar",
    cedula: "V-17.852.963",
    telefono: "0414-963-8520",
    correo: "jorge@correo.com",
    cargo: "Vocero/a",
    iniciales: "JT",
    color: "bg-cyan-100 text-cyan-700",
  },
];

const MemberPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="w-full space-y-6 mx-auto p-6">
      <CreateMemberModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      {/* Header */}
      <HeaderModules
        title={"Miembros"}
        description={`${MOCK_MIEMBROS.length} miembros registrados`}
        onActionBtn={() => setIsModalOpen(true)}
        titleBtn={"Nuevo miembro"}
      />
      <div className="flex flex-col md:flex-row gap-4 border-y border-base-200 py-4">
        <CustomInput
          className={"md:w-80"}
          placeholder={"Buscar miembro..."}
          icon={FaSearch}
        />
      </div>

      {/* Grid de tarjetas */}
      <div className="mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {MOCK_MIEMBROS.map((miembro) => (
          <CardMember key={miembro.id} miembro={miembro} />
        ))}
      </div>
    </div>
  );
};

export default MemberPage;
