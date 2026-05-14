import { useState, useEffect } from "react";
import CustomModal from "../../../../components/CustomModal";
import CustomInput from "../../../../components/CustomInput";
import CustomSelect from "../../../../components/CustomSelect";

const CreateResidentModal = ({ isOpen, onClose, onSave, initialData }) => {
  const [formData, setFormData] = useState({
    cedula: "",
    nombres: "",
    apellidos: "",
    fechaNacimiento: "",
    genero: "M",
    telefono: "",
    familiaId: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        cedula: initialData.cedula || "",
        nombres: initialData.nombres || "",
        apellidos: initialData.apellidos || "",
        fechaNacimiento: initialData.fechaNacimiento
          ? initialData.fechaNacimiento.split("T")[0]
          : "",
        genero: initialData.genero || "M",
        telefono: initialData.telefono || "",
      });
    } else {
      setFormData({
        cedula: "",
        nombres: "",
        apellidos: "",
        fechaNacimiento: "",
        genero: "M",
        telefono: "",
      });
    }
  }, [initialData, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  if (!isOpen) return null;

  return (
    <CustomModal
      isOpen={isOpen}
      onClose={onClose}
      widthClass={"max-w-2xl"}
      title={initialData ? "Editar Habitante" : "Nuevo Habitante"}
      subtitle={"Registro Integral Comunidad"}
      actionText={initialData ? "Actualizar Datos" : "Crear Habitante"}
      onActionClick={handleSubmit}
    >
      <form
        onSubmit={handleSubmit}
        className="grid grid-col-1 md:grid-cols-2 gap-5"
      >
        <CustomInput
          label="Nombres"
          name="nombres"
          value={formData.nombres}
          onChange={handleChange}
          placeholder="Ej: Marcos Antonio"
          required
        />

        <CustomInput
          label="Apellidos"
          name="apellidos"
          value={formData.apellidos}
          onChange={handleChange}
          placeholder="Ej: Pérez García"
          required
        />

        <CustomInput
          label="Cédula / Identidad"
          name="cedula"
          value={formData.cedula}
          onChange={handleChange}
          placeholder="Ej: 22123456"
          disabled={!!initialData}
          required
        />

        <CustomInput
          label="Fecha de Nacimiento"
          name="fechaNacimiento"
          value={formData.fechaNacimiento}
          onChange={handleChange}
          type="date"
          required
        />

        <CustomInput
          label="Teléfono de Contacto"
          name="telefono"
          value={formData.telefono}
          onChange={handleChange}
          type="tel"
          placeholder="0414-000-0000"
        />

        <CustomSelect
          label="Género"
          name="genero"
          value={formData.genero}
          onChange={handleChange}
          options={[
            { label: "Masculino", value: "M" },
            { label: "Femenino", value: "F" },
          ]}
        />
      </form>
    </CustomModal>
  );
};

export default CreateResidentModal;
