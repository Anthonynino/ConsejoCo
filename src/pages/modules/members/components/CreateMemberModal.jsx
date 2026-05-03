import { FiUpload } from "react-icons/fi";
import CustomModal from "../../../../components/CustomModal";
import CustomInput from "../../../../components/CustomInput";

const CreateMemberModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <CustomModal
      isOpen={isOpen}
      onClose={onClose}
      widthClass={"max-w-lg"}
      title={"Nuevo miembro"}
      subtitle={"Registro de nuevo miembro del consejo"}
      actionText={"Guardar Miembro"}
    >
      <div className="space-y-5">
        <CustomInput
          label="Nombre completo"
          type="text"
          placeholder="Ej: Laura Martínez"
        />

        <CustomInput
          label="Cédula / ID"
          type="text"
          placeholder="Ej: V-12.345.678"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <CustomInput
            label="Teléfono"
            type="tel"
            placeholder="0414-123-4567"
          />
          <CustomInput
            label="Correo"
            type="email"
            placeholder="correo@ejemplo.com"
          />
        </div>

        <CustomInput
          label="Cargo / Puesto"
          type="text"
          placeholder="Ej: Coordinador"
        />

        <div className="form-control w-full mt-2">
          <label className="label py-1">
            <span className="label-text font-bold text-[10px] uppercase opacity-60 tracking-wider">
              Foto de perfil
            </span>
          </label>
          <div className="group border-2 border-dashed border-base-300 rounded-xl p-8 flex flex-col items-center justify-center gap-3 hover:border-primary/50 hover:bg-primary/5 transition-all cursor-pointer">
            <FiUpload size={24} className="text-base-content/30 group-hover:text-primary transition-colors" />
            <div className="text-center">
              <p className="text-xs font-bold text-base-content/70">Haz click para subir</p>
              <p className="text-[10px] opacity-50 mt-1">PNG, JPG hasta 2MB</p>
            </div>
            <input type="file" accept="image/*" className="hidden" />
          </div>
        </div>
      </div>
    </CustomModal>
  );
};


export default CreateMemberModal;
