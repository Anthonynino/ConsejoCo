import { FaFileAlt } from "react-icons/fa";
import HeaderModules from "../../../../components/HeaderModules";
import CustomInput from "../../../../components/CustomInput";
import {generarConstancia} from "../../../../services/constance"
import { useState } from "react";
import { toast } from "react-toastify";

const GoodConductPage = () => {

  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    cedula: "",
    nacionalidad: "",
    direccion: "",
    fechaDesde: "",
  })

  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true)
    try {
      await generarConstancia({ ...form, titulo: "BUENA_CONDUCTA" })
      toast.success("Constancia de buena conducta generada correctamente")
    } catch (error) {
      console.error("Error al generar constancia de buena conducta:", error);
      toast.error("Error al generar constancia, agrega todos los campos correctamente")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full space-y-6 mx-auto p-6">

      <HeaderModules
        title="Constancia de Buena Conducta"
        description="Genera e imprime constancias de buena conducta"
        titleBtn={loading ? "Generando..." : "Generar constancia"}
        onActionBtn={handleSubmit}
      />

      <div className="border border-base-200 rounded-xl p-6 space-y-5 max-w-lg">
        <div className="flex items-center gap-2 pb-3 border-b border-base-200">
          <FaFileAlt className="text-base-content/40 text-sm" />
          <span className="text-sm font-medium text-base-content/60">
            Datos del solicitante
          </span>
        </div>

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
        <CustomInput label="Dirección" placeholder="Ej. Avenida, calle, casa, sector"
          value={form.direccion} maxLength={100}
          onChange={(e) => setForm({ ...form, direccion: e.target.value })}
        />
        <CustomInput label="Reside desde" placeholder="Ej. 2010"
          value={form.fechaDesde}  maxLength={50}
          onChange={(e) => setForm({ ...form, fechaDesde: e.target.value })}
        />
      </div>

    </div>
  )
}

export default GoodConductPage