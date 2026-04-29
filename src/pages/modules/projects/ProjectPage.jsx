import { useState } from "react";
import {
  FaSearch,
  FaProjectDiagram,
  FaHammer,
  FaCheckCircle,
} from "react-icons/fa";
import ProjectCard from "./components/ProjectCard";
import CreateProjectModal from "./components/CreateProjectModal";
import HeaderModules from "../../../components/HeaderModules";
import StadisticCard from "../../../components/StadisticCard";
import CustomInput from "../../../components/CustomInput";
import CustomSelect from "../../../components/CustomSelect";


const ProjectPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const MOCK_PROJECTS = [
  {
    id: 1,
    title: "Reparación de Alumbrado Público",
    description:
      "Sustitución de 50 luminarias LED en las calles principales del sector 1 para mejorar la seguridad nocturna.",
    status: "En Ejecución",
    progress: 65,
    beneficiaries: 450,
    deadline: "20 May 2024",
    location: "Sector 1 - Calles 1 a 5",
    priority: "Alta",
  },
  {
    id: 2,
    title: "Censo de Viviendas y Familias",
    description:
      "Actualización de los datos socioeconómicos de todas las familias residentes para los programas sociales del estado.",
    status: "Completado",
    progress: 100,
    beneficiaries: 1200,
    deadline: "12 Mar 2024",
    location: "Toda la comunidad",
    priority: "Media",
  },
  {
    id: 3,
    title: "Impermeabilización del Bloque 3",
    description:
      "Trabajos de mantenimiento y aplicación de manto asfáltico en la azotea del edificio para evitar filtraciones.",
    status: "Planificado",
    progress: 10,
    beneficiaries: 80,
    deadline: "15 Jun 2024",
    location: "Bloque 3, Sector Central",
    priority: "Alta",
  },
  {
    id: 4,
    title: "Jornada de Vacunación Infantil",
    description:
      "Operativo especial de salud dirigido a niños entre 0 y 12 años en conjunto con el ambulatorio local.",
    status: "En Ejecución",
    progress: 40,
    beneficiaries: 200,
    deadline: "30 Apr 2024",
    location: "Casa Comunal",
    priority: "Crítica",
  },
];

const stats = [
  {
    label: "Total Proyectos",
    value: "12",
    icon: FaProjectDiagram,
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    label: "En Ejecución",
    value: "4",
    icon: FaHammer,
    color: "text-warning",
    bg: "bg-warning/10",
  },
  {
    label: "Finalizados",
    value: "8",
    icon: FaCheckCircle,
    color: "text-success",
    bg: "bg-success/10",
  },
];

  const optionsFilter = ["Todos", "Activos", "Finalizados", "En Pausa"]

  return (
    <div className="w-full space-y-6 mx-auto p-6">
      <CreateProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      {/* Header */}
      <HeaderModules
        title={"Gestión de Proyectos"}
        description={`Seguimiento de obras, iniciativas sociales y recursos de la comunidad`}
        onActionBtn={() => setIsModalOpen(true)}
        titleBtn={"Nuevo Proyecto"}
      />

      {/* Stats Dashboard */}
      <StadisticCard stats={stats} cols={3} />

      {/* Filters and Search */}
      <div className="flex flex-col md:flex-row gap-4 border-y border-base-200 py-4">
        <CustomInput
          className={"md:max-w-80"}
          placeholder={"Buscar por nombre"}
          icon={FaSearch}
        />
        <CustomSelect
          className={"md:max-w-80"}
          options={optionsFilter}
        />
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {MOCK_PROJECTS.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      {/* Empty State Mock (if no projects) */}
      {MOCK_PROJECTS.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 opacity-40 grayscale space-y-4">
          <FaProjectDiagram size={64} />
          <p className="text-lg font-bold">No hay proyectos registrados aún.</p>
        </div>
      )}
    </div>
  );
};

export default ProjectPage;
