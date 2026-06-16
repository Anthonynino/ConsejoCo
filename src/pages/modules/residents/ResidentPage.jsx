import { useState, useEffect, useCallback } from "react";
import ResidentTable from "./components/ResidentTable";
import CreateResidentModal from "./components/CreateResidentModal";
import HeaderModules from "../../../components/HeaderModules";
import StadisticCard from "../../../components/StadisticCard";
import { FaBlind, FaChild, FaUsers, FaVenusMars } from "react-icons/fa";
import {
  getResidents,
  deleteResident,
  createResident,
  updateResident,
} from "../../../services/residents";
import { toast } from "react-toastify";

const ResidentPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [residents, setResidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingResident, setEditingResident] = useState(null);
  const [page, setPage] = useState(1);
  const [meta, setMeta] = useState({ total: 0, totalPages: 0 });

  const fetchResidents = useCallback(async () => {
    try {
      setLoading(true);
      const params = {
        page,
        limit: 9,
      };

      const response = await getResidents(params);
      setResidents(response.data || []);
      setMeta(
        response.meta || { total: response.data?.length || 0, totalPages: 1 },
      );
    } catch (error) {
      console.error("Error fetching residents:", error);
      toast.error("Error al cargar los habitantes");
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    fetchResidents();
  }, [fetchResidents]);

  const handleDelete = async (id) => {
    if (!confirm("¿Estás seguro de eliminar este habitante?")) return;
    try {
      await deleteResident(id);
      toast.success("Habitante eliminado con éxito");
      fetchResidents();
    } catch (error) {
      console.error("Error deleting resident:", error);
      toast.error("Error al eliminar el habitante");
    }
  };

  const handleEdit = (resident) => {
    setEditingResident(resident);
    setIsModalOpen(true);
  };

  const handleSave = async (residentData) => {
    try {
      if (editingResident) {
        await updateResident(editingResident.id, residentData);
        toast.success("Habitante actualizado con éxito");
      } else {
        await createResident({ ...residentData, consejoComunalId: 1 });
        toast.success("Habitante creado con éxito");
      }
      setIsModalOpen(false);
      setEditingResident(null);
      fetchResidents();
    } catch (error) {
      console.error("Error saving resident:", error);
      toast.error("Error al guardar los datos del habitante");
    }
  };

  const calculateStats = () => {
    const total = meta.total || residents.length;
    let kids = 0;
    let seniors = 0;
    let females = 0;

    residents.forEach((r) => {
      if (r.genero === "F") females++;
      if (r.fechaNacimiento) {
        const age = Math.abs(
          new Date(
            Date.now() - new Date(r.fechaNacimiento).getTime(),
          ).getUTCFullYear() - 1970,
        );
        if (age < 18) kids++;
        if (age >= 60) seniors++;
      }
    });

    const femalePercent =
      total > 0 ? Math.round((females / residents.length) * 100) : 0;
    const malePercent = total > 0 ? 100 - femalePercent : 0;

    return [
      {
        label: "Total Habitantes",
        value: total.toString(),
        icon: FaUsers,
        color: "text-primary",
        bg: "bg-primary/10",
      },
      {
        label: "Menores de Edad",
        value: kids.toString(),
        icon: FaChild,
        color: "text-info",
        bg: "bg-info/10",
      },
      {
        label: "Adultos Mayores",
        value: seniors.toString(),
        icon: FaBlind,
        color: "text-warning",
        bg: "bg-warning/10",
      },
      {
        label: "Género",
        value: `${femalePercent}% F / ${malePercent}% M`,
        icon: FaVenusMars,
        color: "text-secondary",
        bg: "bg-secondary/10",
      },
    ];
  };

  const stats = calculateStats();

  return (
    <div className="w-full space-y-8 p-6 mx-auto animate-in fade-in duration-700">
      <CreateResidentModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingResident(null);
        }}
        onSave={handleSave}
        initialData={editingResident}
      />

      <HeaderModules
        title={"Gestión de Habitantes"}
        description={
          "Visualización y administración de los habitantes registrados en la comunidad"
        }
        onActionBtn={() => {
          setEditingResident(null);
          setIsModalOpen(true);
        }}
        titleBtn={"Nuevo Habitante"}
      />

      <StadisticCard stats={stats} />

      <div className="space-y-4">
        {loading ? (
          <div className="flex justify-center p-10">
            <span className="loading loading-spinner loading-lg text-primary"></span>
          </div>
        ) : (
          <>
            <ResidentTable
              residents={residents}
              onDelete={handleDelete}
              onEdit={handleEdit}
              totalResidents={meta.total}
              meta={meta}
              page={page}
              setPage={setPage}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default ResidentPage;
