import { useState, useEffect } from "react";
import { z } from "zod";
import CustomModal from "../../../../components/CustomModal";
import CustomInput from "../../../../components/CustomInput";
import CustomSelect from "../../../../components/CustomSelect";

const residentSchema = z.object({
  cedula: z
    .string()
    .trim()
    .min(6, "Cédula inválida, mínimo 6 dígitos")
    .max(12, "Cédula inválida, máximo 12 dígitos")
    .regex(/^[0-9]+$/, "La cédula debe contener solo números"),
  nombres: z
    .string()
    .trim()
    .min(3, "Ingrese al menos 3 caracteres")
    .max(80, "Nombre demasiado largo"),
  apellidos: z
    .string()
    .trim()
    .min(3, "Ingrese al menos 3 caracteres")
    .max(80, "Apellido demasiado largo"),
  fechaNacimiento: z
    .string()
    .nonempty("Fecha de nacimiento requerida")
    .refine((value) => !Number.isNaN(Date.parse(value)), {
      message: "Fecha de nacimiento inválida",
    })
    .refine((value) => {
      const birth = new Date(value);
      const now = new Date();
      const age = Math.floor((now - birth) / (1000 * 60 * 60 * 24 * 365.25));
      return birth < now && age >= 0 && age <= 120;
    }, {
      message: "La fecha de nacimiento debe ser válida y menor a la fecha actual",
    }),
  genero: z.enum(["M", "F"], {
    errorMap: () => ({ message: "Selecciona un género válido" }),
  }),
  telefono: z
    .string()
    .trim()
    .optional()
    .refine((value) => !value || /^[0-9+\s()-]{7,20}$/.test(value), {
      message: "Teléfono inválido",
    }),
});

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
  const [errors, setErrors] = useState({});

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
    setErrors({});
  }, [initialData, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const parsed = residentSchema.safeParse(formData);
    if (!parsed.success) {
      const fieldErrors = Object.fromEntries(
        Object.entries(parsed.error.formErrors.fieldErrors).map(
          ([key, messages]) => [key, messages?.[0] || ""]
        )
      );
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    onSave(parsed.data);
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
        {errors.nombres && (
          <p className="text-error text-xs mt-1">{errors.nombres}</p>
        )}

        <CustomInput
          label="Apellidos"
          name="apellidos"
          value={formData.apellidos}
          onChange={handleChange}
          placeholder="Ej: Pérez García"
          required
        />
        {errors.apellidos && (
          <p className="text-error text-xs mt-1">{errors.apellidos}</p>
        )}

        <CustomInput
          label="Cédula / Identidad"
          name="cedula"
          value={formData.cedula}
          onChange={handleChange}
          placeholder="Ej: 22123456"
          disabled={!!initialData}
          required
          onlyNumbers
        />
        {errors.cedula && (
          <p className="text-error text-xs mt-1">{errors.cedula}</p>
        )}

        <CustomInput
          label="Fecha de Nacimiento"
          name="fechaNacimiento"
          value={formData.fechaNacimiento}
          onChange={handleChange}
          type="date"
          required
        />
        {errors.fechaNacimiento && (
          <p className="text-error text-xs mt-1">{errors.fechaNacimiento}</p>
        )}

        <CustomInput
          label="Teléfono de Contacto"
          name="telefono"
          value={formData.telefono}
          onChange={handleChange}
          type="tel"
          placeholder="0414-000-0000"
        />
        {errors.telefono && (
          <p className="text-error text-xs mt-1">{errors.telefono}</p>
        )}

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
