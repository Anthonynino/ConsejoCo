import { useState } from "react";
import { FaPlus, FaFilter, FaSearch, FaProjectDiagram } from "react-icons/fa";
import ProjectStats from "./components/ProjectStats";
import ProjectCard from "./components/ProjectCard";
import CreateProjectModal from "./components/CreateProjectModal";

const MOCK_PROJECTS = [
  {
    id: 1,
    title: "Reparación de Alumbrado Público",
    description: "Sustitución de 50 luminarias LED en las calles principales del sector 1 para mejorar la seguridad nocturna.",
    status: "En Ejecución",
    progress: 65,
    beneficiaries: 450,
    deadline: "20 May 2024",
    location: "Sector 1 - Calles 1 a 5",
    priority: "Alta"
  },
  {
    id: 2,
    title: "Censo de Viviendas y Familias",
    description: "Actualización de los datos socioeconómicos de todas las familias residentes para los programas sociales del estado.",
    status: "Completado",
    progress: 100,
    beneficiaries: 1200,
    deadline: "12 Mar 2024",
    location: "Toda la comunidad",
    priority: "Media"
  },
  {
    id: 3,
    title: "Impermeabilización del Bloque 3",
    description: "Trabajos de mantenimiento y aplicación de manto asfáltico en la azotea del edificio para evitar filtraciones.",
    status: "Planificado",
    progress: 10,
    beneficiaries: 80,
    deadline: "15 Jun 2024",
    location: "Bloque 3, Sector Central",
    priority: "Alta"
  },
  {
    id: 4,
    title: "Jornada de Vacunación Infantil",
    description: "Operativo especial de salud dirigido a niños entre 0 y 12 años en conjunto con el ambulatorio local.",
    status: "En Ejecución",
    progress: 40,
    beneficiaries: 200,
    deadline: "30 Apr 2024",
    location: "Casa Comunal",
    priority: "Crítica"
  }
];

const ProjectPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="w-full space-y-6 mx-auto p-6">
      <CreateProjectModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-base-content">Gestión de Proyectos</h2>
          <p className="text-sm text-base-content/60 mt-0.5">
            Seguimiento de obras, iniciativas sociales y recursos de la comunidad
          </p>
        </div>
        
        <button 
          onClick={() => setIsModalOpen(true)}
          className="btn btn-neutral btn-sm md:btn-md"
        >
          <FaPlus /> <span className="hidden sm:inline">Nuevo Proyecto</span>
        </button>
      </div>

      {/* Stats Dashboard */}
      <ProjectStats />

      {/* Filters and Search */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between border-y border-base-200 py-4">
        <div className="flex gap-2 w-full md:w-auto">
          
         <div className="relative w-full md:w-80">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 opacity-30 h-3.5 w-3.5" />
            <input 
              type="text" 
              placeholder="Buscar por nombre o sector..." 
              className="input input-bordered input-sm w-full pl-9 focus:input-primary transition-all bg-base-200/20"
            />
          </div>
          <button className="btn btn-square btn-bordered btn-sm opacity-60 hover:opacity-100"><FaFilter /></button>
        </div>
        
        <div className="flex gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
          <button className="btn btn-xs rounded-full btn-outline btn-neutral whitespace-nowrap">Todos</button>
          <button className="btn btn-xs rounded-full btn-ghost whitespace-nowrap">Activos</button>
          <button className="btn btn-xs rounded-full btn-ghost whitespace-nowrap">Finalizados</button>
          <button className="btn btn-xs rounded-full btn-ghost whitespace-nowrap">En Pausa</button>
        </div>
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
