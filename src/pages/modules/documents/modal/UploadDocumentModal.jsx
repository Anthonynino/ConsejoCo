import { useState, useEffect } from "react";
import { FiUploadCloud, FiX } from "react-icons/fi";
import { toast } from "react-toastify";
import { z } from "zod";
import CustomModal from "../../../../components/CustomModal";
import CustomInput from "../../../../components/CustomInput";
import CustomSelect from "../../../../components/CustomSelect";
import { createDocument, updateDocument } from "../../../../services/documents";

const documentSchema = z.object({
  nombre: z.string().min(1, "El nombre es requerido").max(200, "El nombre es demasiado largo"),
  categoria: z.enum(["LEGAL", "PROYECTOS", "IDENTIDAD", "FINANZAS", "HABITANTES", "CARTOGRAFIA", "EVENTOS", "OTROS"], {
    required_error: "La categoría es requerida",
  }),
  archivo: z.any().optional(),
});

const UploadDocumentModal = ({ isOpen, onClose, initialData, onSuccess }) => {
  const [formData, setFormData] = useState({
    nombre: "",
    categoria: "",
    archivo: null,
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categoriaOptions = [
    { value: "LEGAL", label: "Legal" },
    { value: "PROYECTOS", label: "Proyectos" },
    { value: "IDENTIDAD", label: "Identidad" },
    { value: "FINANZAS", label: "Finanzas" },
    { value: "HABITANTES", label: "Habitantes" },
    { value: "CARTOGRAFIA", label: "Cartografía" },
    { value: "EVENTOS", label: "Eventos" },
    { value: "OTROS", label: "Otros" },
  ];

  useEffect(() => {
    if (isOpen) {
      setFormData({
        nombre: initialData?.nombre || "",
        categoria: initialData?.categoria || "",
        archivo: null,
      });
      setErrors({});
    }
  }, [isOpen, initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, archivo: file }));
      setErrors((prev) => ({ ...prev, archivo: "" }));
    }
  };

  const handleRemoveFile = () => {
    setFormData((prev) => ({ ...prev, archivo: null }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validate that archivo is provided when creating, optional when editing
      if (!initialData?.id && !formData.archivo) {
        setErrors({ archivo: "El archivo es requerido" });
        toast.error("Por favor, selecciona un archivo");
        setIsSubmitting(false);
        return;
      }

      const validatedData = documentSchema.parse(formData);
      
      const formDataToSend = new FormData();
      formDataToSend.append("nombre", validatedData.nombre);
      formDataToSend.append("categoria", validatedData.categoria);
      formDataToSend.append("consejoComunalId", "1");
      
      if (validatedData.archivo instanceof File) {
        formDataToSend.append("archivo", validatedData.archivo);
      }

      if (initialData?.id) {
        await updateDocument(initialData.id, formDataToSend);
        toast.success("Documento actualizado exitosamente");
      } else {
        await createDocument(formDataToSend);
        toast.success("Documento creado exitosamente");
      }

      onSuccess();
      onClose();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors = {};
        error.errors.forEach((err) => {
          fieldErrors[err.path[0]] = err.message;
        });
        setErrors(fieldErrors);
        toast.error("Por favor, verifica los campos del formulario");
      } else {
        console.error("Error al guardar documento:", error);
        toast.error(error.response?.data?.message || "Error al guardar el documento");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <CustomModal
      isOpen={isOpen}
      onClose={onClose}
      widthClass={"max-w-lg"}
      title={initialData ? "Editar Documento" : "Subir Documento"}
      subtitle={"Archivo Digital Comunitario"}
      actionText={initialData ? "Actualizar" : "Cargar Archivo"}
      onAction={handleSubmit}
      isActionDisabled={isSubmitting}
    >
      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          {/* Dropzone */}
          <div className="border-2 border-dashed border-base-300 rounded-2xl p-6 flex flex-col items-center justify-center gap-3 hover:border-primary/50 hover:bg-primary/5 transition-all">
            <input
              type="file"
              id="archivo"
              name="archivo"
              onChange={handleFileChange}
              accept=".pdf,.jpg,.jpeg,.png,.doc,.docx,.xlsx"
              className="hidden"
            />
            
            {formData.archivo ? (
              <div className="flex items-center gap-3 w-full px-4">
                <div className="flex-1 flex items-center gap-2 bg-base-200 rounded-lg p-2">
                  <FiUploadCloud className="text-primary" />
                  <span className="text-sm truncate">{formData.archivo.name}</span>
                </div>
                <button
                  type="button"
                  onClick={handleRemoveFile}
                  className="btn btn-ghost btn-circle btn-sm"
                >
                  <FiX className="text-error" />
                </button>
              </div>
            ) : (
              <label
                htmlFor="archivo"
                className="cursor-pointer flex flex-col items-center gap-3"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                  <FiUploadCloud className="text-primary text-3xl" />
                </div>
                <div className="text-center">
                  <p className="font-bold text-sm">Haz click o arrastra un archivo</p>
                  <p className="text-[10px] opacity-40 mt-1">
                    {initialData ? "Opcional - Deja vacío para mantener el archivo actual" : "Soporta PDF, JPG, PNG, DOCX hasta 15MB"}
                  </p>
                </div>
              </label>
            )}
          </div>
          {errors.archivo && <p className="text-error text-xs">{errors.archivo}</p>}

          {/* Form Fields */}
          <div className="space-y-4">
            <CustomInput
              label="Nombre del Documento"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              type="text"
              placeholder="Ej: Acta de Asamblea 01-2024"
              error={errors.nombre}
              required
            />

            <CustomSelect
              label="Categoría"
              name="categoria"
              value={categoriaOptions.find((opt) => opt.value === formData.categoria)?.label || ""}
              onChange={(e) => {
                const selected = categoriaOptions.find((opt) => opt.label === e.target.value);
                handleChange({ target: { name: "categoria", value: selected?.value || "" } });
              }}
              options={categoriaOptions.map((opt) => opt.label)}
              error={errors.categoria}
              required
            />
          </div>
        </div>
      </form>
    </CustomModal>
  );
};

export default UploadDocumentModal;
