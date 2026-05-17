import { useState } from "react";
import {
  FaSearch,
  FaFolderOpen,
  FaFilePdf,
  FaFileImage,
} from "react-icons/fa";
import DocumentGrid from "./components/DocumentGrid";
import UploadDocumentModal from "./components/UploadDocumentModal";
import HeaderModules from "../../../components/HeaderModules";
import StadisticCard from "../../../components/StadisticCard";
import CustomInput from "../../../components/CustomInput";
import CustomSelect from "../../../components/CustomSelect";

const DocumentPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const optionsFilter = [
    "Todos",
    "Legal",
    "Proyectos",
    "Identidad",
    "Finanzas",
    "Otros",
  ];

  const stats = [
    {
      label: "Total Documentos",
      value: "156",
      icon: FaFolderOpen,
      color: "text-primary",
      bg: "bg-primary/10",
    },
    {
      label: "Archivos PDF",
      value: "84",
      icon: FaFilePdf,
      color: "text-error",
      bg: "bg-error/10",
    },
    {
      label: "Imágenes/Soportes",
      value: "42",
      icon: FaFileImage,
      color: "text-info",
      bg: "bg-info/10",
    }
  ];

  return (
    <div className="w-full space-y-8 p-6 mx-auto animate-in fade-in duration-700">
      <UploadDocumentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      {/* Header */}
      <HeaderModules
        title={"Documentos"}
        description={`Gestión y almacenamiento de la documentación oficial del consejo
            comunal`}
        onActionBtn={() => setIsModalOpen(true)}
        titleBtn={"Subir Documento"}
      />

      {/* Stats Dashboard */}
      <StadisticCard stats={stats} cols={3} />

      {/* Navigation & Controls */}
      <div className="flex flex-col md:flex-row gap-4 border-y border-base-200 py-4">
        <CustomInput
          className={"md:max-w-80"}
          placeholder={"Buscar archivos..."}
          icon={FaSearch}
        />

        <CustomSelect className={"md:max-w-80"} options={optionsFilter} />
      </div>

      {/* Documents Grid Section */}
      <div className="space-y-4">
        <DocumentGrid />
      </div>
    </div>
  );
};

export default DocumentPage;
