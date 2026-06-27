import { useState, useEffect, useCallback } from "react";
import ResidentTable from "./components/ResidentTable";
import CreateResidentModal from "./modals/CreateResidentModal";
import CreateFamilyMemberModal from "./modals/CreateFamilyMemberModal";
import FamiliarGroupDetails from "./modals/FamiliarGroupDetails";
import CustomModal from "../../../components/CustomModal";
import HeaderModules from "../../../components/HeaderModules";
import DeleteModal from "../../../modals/DeleteModal";
import {
  getResidents,
  deleteResident,
  createResident,
  updateResident,
  getFamilyMembers,
  createFamilyMember,
  updateFamilyMember,
  deleteFamilyMember,
} from "../../../services/residents";
import { toast } from "react-toastify";

const ResidentPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [residents, setResidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingResident, setEditingResident] = useState(null);
  const [page, setPage] = useState(1);
  const [meta, setMeta] = useState({ total: 0, totalPages: 0 });
  const [isFamilyModalOpen, setIsFamilyModalOpen] = useState(false);
  const [familyMembers, setFamilyMembers] = useState([]);
  const [selectedFamilyHead, setSelectedFamilyHead] = useState(null);
  const [loadingFamily, setLoadingFamily] = useState(false);
  const [isCreateFamilyMemberOpen, setIsCreateFamilyMemberOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [residentToDelete, setResidentToDelete] = useState(null);
  const [editingFamilyMember, setEditingFamilyMember] = useState(null);
  const [isDeleteFamilyMemberModalOpen, setIsDeleteFamilyMemberModalOpen] = useState(false);
  const [familyMemberToDelete, setFamilyMemberToDelete] = useState(null);

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

  const handleDelete = (id) => {
    setResidentToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!residentToDelete) return;
    try {
      await deleteResident(residentToDelete);
      toast.success("Habitante eliminado con éxito");
      fetchResidents();
      setIsDeleteModalOpen(false);
      setResidentToDelete(null);
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
        await updateResident(editingResident.familia_id, residentData);
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

  const handleViewFamily = async (resident) => {
    try {
      setLoadingFamily(true);
      setSelectedFamilyHead(resident);
      const response = await getFamilyMembers(resident.familia_id);
      setFamilyMembers(response.data || []);
      setIsFamilyModalOpen(true);
    } catch (error) {
      console.error("Error fetching family members:", error);
      toast.error("Error al cargar los familiares");
    } finally {
      setLoadingFamily(false);
    }
  };

  const handleCreateFamilyMember = async (memberData, memberId = null) => {
    try {
      if (memberId) {
        await updateFamilyMember(selectedFamilyHead.familia_id, memberId, memberData);
        toast.success("Familiar actualizado con éxito");
      } else {
        await createFamilyMember(selectedFamilyHead.familia_id, memberData);
        toast.success("Familiar agregado con éxito");
      }
      setIsCreateFamilyMemberOpen(false);
      setEditingFamilyMember(null);
      const response = await getFamilyMembers(selectedFamilyHead.familia_id);
      setFamilyMembers(response.data || []);
    } catch (error) {
      console.error("Error saving family member:", error);
      toast.error("Error al guardar el familiar");
    }
  };

  const handleEditFamilyMember = (member) => {
    setEditingFamilyMember(member);
    setIsCreateFamilyMemberOpen(true);
  };

  const handleDeleteFamilyMember = (member) => {
    setFamilyMemberToDelete(member);
    setIsDeleteFamilyMemberModalOpen(true);
  };

  const handleConfirmDeleteFamilyMember = async () => {
    if (!familyMemberToDelete) return;
    try {
      await deleteFamilyMember(selectedFamilyHead.familia_id, familyMemberToDelete.id);
      toast.success("Familiar eliminado con éxito");
      setIsDeleteFamilyMemberModalOpen(false);
      setFamilyMemberToDelete(null);
      const response = await getFamilyMembers(selectedFamilyHead.familia_id);
      setFamilyMembers(response.data || []);
    } catch (error) {
      console.error("Error deleting family member:", error);
      toast.error("Error al eliminar el familiar");
    }
  };

  return (
    <div className="w-full space-y-8 p-6 mx-auto animate-in fade-in duration-700">
      <CustomModal
        isOpen={isFamilyModalOpen}
        onClose={() => {
          setIsFamilyModalOpen(false);
          setFamilyMembers([]);
          setSelectedFamilyHead(null);
        }}
        title="Grupo Familiar"
        subtitle={`Familiares de ${selectedFamilyHead?.nombres || ''} ${selectedFamilyHead?.apellidos || ''}`}
        widthClass="max-w-3xl"
        onAction={() => {
          setIsFamilyModalOpen(false);
          setFamilyMembers([]);
          setSelectedFamilyHead(null);
        }}
        actionText="Cerrar"
      >
        {loadingFamily ? (
          <div className="flex justify-center p-10">
            <span className="loading loading-spinner loading-lg text-primary"></span>
          </div>
        ) : (
          <FamiliarGroupDetails
            familyMembers={familyMembers}
            onAddMember={() => {
              setEditingFamilyMember(null);
              setIsCreateFamilyMemberOpen(true);
            }}
            onEditMember={handleEditFamilyMember}
            onDeleteMember={handleDeleteFamilyMember}
          />
        )}
      </CustomModal>

      <CreateFamilyMemberModal
        isOpen={isCreateFamilyMemberOpen}
        onClose={() => {
          setIsCreateFamilyMemberOpen(false);
          setEditingFamilyMember(null);
        }}
        onSave={handleCreateFamilyMember}
        familyId={selectedFamilyHead?.familia_id}
        initialData={editingFamilyMember}
      />

      <DeleteModal
        isOpen={isDeleteFamilyMemberModalOpen}
        onClose={() => {
          setIsDeleteFamilyMemberModalOpen(false);
          setFamilyMemberToDelete(null);
        }}
        title="Eliminar Familiar"
        message="¿Estás seguro de que deseas eliminar este familiar? Esta acción no se puede deshacer."
        onConfirm={handleConfirmDeleteFamilyMember}
        actionText="Eliminar"
      />
      
      <CreateResidentModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingResident(null);
        }}
        onSave={handleSave}
        initialData={editingResident}
      />

      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setResidentToDelete(null);
        }}
        title="Eliminar Habitante"
        message="¿Estás seguro de que deseas eliminar este habitante? Esta acción no se puede deshacer."
        onConfirm={handleConfirmDelete}
        actionText="Eliminar"
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
              onViewFamily={handleViewFamily}
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
