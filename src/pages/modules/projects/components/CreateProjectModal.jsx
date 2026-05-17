import { useState, useEffect } from "react";
import CustomModal from "../../../../components/CustomModal";
import CustomTextArea from "../../../../components/CustomTextArea";
import CustomSelect from "../../../../components/CustomSelect";
import CustomInput from "../../../../components/CustomInput";

const CreateProjectModal = ({ isOpen, onClose, initialData }) => {
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    estado: "PLANIFICADO",
    prioridad: "MEDIA",
    ubicacion_sector: "",
    fecha_inicio: "",
    fecha_fin_estimada: "",
    presupuesto_total: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        nombre: initialData.nombre || "",
        descripcion: initialData.descripcion || "",
        estado: initialData.estado || "PLANIFICADO",
        prioridad: initialData.prioridad || "MEDIA",
        ubicacion_sector: initialData.ubicacion_sector || "",
        fecha_inicio: initialData.fecha_inicio || "",
        fecha_fin_estimada: initialData.fecha_fin_estimada || "",
        presupuesto_total: initialData.presupuesto_total || "",
      });
    } else {
      setFormData({
        nombre: "",
        descripcion: "",
        estado: "PLANIFICADO",
        prioridad: "MEDIA",
        ubicacion_sector: "",
        fecha_inicio: "",
        fecha_fin_estimada: "",
        presupuesto_total: "",
      });
    }
  }, [initialData, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
    >
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
          name="presupuesto_total"
          value={formData.presupuesto_total}
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
          name="ubicacion_sector"
          value={formData.ubicacion_sector}
          onChange={handleChange}
          type="text"
          placeholder="Ej: Sector Las Flores"
        />

        <CustomInput 
          label="Fecha Inicio" 
          name="fecha_inicio"
          value={formData.fecha_inicio}
          onChange={handleChange}
          type="date" 
        />
        
        <CustomInput 
          label="Fecha Fin Estimada" 
          name="fecha_fin_estimada"
          value={formData.fecha_fin_estimada}
          onChange={handleChange}
          type="date" 
        />
      </div>
    </CustomModal>
  );
};

export default CreateProjectModal;
