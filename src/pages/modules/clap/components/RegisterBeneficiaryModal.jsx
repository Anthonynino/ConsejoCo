import { FiSearch } from "react-icons/fi";
import CustomInput from "../../../../components/CustomInput";
import CustomModal from "../../../../components/CustomModal";

const RegisterBeneficiaryModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <CustomModal
      isOpen={isOpen}
      onClose={onClose}
      widthClass={"max-w-lg"}
      title={"Vincular Jefe de Familia"}
      subtitle={"Selecciona un habitante registrado"}
      actionText={"Registrar Beneficiario"}
    >
      <div className="space-y-5">
        <CustomInput
          label="Buscar Habitante"
          className={""}
          placeholder={"Nombre o Cédula..."}
          icon={FiSearch}
        />
        <div className="mt-2 text-[10px] opacity-50 px-1 italic">
          * Solo aparecerán habitantes que NO estén vinculados a otro grupo
          familiar.
        </div>

        <div className="bg-base-200/30 rounded-lg p-3 max-h-40 overflow-y-auto border border-base-200 space-y-2">
          <div className="flex items-center justify-between p-2 hover:bg-base-100 rounded-md cursor-pointer transition-colors border border-transparent hover:border-base-300">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-violet-100 text-violet-700 flex items-center justify-center text-xs font-bold">
                AF
              </div>
              <div>
                <p className="text-sm font-bold">Ana Figueroa</p>
                <p className="text-[10px] opacity-50 italic">V-22.456.789</p>
              </div>
            </div>
            <button className="btn btn-xs btn-outline btn-primary">
              Seleccionar
            </button>
          </div>
          <div className="flex items-center justify-between p-2 hover:bg-base-100 rounded-md cursor-pointer transition-colors border border-transparent hover:border-base-300">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-cyan-100 text-cyan-700 flex items-center justify-center text-xs font-bold">
                JT
              </div>
              <div>
                <p className="text-sm font-bold">Jorge Tovar</p>
                <p className="text-[10px] opacity-50 italic">V-17.852.963</p>
              </div>
            </div>
            <button className="btn btn-xs btn-outline btn-primary">
              Seleccionar
            </button>
          </div>
        </div>
      </div>
    </CustomModal>
  );
};

export default RegisterBeneficiaryModal;
