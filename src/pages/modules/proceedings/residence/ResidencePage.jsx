import { FaFileAlt } from "react-icons/fa";
import HeaderModules from "../../../../components/HeaderModules";
import CustomInput from "../../../../components/CustomInput";
import { generarConstanciaResidencia } from "../../../../services/constance";
import { useState } from "react";
import CustomTextArea from "../../../../components/CustomTextArea";

const ProcedingsPage = () => {

  const [form, setForm] = useState({
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
    try {      await generarConstanciaResidencia(form)
    } catch (error) {
      console.error("Error al generar constancia de residencia:", error);
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
      <div className="flex items-center gap-2 pb-3 border-b border-base-200">
        <FaFileAlt className="text-base-content/40 text-sm" />
        <span className="text-sm font-medium text-base-content/60">
          Datos del solicitante
        </span>
      </div>

      <CustomInput label="Nombre" placeholder="Ej. María" value={form.nombre} onChange={(e) => setForm({...form, nombre: e.target.value})} />
      <CustomInput label="Apellido" placeholder="Ej. González" value={form.apellido} onChange={(e) => setForm({...form, apellido: e.target.value})} />
      <CustomInput label="Cédula" placeholder="Ej. 12345678" value={form.cedula} onChange={(e) => setForm({...form, cedula: e.target.value})} />
      <CustomInput label="Ubicación" placeholder="Ej. Avenida, calle, casa, sector" value={form.ubicacion} onChange={(e) => setForm({...form, ubicacion: e.target.value})} />
      <CustomInput label="Tiempo" placeholder="Ej. Hace 2 años" value={form.tiempo} onChange={(e) => setForm({...form, tiempo: e.target.value})} />
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

export default ProcedingsPage

