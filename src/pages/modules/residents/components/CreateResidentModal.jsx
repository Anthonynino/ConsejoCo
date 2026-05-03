import CustomModal from "../../../../components/CustomModal";
import CustomInput from "../../../../components/CustomInput";
import CustomSelect from "../../../../components/CustomSelect";
import CustomTextArea from "../../../../components/CustomTextArea";

const CreateResidentModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <CustomModal
      isOpen={isOpen}
      onClose={onClose}
      widthClass={"max-w-2xl"}
      title={"Nuevo Habitante"}
      subtitle={"Registro Integral Comunidad"}
      actionText={"Crear Habitante"}
    >
      <div className="grid grid-col-1 md:grid-cols-2 gap-5">
        <CustomInput
          label="Nombre Completo"
          type="text"
          placeholder="Ej: Marcos Antonio Pérez"
          className="md:col-span-2"
        />

        <CustomInput
          label="Cédula / Identidad"
          type="text"
          placeholder="Ej: V-22.123.456"
        />

        <CustomInput
          label="Fecha de Nacimiento"
          type="date"
        />

        <CustomInput
          label="Teléfono de Contacto"
          type="tel"
          placeholder="0414-000-0000"
        />

        <CustomInput
          label="Profesión / Oficio"
          type="text"
          placeholder="Ej: Albañil, Estudiante..."
        />

        <CustomSelect
          label="Sexo"
          options={["Femenino", "Masculino", "Otro"]}
        />

        <CustomSelect
          label="Sector de Residencia"
          options={["Sector 1", "Sector 2", "Sector 3"]}
        />

        <CustomTextArea
          label="Notas Médicas / Discapacidades"
          placeholder="Indicar si posee alguna condición de salud especial..."
          className="md:col-span-2"
        />
      </div>
    </CustomModal>
  );
};

export default CreateResidentModal;
