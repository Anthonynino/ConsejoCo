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
  const [editingProject, setEditingProject] = useState(null);

  const MOCK_PROJECTS = [
    {
      id: 1,
      nombre: "Reparación de Alumbrado Público",
      descripcion:
        "Sustitución de 50 luminarias LED en las calles principales del sector 1 para mejorar la seguridad nocturna.",
      estado: "EN_EJECUCION",
      prioridad: "ALTA",
      ubicacion_sector: "Sector 1 - Calles 1 a 5",
      fecha_inicio: "2024-01-10",
      fecha_fin_estimada: "2024-05-20",
      presupuesto_total: 5000.0,
    },
    {
      id: 2,
      nombre: "Censo de Viviendas y Familias",
      descripcion:
        "Actualización de los datos socioeconómicos de todas las familias residentes para los programas sociales del estado.",
      estado: "COMPLETADO",
      prioridad: "MEDIA",
      ubicacion_sector: "Toda la comunidad",
      fecha_inicio: "2023-11-01",
      fecha_fin_estimada: "2024-03-12",
      presupuesto_total: 1200.0,
    },
    {
      id: 3,
      nombre: "Impermeabilización del Bloque 3",
      descripcion:
        "Trabajos de mantenimiento y aplicación de manto asfáltico en la azotea del edificio para evitar filtraciones.",
      estado: "PLANIFICADO",
      prioridad: "ALTA",
      ubicacion_sector: "Bloque 3, Sector Central",
      fecha_inicio: "2024-06-01",
      fecha_fin_estimada: "2024-06-15",
      presupuesto_total: 2500.0,
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

  const optionsFilter = [
    "Todos",
    "Planificado",
    "En Ejecución",
    "En Pausa",
    "Completado",
    "Cancelado",
  ];

  const handleEdit = (project) => {
    setEditingProject(project);
    setIsModalOpen(true);
  };

  const handleCreate = () => {
    setEditingProject(null);
    setIsModalOpen(true);
  };

  return (
    <div className="w-full space-y-6 mx-auto p-6">
      <CreateProjectModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingProject(null);
        }}
        initialData={editingProject}
      />

      {/* Header */}
      <HeaderModules
        title={"Gestión de Proyectos"}
        description={`Seguimiento de obras, iniciativas sociales y recursos de la comunidad`}
        onActionBtn={handleCreate}
        titleBtn={"Nuevo Proyecto"}
      />

      {/* Stats Dashboard */}
      <StadisticCard stats={stats} cols={3} />

      {/* Filters and Search */}
      <div className="flex flex-col md:flex-row gap-4 border-y border-base-200 py-4">
        <CustomInput
          label="Búsqueda"
          className={"md:max-w-80"}
          placeholder={"Buscar por nombre"}
          icon={FaSearch}
        />
        <CustomSelect
          label="Filtrar por estado"
          className={"md:max-w-80"}
          options={optionsFilter}
        />
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {MOCK_PROJECTS.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onEdit={() => handleEdit(project)}
          />
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
