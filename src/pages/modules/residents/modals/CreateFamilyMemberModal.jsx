import { useState, useEffect } from "react";
import { z } from "zod";
import CustomModal from "../../../../components/CustomModal";
import CustomInput from "../../../../components/CustomInput";
import CustomSelect from "../../../../components/CustomSelect";

const familyMemberSchema = z.object({
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
  cedula: z
    .string()
    .trim()
    .min(6, "Cédula inválida, mínimo 6 dígitos")
    .max(12, "Cédula inválida, máximo 12 dígitos")
    .regex(/^[0-9]+$/, "La cédula debe contener solo números"),
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
  parentesco: z.enum(["JEFE", "CONYUGE", "HIJO", "PADRE", "MADRE", "HERMANO", "ABUELO", "NIETO"], {
    errorMap: () => ({ message: "Selecciona un parentesco válido" }),
  }),
  discapacitado: z.boolean().optional(),
  embarazada: z.boolean().optional(),
});

const CreateFamilyMemberModal = ({ isOpen, onClose, onSave, familyId }) => {
  const [formData, setFormData] = useState({
    nombres: "",
    apellidos: "",
    cedula: "",
    fechaNacimiento: "",
    genero: "M",
    telefono: "",
    parentesco: "HIJO",
    discapacitado: false,
    embarazada: false,
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isOpen) {
      setFormData({
        nombres: "",
        apellidos: "",
        cedula: "",
        fechaNacimiento: "",
        genero: "M",
        telefono: "",
        parentesco: "HIJO",
        discapacitado: false,
        embarazada: false,
      });
      setErrors({});
    }
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const parsed = familyMemberSchema.safeParse(formData);
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
      title="Nuevo Miembro Familiar"
      subtitle="Agregar familiar a la familia"
      actionText="Agregar Familiar"
      onActionClick={handleSubmit}
    >
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-5"
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
        {errors.genero && (
          <p className="text-error text-xs mt-1">{errors.genero}</p>
        )}

        <CustomSelect
          label="Parentesco"
          name="parentesco"
          value={formData.parentesco}
          onChange={handleChange}
          options={[
            { label: "Jefe", value: "JEFE" },
            { label: "Cónyuge", value: "CONYUGE" },
            { label: "Hijo", value: "HIJO" },
            { label: "Padre", value: "PADRE" },
            { label: "Madre", value: "MADRE" },
            { label: "Hermano", value: "HERMANO" },
            { label: "Abuelo", value: "ABUELO" },
            { label: "Nieto", value: "NIETO" },
          ]}
        />
        {errors.parentesco && (
          <p className="text-error text-xs mt-1">{errors.parentesco}</p>
        )}

        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            name="discapacitado"
            id="discapacitado"
            checked={formData.discapacitado}
            onChange={handleChange}
            className="checkbox checkbox-primary checkbox-sm"
          />
          <label htmlFor="discapacitado" className="text-sm font-medium">
            Persona con discapacidad
          </label>
        </div>

        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            name="embarazada"
            id="embarazada"
            checked={formData.embarazada}
            onChange={handleChange}
            className="checkbox checkbox-primary checkbox-sm"
          />
          <label htmlFor="embarazada" className="text-sm font-medium">
            Embarazada
          </label>
        </div>
      </form>
    </CustomModal>
  );
};

export default CreateFamilyMemberModal;
