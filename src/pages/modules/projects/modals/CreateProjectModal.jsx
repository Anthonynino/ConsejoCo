import { useState, useEffect } from "react";
import { z } from "zod";
import CustomTextArea from "../../../../components/CustomTextArea";
import CustomSelect from "../../../../components/CustomSelect";
import CustomModal from "../../../../components/CustomModal";
import CustomInput from "../../../../components/CustomInput";
import { createProject, updateProject } from "../../../../services/projects";
import { toast } from "react-toastify";

const projectSchema = z.object({
  nombre: z.string().min(1, "El nombre es requerido").min(3, "El nombre debe tener al menos 3 caracteres").max(100, "El nombre no puede exceder 100 caracteres"),
  descripcion: z.string().min(1, "La descripción es requerida").min(10, "La descripción debe tener al menos 10 caracteres"),
  estado: z.enum(["PLANIFICADO", "EN_EJECUCION", "EN_PAUSA", "COMPLETADO", "CANCELADO"]),
  prioridad: z.enum(["ALTA", "MEDIA", "BAJA"]),
  ubicacionSector: z.string().max(200, "La ubicación no puede exceder 200 caracteres").min(1, "La ubicación es requerida"),
  fechaInicio: z.string().min(1, "La fecha de inicio es requerida"),
  fechaFinEstimada: z.string().min(1, "La fecha fin es requerida"),
  presupuestoTotal: z.string().refine(
    (val) => !val || parseFloat(val) >= 0,
    "El presupuesto no puede ser negativo"
  ).refine(
    (val) => !val || !isNaN(parseFloat(val)),
    "El presupuesto debe ser un número válido"
  ).refine(
    (val) => !val || val.length <= 12,
    "El presupuesto no puede exceder 12 digitos"
  ).min(1, "El presupuesto es requerido"),
});

const CreateProjectModal = ({ isOpen, onClose, initialData, onSuccess }) => {
  const formatDateForInput = (dateString) => {
    if (!dateString) return "";
    return dateString.split("T")[0];
  };

  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    estado: "PLANIFICADO",
    prioridad: "MEDIA",
    ubicacionSector: "",
    fechaInicio: "",
    fechaFinEstimada: "",
    presupuestoTotal: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isOpen) {
      setFormData({
        nombre: initialData?.nombre || "",
        descripcion: initialData?.descripcion || "",
        estado: initialData?.estado || "PLANIFICADO",
        prioridad: initialData?.prioridad || "MEDIA",
        ubicacionSector: initialData?.ubicacionSector || "",
        fechaInicio: formatDateForInput(initialData?.fechaInicio),
        fechaFinEstimada: formatDateForInput(initialData?.fechaFinEstimada),
        presupuestoTotal: initialData?.presupuestoTotal || "",
      });
    }
  }, [isOpen, initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    debugger
    e.preventDefault();
    try {
      const validationResult = projectSchema.safeParse(formData);

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
      // Clear errors if validation passes
      setErrors({});

      const projectData = {
        nombre: formData.nombre,
        descripcion: formData.descripcion,
        estado: formData.estado,
        prioridad: formData.prioridad,
        ubicacionSector: formData.ubicacionSector,
        fechaInicio: formData.fechaInicio,
        fechaFinEstimada: formData.fechaFinEstimada,
        presupuestoTotal: parseFloat(formData.presupuestoTotal) || 0,
      };

      if (initialData?.id) {
        await updateProject(initialData.id, projectData);
        toast.success("Proyecto actualizado exitosamente");
      } else {
        await createProject(projectData);
        toast.success("Proyecto creado exitosamente");
      }

      onSuccess();
      onClose();
    } catch (error) {
      console.error("Error al guardar proyecto:", error);
      toast.error("Error al guardar el proyecto");
    }
  };

  if (!isOpen) return null;

  return (
    <CustomModal
      isOpen={isOpen}
      onClose={onClose}
      widthClass={"max-w-2xl"}
      title={initialData ? "Editar Proyecto" : "Nuevo Proyecto Comunitario"}
      subtitle={"Gestión de iniciativa sectoral"}
      actionText={initialData ? "Actualizar Proyecto" : "Crear Proyecto"}
      onAction={handleSubmit}
    >
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <CustomInput
            label="Nombre del Proyecto"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            type="text"
            placeholder="Ej: Reparación de tuberías"
            className="md:col-span-2"
            required
            error={errors.nombre}
          />

          <CustomTextArea
            label="Descripción"
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            placeholder={"Objetivo y alcance del proyecto..."}
            className={"md:col-span-2"}
            required
            error={errors.descripcion}
          />

          <CustomInput
            label="Presupuesto Total ($)"
            name="presupuestoTotal"
            value={formData.presupuestoTotal}
            onChange={handleChange}
            type="number"
            placeholder="0.00"
            min="0"
            step="0.01"
            error={errors.presupuestoTotal}
          />

          <CustomSelect
            label="Prioridad"
            name="prioridad"
            value={formData.prioridad}
            onChange={handleChange}
            options={["BAJA", "MEDIA", "ALTA"]}
          />

          <CustomSelect
            label="Estado"
            name="estado"
            value={formData.estado}
            onChange={handleChange}
            options={["PLANIFICADO", "EN_EJECUCION", "EN_PAUSA", "COMPLETADO", "CANCELADO"]}
          />

          <CustomInput
            label="Ubicación / Sector"
            name="ubicacionSector"
            value={formData.ubicacionSector}
            onChange={handleChange}
            type="text"
            placeholder="Ej: Sector Las Flores"
            error={errors.ubicacionSector}
          />

          <CustomInput
            label="Fecha Inicio"
            name="fechaInicio"
            value={formData.fechaInicio}
            onChange={handleChange}
            type="date"
            error={errors.fechaInicio}
          />

          <CustomInput
            label="Fecha Fin Estimada"
            name="fechaFinEstimada"
            value={formData.fechaFinEstimada}
            onChange={handleChange}
            type="date"
            error={errors.fechaFinEstimada}
          />
        </div>
      </form>
    </CustomModal>
  );
};

export default CreateProjectModal;
