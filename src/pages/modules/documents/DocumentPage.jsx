import { useState, useEffect } from "react";
import {
  FaSearch,
  FaFolderOpen
} from "react-icons/fa";
import DocumentGrid from "./components/DocumentGrid";
import UploadDocumentModal from "./modal/UploadDocumentModal";
import DeleteModal from "../../../modals/DeleteModal";
import HeaderModules from "../../../components/HeaderModules";
import CustomInput from "../../../components/CustomInput";
import CustomSelect from "../../../components/CustomSelect";
import { getDocuments, deleteDocument } from "../../../services/documents";
import { toast } from "react-toastify";
import { useAuth } from "../../../context/AuthContext";

const DocumentPage = () => {
  const { user } = useAuth();
  const isAdmin = user?.rol === "ADMIN";
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDocument, setEditingDocument] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterCategoria, setFilterCategoria] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [documentToDelete, setDocumentToDelete] = useState(null);

  const optionsFilter = [
    { value: "", label: "Todos" },
    { value: "LEGAL", label: "Legal" },
    { value: "PROYECTOS", label: "Proyectos" },
    { value: "IDENTIDAD", label: "Identidad" },
    { value: "FINANZAS", label: "Finanzas" },
    { value: "HABITANTES", label: "Habitantes" },
    { value: "CARTOGRAFIA", label: "Cartografía" },
    { value: "EVENTOS", label: "Eventos" },
    { value: "OTROS", label: "Otros" },
  ];

  // Fetch documents on component mount
  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        setLoading(true);
        const data = await getDocuments({
          categoria: filterCategoria || undefined,
          page: 1,
          limit: 20,
        });
        setDocuments(data.data || []);
      } catch (err) {
        setError("Error al cargar los documentos");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDocuments();
  }, [filterCategoria]);

  // Filter documents based on search term
  const filteredDocuments = documents.filter((doc) =>
    doc.nombre?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (document) => {
    setEditingDocument(document);
    setIsModalOpen(true);
  };

  const handleCreate = () => {
    setEditingDocument(null);
    setIsModalOpen(true);
  };

  const handleModalSuccess = () => {
    // Refresh the document list after successful create/update
    const fetchDocuments = async () => {
      try {
        setLoading(true);
        const data = await getDocuments({
          categoria: filterCategoria || undefined,
          page: 1,
          limit: 20,
        });
        setDocuments(data.data || []);
      } catch (err) {
        setError("Error al cargar los documentos");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDocuments();
  };

  const handleDelete = (document) => {
    setDocumentToDelete(document);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!documentToDelete) return;

    try {
      await deleteDocument(documentToDelete.id);
      toast.success("Documento eliminado exitosamente");
      setDeleteModalOpen(false);
      setDocumentToDelete(null);
      // Refresh the document list after successful delete
      const fetchDocuments = async () => {
        try {
          setLoading(true);
          const data = await getDocuments({
            categoria: filterCategoria || undefined,
            page: 1,
            limit: 20,
          });
          setDocuments(data.data || []);
        } catch (err) {
          setError("Error al cargar los documentos");
          console.error(err);
        } finally {
          setLoading(false);
        }
      };

      fetchDocuments();
    } catch (error) {
      console.error("Error al eliminar documento:", error);
      toast.error(error.response?.data?.message || "Error al eliminar el documento");
    }
  };

  return (
    <div className="w-full space-y-8 p-6 mx-auto animate-in fade-in duration-700">
      <UploadDocumentModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingDocument(null);
        }}
        initialData={editingDocument}
        onSuccess={handleModalSuccess}
      />

      {/* Header */}
      <HeaderModules
        title={"Documentos"}
        description={`Gestión y almacenamiento de la documentación oficial del consejo
            comunal`}
        onActionBtn={isAdmin ? handleCreate : undefined}
        titleBtn={isAdmin ? "Subir Documento" : undefined}
      />

      {/* Navigation & Controls */}
      <div className="flex flex-col md:flex-row gap-4 border-y border-base-200 py-4">
        <CustomInput
          className={"md:max-w-80"}
          placeholder={"Buscar archivos..."}
          icon={FaSearch}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <CustomSelect
          className={"md:max-w-80"}
          options={optionsFilter.map((opt) => opt.label)}
          value={optionsFilter.find((opt) => opt.value === filterCategoria)?.label || ""}
          onChange={(e) => {
            const selected = optionsFilter.find((opt) => opt.label === e.target.value);
            setFilterCategoria(selected?.value || "");
          }}
        />
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-20 opacity-60 space-y-4">
          <span className="loading loading-spinner loading-lg text-primary"></span>
          <p className="text-lg font-bold">Cargando documentos...</p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="alert alert-error">
          <span>{error}</span>
        </div>
      )}

      {/* Documents Grid Section */}
      {!loading && !error && (
        <div className="space-y-4">
          <DocumentGrid documents={filteredDocuments} onEdit={isAdmin ? handleEdit : undefined} onDelete={isAdmin ? handleDelete : undefined} />
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && filteredDocuments.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 opacity-40 grayscale space-y-4">
          <FaFolderOpen size={64} />
          <p className="text-lg font-bold">No hay documentos registrados aún.</p>
        </div>
      )}

      <DeleteModal
        isOpen={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false);
          setDocumentToDelete(null);
        }}
        title="Eliminar Documento"
        message={`¿Estás seguro de que deseas eliminar el documento "${documentToDelete?.nombre || ""}"? Esta acción no se puede deshacer.`}
        onConfirm={handleConfirmDelete}
        actionText="Eliminar"
      />
    </div>
  );
};

export default DocumentPage;
