import { useState, useEffect } from "react";
import { z } from "zod";
import CustomModal from "../../../../components/CustomModal";
import CustomInput from "../../../../components/CustomInput";
import CustomSelect from "../../../../components/CustomSelect";
import { toast } from "react-toastify";

const jefeSchema = z.object({
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
      return birth < now && age >= 18 && age <= 120;
    }, {
      message: "El jefe de familia debe ser mayor de 18 años",
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
  discapacitado: z.boolean().optional(),
  embarazada: z.boolean().optional(),
});

const residentSchema = z.object({
  numeroDeCasa: z.string().min(1, "Número de casa es requerido").min(1, "Número de casa debe tener al menos 1 carácter").max(20, "Número de casa demasiado largo"),
  jefe: jefeSchema,
});

const CreateResidentModal = ({ isOpen, onClose, onSave, initialData }) => {
  const [formData, setFormData] = useState({
    numeroDeCasa: "",
    jefe: {
      cedula: "",
      nombres: "",
      apellidos: "",
      fechaNacimiento: "",
      genero: "M",
      telefono: "",
      discapacitado: false,
      embarazada: false,
    },
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        numeroDeCasa: initialData.numeroDeCasa || "",
        jefe: {
          cedula: initialData.cedula || "",
          nombres: initialData.nombres || "",
          apellidos: initialData.apellidos || "",
          fechaNacimiento: initialData.fechaNacimiento
            ? initialData.fechaNacimiento.split("T")[0]
            : "",
          genero: initialData.genero || "M",
          telefono: initialData.telefono || "",
          discapacitado: initialData.discapacitado || false,
          embarazada: initialData.embarazada || false,
        },
      });
    } else {
      setFormData({
        numeroDeCasa: "",
        jefe: {
          cedula: "",
          nombres: "",
          apellidos: "",
          fechaNacimiento: "",
          genero: "M",
          telefono: "",
          discapacitado: false,
          embarazada: false,
        },
      });
    }
    setErrors({});
  }, [initialData, isOpen]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    // Check if the field is part of the jefe object
    if (["cedula", "nombres", "apellidos", "fechaNacimiento", "genero", "telefono", "discapacitado", "embarazada"].includes(name)) {
      setFormData((prev) => {
        const newJefe = {
          ...prev.jefe,
          [name]: type === "checkbox" ? checked : value,
        };
        // If gender changes to male, reset embarazada to false
        if (name === "genero" && value === "M") {
          newJefe.embarazada = false;
        }
        return {
          ...prev,
          jefe: newJefe,
        };
      });
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const validationResult = residentSchema.safeParse(formData);

      if (!validationResult.success) {
        const fieldErrors = validationResult.error.issues.reduce((acc, currentError) => {
          const field = currentError.path.join('.');
          
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
        numeroDeCasa: formData.numeroDeCasa,
        consejoComunalId: 1,
        jefe: formData.jefe,
      };
      
      onSave(formattedData);
    } catch (error) {
      console.error("Error al guardar habitante:", error);
      toast.error("Error al guardar el habitante");
    }
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
      onAction={handleSubmit}
    >
      <form
        onSubmit={handleSubmit}
        className="grid grid-col-1 md:grid-cols-2 gap-5"
      >
        <CustomInput
          label="Número de Casa"
          name="numeroDeCasa"
          value={formData.numeroDeCasa}
          onChange={handleChange}
          placeholder="Ej: A-12"
          required
          error={errors.numeroDeCasa || ""}
        />

        <CustomInput
          label="Nombres"
          name="nombres"
          value={formData.jefe.nombres}
          onChange={handleChange}
          placeholder="Ej: Marcos Antonio"
          required
          error={errors['jefe.nombres'] || ""}
        />

        <CustomInput
          label="Apellidos"
          name="apellidos"
          value={formData.jefe.apellidos}
          onChange={handleChange}
          placeholder="Ej: Pérez García"
          required
          error={errors['jefe.apellidos'] || ""}
        />

        <CustomInput
          label="Cédula / Identidad"
          name="cedula"
          value={formData.jefe.cedula}
          onChange={handleChange}
          placeholder="Ej: 22123456"
          disabled={!!initialData}
          required
          onlyNumbers
          error={errors['jefe.cedula'] || ""}
        />

        <CustomInput
          label="Fecha de Nacimiento"
          name="fechaNacimiento"
          value={formData.jefe.fechaNacimiento}
          onChange={handleChange}
          type="date"
          required
          error={errors['jefe.fechaNacimiento'] || ""}
        />

        <CustomInput
          label="Teléfono de Contacto"
          name="telefono"
          value={formData.jefe.telefono}
          onChange={handleChange}
          type="tel"
          placeholder="0414-000-0000"
          error={errors['jefe.telefono'] || ""}
        />

        <CustomSelect
          label="Género"
          name="genero"
          value={formData.jefe.genero}
          onChange={handleChange}
          options={[
            { label: "Masculino", value: "M" },
            { label: "Femenino", value: "F" },
          ]}
        />
        {errors['jefe.genero'] && (
          <p className="text-error text-xs mt-1">{errors['jefe.genero']}</p>
        )}

        <div className="col-span-2 flex gap-3 mt-3">
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              name="discapacitado"
              id="discapacitato"
              checked={formData.jefe.discapacitado}
              onChange={handleChange}
              className="checkbox checkbox-primary checkbox-sm"
            />
            <label htmlFor="discapacitato" className="text-sm font-medium">
              Persona con discapacidad
            </label>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              name="embarazada"
              id="embarazada"
              checked={formData.jefe.embarazada}
              onChange={handleChange}
              disabled={formData.jefe.genero === "M"}
              className="checkbox checkbox-primary checkbox-sm"
            />
            <label htmlFor="embarazada" className={`text-sm font-medium ${formData.jefe.genero === "M" ? "text-gray-400" : ""}`}>
              Embarazada
            </label>
          </div>
        </div>
      </form>
    </CustomModal>
  );
};

export default CreateResidentModal;
