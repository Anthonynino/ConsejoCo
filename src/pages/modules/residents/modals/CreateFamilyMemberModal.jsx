import { useState, useEffect } from "react";
import { z } from "zod";
import CustomModal from "../../../../components/CustomModal";
import CustomInput from "../../../../components/CustomInput";
import CustomSelect from "../../../../components/CustomSelect";
import { toast } from "react-toastify";

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

const CreateFamilyMemberModal = ({ isOpen, onClose, onSave, familyId, initialData }) => {
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
    if (initialData) {
      setFormData({
        nombres: initialData.nombres || "",
        apellidos: initialData.apellidos || "",
        cedula: initialData.cedula || "",
        fechaNacimiento: initialData.fechaNacimiento
          ? initialData.fechaNacimiento.split("T")[0]
          : "",
        genero: initialData.genero || "M",
        telefono: initialData.telefono || "",
        parentesco: initialData.parentesco || "HIJO",
        discapacitado: initialData.discapacitado || false,
        embarazada: initialData.embarazada || false,
      });
    } else if (isOpen) {
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
    }
    setErrors({});
  }, [isOpen, initialData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => {
      const newData = {
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      };

      if (name === "genero" && value === "M") {
        newData.embarazada = false;
      }
      return newData;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const validationResult = familyMemberSchema.safeParse(formData);

      if (!validationResult.success) {
        const fieldErrors = validationResult.error.issues.reduce((acc, currentError) => {
          const field = currentError.path[0];
          
          if (!acc[field]) {
            acc[field] = currentError.message;
          }
          return acc;
        }, {});

        setErrors(fieldErrors);
        toast.error("Por favor, corrige los errores en el formulario");
        return;
      }
      setErrors({});
      
      const formattedData = {
        ...validationResult.data,
        familiaId: familyId,
      };
      
      if (initialData) {
        onSave(formattedData, initialData.id);
      } else {
        onSave(formattedData);
      }
    } catch (error) {
      console.error("Error al guardar familiar:", error);
      toast.error("Error al guardar el familiar");
    }
  };

  if (!isOpen) return null;

  return (
    <CustomModal
      isOpen={isOpen}
      onClose={onClose}
      widthClass={"max-w-2xl"}
      title={initialData ? "Editar Familiar" : "Nuevo Miembro Familiar"}
      subtitle={initialData ? "Actualizar datos del familiar" : "Agregar familiar a la familia"}
      actionText={initialData ? "Actualizar Familiar" : "Agregar Familiar"}
      onAction={handleSubmit}
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
          error={errors.nombres || ""}
        />

        <CustomInput
          label="Apellidos"
          name="apellidos"
          value={formData.apellidos}
          onChange={handleChange}
          placeholder="Ej: Pérez García"
          required
          error={errors.apellidos || ""}
        />

        <CustomInput
          label="Cédula / Identidad"
          name="cedula"
          value={formData.cedula}
          onChange={handleChange}
          placeholder="Ej: 22123456"
          required
          onlyNumbers
          error={errors.cedula || ""}
        />

        <CustomInput
          label="Fecha de Nacimiento"
          name="fechaNacimiento"
          value={formData.fechaNacimiento}
          onChange={handleChange}
          type="date"
          required
          error={errors.fechaNacimiento || ""}
        />

        <CustomInput
          label="Teléfono de Contacto"
          name="telefono"
          value={formData.telefono}
          onChange={handleChange}
          type="tel"
          placeholder="0414-000-0000"
          error={errors.telefono || ""}
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
        {errors.genero && (
          <p className="text-error text-xs mt-1">{errors.genero}</p>
        )}

        <CustomSelect
          label="Parentesco"
          name="parentesco"
          value={formData.parentesco}
          onChange={handleChange}
          options={[
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
      <div className="col-span-2 flex gap-3 mt-3">
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
            disabled={formData.genero === "M"}
            className="checkbox checkbox-primary checkbox-sm"
          />
          <label htmlFor="embarazada" className={`text-sm font-medium ${formData.genero === "M" ? "text-gray-400" : ""}`}>
            Embarazada
          </label>
        </div>
        </div>
      </form>
    </CustomModal>
  );
};

export default CreateFamilyMemberModal;
