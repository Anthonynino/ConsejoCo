import { FaFileAlt } from "react-icons/fa";
import HeaderModules from "../../../components/HeaderModules";
import CustomInput from "../../../components/CustomInput";
import { generarConstanciaResidencia } from "../../../services/constance";
import { useState } from "react";
import CustomTextArea from "../../../components/CustomTextArea";
import { toast } from "react-toastify";
import CustomSelect from "../../../components/CustomSelect";

const ProceedingPage = () => {

  const [form, setForm] = useState({
    titulo: "residencia",
    nombre: "",
    apellido: "",
    cedula: "",
    ubicacion: "",
    tiempo: "",
    motivo:""
  })
  

  const [loading, setLoading] = useState(false);

  const handleSubtmit = async () =>{
    console.log(form)
    setLoading(true)
    try {      
      await generarConstanciaResidencia(form)
      toast.success("Constancia de residencia generada correctamente")
    } catch (error) {
      console.error("Error al generar constancia de residencia:", error);
      toast.error("Error al generar constancia de residencia, agrega todos los campos correctamente")
    } finally {
      setLoading(false)
    }
  }


  return (
 <div className="w-full space-y-6 mx-auto p-6">

  <HeaderModules
    title="Cartas de residencia"
    description="Genera e imprime cartas de residencia"
    titleBtn={loading ? "Generando..." : "Generar constancia"}
    onActionBtn={handleSubtmit}
  />

  <div className="flex gap-6 items-start">

    {/* Formulario */}
    <div className="border border-base-200 rounded-xl p-6 space-y-5 flex-1">
        <span className="text-sm font-medium text-base-content/60">
          Tipo de constancia
        </span>
        <CustomSelect options={["Residencia", "Buena conducta"]} value={form.titulo} onChange={(e) => setForm({...form, titulo: e.target.value})} />    

      <div className="flex items-center gap-2 pb-3 border-b border-base-200">
        <FaFileAlt className="text-base-content/40 text-sm" />
        <span className="text-sm font-medium text-base-content/60">
          Datos del solicitante
        </span>
      </div>

      <CustomInput label="Nombre" placeholder="Ej. María" value={form.nombre} onlyText maxLength={15} onChange={(e) => setForm({...form, nombre: e.target.value})} />
      <CustomInput label="Apellido" placeholder="Ej. González" value={form.apellido} maxLength={15} onlyText onChange={(e) => setForm({...form, apellido: e.target.value})} />
      <CustomInput label="Cédula" placeholder="Ej. 12345678" value={form.cedula} maxLength={8} onlyNumbers onChange={(e) => setForm({...form, cedula: e.target.value})} />
      <CustomInput label="Ubicación" placeholder="Ej. Avenida, calle, casa, sector" maxLength={100} value={form.ubicacion} onlyText onChange={(e) => setForm({...form, ubicacion: e.target.value})} />
      <CustomInput label="Tiempo" placeholder="Ej. Hace 2 años" value={form.tiempo} maxLength={20} onChange={(e) => setForm({...form, tiempo: e.target.value})} />
    </div>

    {/* Vista previa */}
    <div className="border border-base-200 rounded-xl p-6 flex-1">
      <div className="flex items-center gap-2 pb-3 border-b border-base-200">
        <FaFileAlt className="text-base-content/40 text-sm" />
        <span className="text-sm font-medium text-base-content/60">
          Razon/Motivo del acta
        </span>
      </div>

      <CustomTextArea
      className="w-full h-80 mt-4 bg-transparent resize-none outline-none text-sm text-base-content/70 leading-relaxed"
      placeholder="Constancia que se expide..."
      value={form.motivo}
      onChange={(e) => {
        setForm({...form, motivo: e.target.value})
      }}
      />
    </div>

  </div>
</div>
  )
}

export default ProceedingPage

