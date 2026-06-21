import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import {
  FaSearch,
  FaProjectDiagram,
  FaHammer,
  FaCheckCircle,
} from "react-icons/fa";
import ProjectCard from "./components/ProjectCard";
import CreateProjectModal from "./modals/CreateProjectModal";
import DeleteModal from "../../../modals/DeleteModal";
import HeaderModules from "../../../components/HeaderModules";
import StadisticCard from "../../../components/StadisticCard";
import CustomInput from "../../../components/CustomInput";
import CustomSelect from "../../../components/CustomSelect";
import { getProjects, deleteProject } from "../../../services/projects";

const ProjectPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterEstado, setFilterEstado] = useState("");
  const [filterPrioridad, setFilterPrioridad] = useState("");
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState(null);

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

  const optionsEstado = [
    { value: "", label: "Todos" },
    { value: "PLANIFICADO", label: "Planificado" },
    { value: "EN_EJECUCION", label: "En Ejecución" },
    { value: "EN_PAUSA", label: "En Pausa" },
    { value: "COMPLETADO", label: "Completado" },
    { value: "CANCELADO", label: "Cancelado" },
  ];

  const optionsPrioridad = [
    { value: "", label: "Todas" },
    { value: "ALTA", label: "Alta" },
    { value: "MEDIA", label: "Media" },
    { value: "BAJA", label: "Baja" },
  ];

  // Fetch projects on component mount
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const data = await getProjects({
          estado: filterEstado || undefined,
          prioridad: filterPrioridad || undefined,
          page: 1,
          limit: 50,
        });
        setProjects(data.data);
      } catch (err) {
        setError("Error al cargar los proyectos");
        toast.error("Error al cargar los proyectos");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [filterEstado, filterPrioridad]);

  // Filter projects based on search term
  const filteredProjects = projects.filter((project) =>
    project.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (project) => {
    setEditingProject(project);
    setIsModalOpen(true);
  };

  const handleCreate = () => {
    setEditingProject(null);
    setIsModalOpen(true);
  };

  const handleModalSuccess = () => {
    // Refresh the project list after successful create/update
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const data = await getProjects({
          estado: filterEstado || undefined,
          prioridad: filterPrioridad || undefined,
          page: 1,
          limit: 50,
        });
        setProjects(data.data);
        toast.success("Lista de proyectos actualizada");
      } catch (err) {
        setError("Error al cargar los proyectos");
        toast.error("Error al actualizar la lista de proyectos");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  };

  const handleDelete = (project) => {
    setProjectToDelete(project);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!projectToDelete) return;

    try {
      await deleteProject(projectToDelete.id);
      toast.success(`Proyecto "${projectToDelete.nombre}" eliminado exitosamente`);
      setDeleteModalOpen(false);
      setProjectToDelete(null);
      // Refresh the project list after successful delete
      const fetchProjects = async () => {
        try {
          setLoading(true);
          const data = await getProjects({
            estado: filterEstado || undefined,
            prioridad: filterPrioridad || undefined,
            page: 1,
            limit: 50,
          });
          setProjects(data.data);
        } catch (err) {
          setError("Error al cargar los proyectos");
          toast.error("Error al actualizar la lista de proyectos");
          console.error(err);
        } finally {
          setLoading(false);
        }
      };

      fetchProjects();
    } catch (error) {
      console.error("Error al eliminar proyecto:", error);
      toast.error("Error al eliminar el proyecto");
    }
  };

  return (
    <div className="w-full space-y-6 mx-auto p-6">
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
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <CustomSelect
          label="Filtrar por estado"
          className={"md:max-w-80"}
          options={optionsEstado.map((opt) => opt.label)}
          value={optionsEstado.find((opt) => opt.value === filterEstado)?.label || ""}
          onChange={(e) => {
            const selected = optionsEstado.find((opt) => opt.label === e.target.value);
            setFilterEstado(selected?.value || "");
          }}
        />
        <CustomSelect
          label="Filtrar por prioridad"
          className={"md:max-w-80"}
          options={optionsPrioridad.map((opt) => opt.label)}
          value={optionsPrioridad.find((opt) => opt.value === filterPrioridad)?.label || ""}
          onChange={(e) => {
            const selected = optionsPrioridad.find((opt) => opt.label === e.target.value);
            setFilterPrioridad(selected?.value || "");
          }}
        />
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-20 opacity-60 space-y-4">
          <span className="loading loading-spinner loading-lg text-primary"></span>
          <p className="text-lg font-bold">Cargando proyectos...</p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="alert alert-error">
          <span>{error}</span>
        </div>
      )}

      {/* Projects Grid */}
      {!loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onEdit={() => handleEdit(project)}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {/* Empty State (if no projects) */}
      {!loading && !error && filteredProjects.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 opacity-40 grayscale space-y-4">
          <FaProjectDiagram size={64} />
          <p className="text-lg font-bold">No hay proyectos registrados aún.</p>
        </div>
      )}
      <CreateProjectModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingProject(null);
        }}
        initialData={editingProject}
        onSuccess={handleModalSuccess}
      />
      <DeleteModal
        isOpen={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false);
          setProjectToDelete(null);
        }}
        title="Eliminar Proyecto"
        message={`¿Estás seguro de que deseas eliminar el proyecto "${projectToDelete?.nombre || ""}"? Esta acción no se puede deshacer.`}
        onConfirm={handleConfirmDelete}
        actionText="Eliminar"
      />
    </div>
  );
};

export default ProjectPage;
