import { FiUploadCloud } from "react-icons/fi";
import CustomModal from "../../../../components/CustomModal";
import CustomInput from "../../../../components/CustomInput";
import CustomSelect from "../../../../components/CustomSelect";

const UploadDocumentModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <CustomModal
      isOpen={isOpen}
      onClose={onClose}
      widthClass={"max-w-lg"}
      title={"Subir Documento"}
      subtitle={"Archivo Digital Comunitario"}
      actionText={"Cargar Archivo"}
    >
      <div className="space-y-6">
        {/* Dropzone */}
        <div className="border-2 border-dashed border-base-300 rounded-2xl p-10 flex flex-col items-center justify-center gap-3 hover:border-primary/50 hover:bg-primary/5 transition-all cursor-pointer group">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
            <FiUploadCloud className="text-primary text-3xl" />
          </div>
          <div className="text-center">
            <p className="font-bold text-sm">Haz click o arrastra un archivo</p>
            <p className="text-[10px] opacity-40 mt-1">Soporta PDF, JPG, PNG, DOCX hasta 15MB</p>
          </div>
        </div>

        {/* Form Fields */}
        <div className="space-y-4">
          <CustomInput
            label="Nombre del Documento"
            type="text"
            placeholder="Ej: Acta de Asamblea 01-2024"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <CustomSelect
              label="Categoría"
              options={["Legal", "Proyectos", "Identidad", "Finanzas", "Otros"]}
            />
            <CustomInput
              label="Fecha de Emisión"
              type="date"
            />
          </div>
        </div>
      </div>
    </CustomModal>
  );
};

export default UploadDocumentModal;
