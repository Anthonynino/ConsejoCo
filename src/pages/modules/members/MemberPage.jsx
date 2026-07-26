import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import CardMember from "./components/CardMember";
import CreateMemberModal from "./components/CreateMemberModal";
import DeleteModal from "../../../modals/DeleteModal";
import HeaderModules from "../../../components/HeaderModules";
import { FaSearch } from "react-icons/fa";
import CustomInput from "../../../components/CustomInput";
import { getMembers, createMember, updateMember, deleteMember } from "../../../services/members";
import { useAuth } from "../../../context/AuthContext";

const MemberPage = () => {
  const { user } = useAuth();
  const isAdmin = user?.rol === "ADMIN";
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [memberToEdit, setMemberToEdit] = useState(null);
  const [members, setMembers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [memberToDelete, setMemberToDelete] = useState(null);

  const fetchMembers = async () => {
    try {
      setIsLoading(true);
      const res = await getMembers(1);
      if (res.success && res.data) {
        const mappedMembers = res.data.map((m) => ({
          id: m.id,
          rawNombre: m.nombre,
          rawApellido: m.apellido,
          nombre: `${m.nombre} ${m.apellido}`,
          cedula: m.cedula,
          correo: m.usuario?.email || "Sin correo",
          cargo: m.usuario?.rol || "Sin cargo",
          iniciales: `${m.nombre?.[0] || ""}${m.apellido?.[0] || ""}`.toUpperCase(),
          fechaCreacion: new Date(m.fechaCreacion).toLocaleDateString(),
          activo: m.usuario?.activo ?? false
        }));
        setMembers(mappedMembers);
      }
    } catch (error) {
      console.error("Error al obtener los miembros:", error);
      toast.error("Error al cargar los miembros");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const handleOpenCreate = () => {
    setMemberToEdit(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (member) => {
    setMemberToEdit(member);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    const member = members.find((m) => m.id === id);
    setMemberToDelete(member);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!memberToDelete) return;
    try {
      await deleteMember(memberToDelete.id);
      toast.success("Miembro eliminado correctamente");
      setDeleteModalOpen(false);
      setMemberToDelete(null);
      fetchMembers();
    } catch {
      toast.error("Error al eliminar el miembro");
    }
  };

  const handleSave = async (data, id) => {
    try {
      if (id) {
        await updateMember(id, data);
        toast.success("Miembro actualizado correctamente");
      } else {
        await createMember(data);
        toast.success("Miembro registrado correctamente");
      }
      setIsModalOpen(false);
      fetchMembers();
    } catch {
      toast.error("Error al guardar el miembro");
    }
  };

  return (
    <div className="w-full space-y-6 mx-auto p-6">
      <CreateMemberModal
        key={memberToEdit ? memberToEdit.id : "new"}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        memberToEdit={memberToEdit}
        onSave={handleSave}
      />

      {/* Header */}
      <HeaderModules
        title={"Miembros"}
        description={`${members.length} miembros registrados`}
        onActionBtn={isAdmin ? handleOpenCreate : undefined}
        titleBtn={isAdmin ? "Nuevo miembro" : undefined}
      />
      <div className="flex flex-col md:flex-row gap-4 border-y border-base-200 py-4">
        <CustomInput
          className={"md:w-80"}
          placeholder={"Buscar miembro..."}
          icon={FaSearch}
        />
      </div>

      {/* Grid de tarjetas */}
      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      ) : (
        <div className="mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {members.map((miembro, idx) => (
            <CardMember 
              key={miembro.id} 
              idx={idx} 
              miembro={miembro} 
              onEdit={isAdmin ? () => handleOpenEdit(miembro) : undefined}
              onDelete={isAdmin ? () => handleDelete(miembro.id) : undefined}
            />
          ))}
        </div>
      )}

      <DeleteModal
        isOpen={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false);
          setMemberToDelete(null);
        }}
        title="Eliminar Miembro"
        message={`¿Estás seguro de que deseas eliminar al miembro "${memberToDelete?.nombre || ""}"? Esta acción no se puede deshacer.`}
        onConfirm={handleConfirmDelete}
        actionText="Eliminar"
      />
    </div>
  );
};

export default MemberPage;
