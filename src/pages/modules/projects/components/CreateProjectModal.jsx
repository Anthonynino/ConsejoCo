import { useState, useEffect } from "react";
import CustomModal from "../../../../components/CustomModal";
import CustomTextArea from "../../../../components/CustomTextArea";
import CustomSelect from "../../../../components/CustomSelect";
import CustomInput from "../../../../components/CustomInput";
import { createProject, updateProject } from "../../../../services/projects";

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
    e.preventDefault();
    try {
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
      } else {
        await createProject(projectData);
      }

      onSuccess();
      onClose();
    } catch (error) {
      console.error("Error al guardar proyecto:", error);
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
          />

          <CustomTextArea
            label="Descripción"
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            placeholder={"Objetivo y alcance del proyecto..."}
            className={"md:col-span-2"}
            required
          />

          <CustomInput
            label="Presupuesto Total ($)"
            name="presupuestoTotal"
            value={formData.presupuestoTotal}
            onChange={handleChange}
            type="number"
            placeholder="0.00"
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
          />

          <CustomInput
            label="Fecha Inicio"
            name="fechaInicio"
            value={formData.fechaInicio}
            onChange={handleChange}
            type="date"
          />

          <CustomInput
            label="Fecha Fin Estimada"
            name="fechaFinEstimada"
            value={formData.fechaFinEstimada}
            onChange={handleChange}
            type="date"
          />
        </div>
      </form>
    </CustomModal>
  );
};

export default CreateProjectModal;
