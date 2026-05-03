import CustomModal from "../../../../components/CustomModal";
import CustomTextArea from "../../../../components/CustomTextArea";
import CustomSelect from "../../../../components/CustomSelect";
import CustomInput from "../../../../components/CustomInput";

const CreateProjectModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <CustomModal
      isOpen={isOpen}
      onClose={onClose}
      widthClass={"max-w-2xl"}
      title={"Nuevo Proyecto Comunitario"}
      subtitle={"Registro de iniciativa sectoral"}
      actionText={"Crear Proyecto"}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <CustomInput
          label="Título del Proyecto"
          type="text"
          placeholder="Ej: Recuperación de Cancha de Usos Múltiples"
          className="md:col-span-2"
        />

        <CustomTextArea
          label="Descripción"
          placeholder={"Explica el objetivo y alcance del proyecto..."}
          className={"md:col-span-2"}
        />

        <CustomInput
          label="Presupuesto Estimado ($)"
          type="number"
          placeholder="0.00"
        />

        <CustomSelect
          label="Prioridad"
          options={["Baja", "Media", "Alta", "Crítica"]}
        />

        <CustomInput
          label="Ubicación / Sector"
          type="text"
          placeholder="Ej: Sector Las Flores, Calle 3"
        />

        <CustomInput label="Fecha Est. Finalización" type="date" />
      </div>
    </CustomModal>
  );
};

export default CreateProjectModal;
