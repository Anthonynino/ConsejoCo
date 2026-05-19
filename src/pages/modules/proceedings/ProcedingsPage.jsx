import { FaFileAlt } from "react-icons/fa";
import HeaderModules from "../../../components/HeaderModules";
import CustomInput from "../../../components/CustomInput";

import React from 'react'

const ProcedingsPage = () => {
  return (
 <div className="w-full space-y-6 mx-auto p-6">

  <HeaderModules
    title="Cartas de residencia"
    description="Genera e imprime cartas de residencia"
    titleBtn="Generar carta"
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

      <CustomInput label="Nombre" placeholder="Ej. María" />
      <CustomInput label="Apellido" placeholder="Ej. González" />
      <CustomInput label="Cédula" placeholder="Ej. 12345678" />
      <CustomInput label="Ubicación" placeholder="Ej. Avenida, calle, casa, sector" />
      <CustomInput label="Tiempo" placeholder="Ej. Hace 2 años" />
    </div>

    {/* Vista previa */}
    <div className="border border-base-200 rounded-xl p-6 flex-1">
      <div className="flex items-center gap-2 pb-3 border-b border-base-200">
        <FaFileAlt className="text-base-content/40 text-sm" />
        <span className="text-sm font-medium text-base-content/60">
          Razon/Motivo del acta
        </span>
      </div>

      <textarea
        className="w-full h-80 mt-4 bg-transparent resize-none outline-none text-sm text-base-content/70 leading-relaxed"
        placeholder="Constancia que se expide a solicitud de parte intereasada para Fines legales, para apertura de cuenta en entidad bancaria, a los dos (02) dias del mes de junio del año dos mil veintiseis"
      />
    </div>

  </div>
</div>
  )
}

export default ProcedingsPage

