import { FaFileAlt } from "react-icons/fa";
import HeaderModules from "../../../../components/HeaderModules";
import CustomInput from "../../../../components/CustomInput";
import CustomSelect from "../../../../components/CustomSelect";
import { generarConstancia } from "../../../../services/constance";
import { useState } from "react";
import { toast } from "react-toastify";

const tipoSolicitud = [
  "Licencia L.A.E",
  "Licencia de actividad económica",
  "Renovación de licencia L.A.E",
  "Renovación de licencia de actividad económica",
  "Licencia de licores",
  "Permiso temporal",
  "Emprendimiento"
]

const EconomyPage = () => {

  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    cedula: "",
    nacionalidad: "",
    rif:"",
    denominacion:"",
    rubro:"",
    tipoSolicitud: tipoSolicitud[0],
    direccionComercial: "",
    fechaInicio: "",
    
  })

  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    setLoading(true)
    console.log(form)
    try {
      await generarConstancia({ ...form, titulo: "ECONOMY" })
      toast.success("Constancia de economía generada correctamente")
    }  catch (error) {
  // Esto te mostrará la respuesta exacta que envió el backend
  if (error.response) {
    console.log("Datos de error del servidor:", error.response.data)
    console.log("Estatus del error:", error.response.status)
  } else {
    console.error("Error al generar constancia de economía:", error)
  }
  toast.error("Error al generar constancia, agrega todos los campos correctamente")
} finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full space-y-6 mx-auto p-6">

      <HeaderModules
        title="Constancia de Economía"
        description="Genera e imprime constancias para trámites ante Economía Municipal"
        titleBtn={loading ? "Generando..." : "Generar constancia"}
        onActionBtn={handleSubmit}
      />

      {/* Aumenté el max-w-lg a max-w-2xl o max-w-3xl para que los inputs tengan buen espacio de lado a lado */}
      <div className="border border-base-200 rounded-xl p-6 space-y-5 max-w-4xl">
        
        <div className="flex items-center gap-2 pb-3 border-b border-base-200">
          <FaFileAlt className="text-base-content/40 text-sm" />
          <span className="text-sm font-medium text-base-content/60">
            Datos del solicitante
          </span>
        </div>

        {/* CONTENEDOR PRINCIPAL EN DOS COLUMNAS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          
          {/* Columna Izquierda: Datos de Identidad */}
          <div className="space-y-5">
            <CustomInput label="Nombre" placeholder="Ej. María"
              value={form.nombre} onlyText maxLength={50}
              onChange={(e) => setForm({ ...form, nombre: e.target.value })}
            />
            <CustomInput label="Apellido" placeholder="Ej. González"
              value={form.apellido} onlyText maxLength={50}
              onChange={(e) => setForm({ ...form, apellido: e.target.value })}
            />
            <CustomInput label="Cédula" placeholder="Ej. 12345678"
              value={form.cedula} onlyNumbers maxLength={8}
              onChange={(e) => setForm({ ...form, cedula: e.target.value })}
            />
            <CustomInput label="Nacionalidad" placeholder="Ej. Venezolano"
              value={form.nacionalidad} onlyText maxLength={20}
              onChange={(e) => setForm({ ...form, nacionalidad: e.target.value })}
            />
            <CustomInput label="RIF" placeholder="Ej. J-12345678-9"
              value={form.rif} maxLength={20}
              onChange={(e) => setForm({ ...form, rif: e.target.value })}
            />
          </div>

          {/* Columna Derecha: Ubicación y Tiempo de Residencia */}
          <div className="space-y-5">
            <CustomInput label="Dirección" placeholder="Ej. Avenida, calle, casa, sector"
              value={form.direccion} maxLength={100}
              onChange={(e) => setForm({ ...form, direccion: e.target.value })}
            />

            {/* Fila de Años y Meses alineados horizontalmente */}
            <div className="flex gap-4">
              <CustomInput label="Fecha de inicio" placeholder="Ej. 2010"
                value={form.fechaInicio} maxLength={50}
                onChange={(e) => setForm({ ...form, fechaInicio: e.target.value })}
                />
            </div>

            <CustomInput label="Denominacion" placeholder="Ej. tipo de organización: F.C, F.P, A.C, C.A, Otro"
              value={form.denominacion} maxLength={100}
              onChange={(e) => setForm({ ...form, denominacion: e.target.value })}
            />

            <CustomInput label="Rubro" placeholder="Ej. comercio, servicio, industria, otro"
              value={form.rubro} maxLength={100}
              onChange={(e) => setForm({ ...form, rubro: e.target.value })}
            />

            <CustomSelect
              label="Tipo de solicitud"
              options={tipoSolicitud}
              value={form.tipoSolicitud}
              onChange={(e) => setForm({ ...form, tipoSolicitud: e.target.value })}
            />
          </div>

        </div>

      </div>
      
    </div>
  )
}

export default EconomyPage