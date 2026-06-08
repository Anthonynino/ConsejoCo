import { useState } from "react";
import { z } from "zod";
import { toast } from "react-toastify";
import CustomModal from "../../../../components/CustomModal";
import CustomInput from "../../../../components/CustomInput";

const memberSchema = z.object({
  nombre: z.string().min(2, "El nombre es muy corto"),
  apellido: z.string().min(2, "El apellido es muy corto"),
  cedula: z.string().regex(/^\d+$/, "La cédula debe contener solo números").min(6, "Cédula inválida"),
  email: z.string().email("Correo inválido"),
  rol: z.string().min(2, "El rol es requerido"),
  activo: z.boolean(),
  password: z.string().min(6, "Mínimo 6 caracteres").max(8, "Máximo 8 caracteres").optional().or(z.literal('')),
});

const CreateMemberModal = ({ isOpen, onClose, memberToEdit, onSave }) => {
  const [formData, setFormData] = useState(() => {
    if (memberToEdit) {
      return {
         nombre: memberToEdit.rawNombre || memberToEdit.nombre?.split(" ")[0] || "",
         apellido: memberToEdit.rawApellido || memberToEdit.nombre?.split(" ")[1] || "",
         cedula: memberToEdit.cedula?.replace("V-", "") || "",
         email: memberToEdit.correo || "",
         rol: memberToEdit.cargo || "",
         activo: memberToEdit.activo ?? true,
      };
    }
    return {
      nombre: "",
      apellido: "",
      cedula: "",
      email: "",
      rol: "",
      activo: true,
      password: "",
    };
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleSave = async () => {
    let currentErrors = {};
    let hasError = false;

    // Validación manual de contraseña al crear
    if (!memberToEdit && (!formData.password || formData.password.trim() === "")) {
      currentErrors.password = "La contraseña es obligatoria";
      hasError = true;
    }

    // Validación con Zod (safeParse evita lanzar excepciones tipo try/catch)
    const validation = memberSchema.safeParse(formData);
    
    if (!validation.success) {
      const messages = JSON.parse(validation.error.message)
      messages.forEach((e) => {
        currentErrors[e.path[0]] = e.message;
      });
      hasError = true;
    }

    // Si hay algún error agrupado, seteamos el estado de fallos
    if (hasError) {
      setErrors(currentErrors);
      toast.error("Por favor, corrige los errores del formulario");
      return;
    }

    try {
      const payload = { ...validation.data };
      if (!memberToEdit) {
        payload.password = formData.password;
        payload.consejoComunalId = 1;
      } else {
        delete payload.password;
      }

      await onSave(payload, memberToEdit?.id);
    } catch (error) {
      console.error(error);
      toast.error("Error inesperado al intentar guardar");
    }
  };

  if (!isOpen) return null;

  return (
    <CustomModal
      isOpen={isOpen}
      onClose={onClose}
      widthClass={"max-w-lg"}
      title={memberToEdit ? "Editar miembro" : "Nuevo miembro"}
      subtitle={memberToEdit ? "Modificación de datos" : "Registro de nuevo miembro del consejo"}
      actionText={memberToEdit ? "Guardar Cambios" : "Guardar Miembro"}
      onAction={handleSave}
    >
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <CustomInput
              label="Nombre"
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              placeholder="Ej: Laura"
            />
            {errors.nombre && <p className="text-error text-xs mt-1">{errors.nombre}</p>}
          </div>

          <div>
            <CustomInput
              label="Apellido"
              type="text"
              name="apellido"
              value={formData.apellido}
              onChange={handleChange}
              placeholder="Ej: Martínez"
            />
            {errors.apellido && <p className="text-error text-xs mt-1">{errors.apellido}</p>}
          </div>
        </div>

        <div>
          <CustomInput
            label="Cédula"
            type="text"
            name="cedula"
            value={formData.cedula}
            onChange={handleChange}
            placeholder="Ej: 12345678"
          />
          {errors.cedula && <p className="text-error text-xs mt-1">{errors.cedula}</p>}
        </div>

        <div>
          <CustomInput
            label="Correo"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="correo@ejemplo.com"
          />
          {errors.email && <p className="text-error text-xs mt-1">{errors.email}</p>}
        </div>

        <div>
          <CustomInput
            label="Rol / Cargo"
            type="text"
            name="rol"
            value={formData.rol}
            onChange={handleChange}
            placeholder="Ej: VOCERO"
          />
          {errors.rol && <p className="text-error text-xs mt-1">{errors.rol}</p>}
        </div>

        {!memberToEdit && (
          <div>
            <CustomInput
              label="Contraseña"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Escribe una contraseña segura"
            />
            {errors.password && <p className="text-error text-xs mt-1">{errors.password}</p>}
          </div>
        )}

        <div className="form-control flex flex-row items-center gap-3 mt-2">
            <input
              type="checkbox"
              name="activo"
              checked={formData.activo}
              onChange={handleChange}
              className="toggle toggle-primary"
            />
            <label className="label cursor-pointer">
              <span className="label-text font-bold">Usuario activo</span>
            </label>
        </div>
      </div>
    </CustomModal>
  );
};

export default CreateMemberModal;
