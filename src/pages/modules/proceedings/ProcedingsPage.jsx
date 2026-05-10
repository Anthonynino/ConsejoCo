import { FaFileAlt } from "react-icons/fa";
import HeaderModules from "../../../components/HeaderModules";
import CustomInput from "../../../components/CustomInput";

import React from 'react'

const ProcedingsPage = () => {
  return (
    <div className="w-full space-y-6 mx-auto p-6">

      {/* Header */}
      <HeaderModules
        title="Cartas de residencia"
        description="Genera e imprime cartas de residencia"
        titleBtn="Generar carta"
      />

      {/* Formulario */}
      <div className="border border-base-200 rounded-xl p-6 space-y-5 max-w-lg">

        <div className="flex items-center gap-2 pb-3 border-b border-base-200">
          <FaFileAlt className="text-base-content/40 text-sm" />
          <span className="text-sm font-medium text-base-content/60">
            Datos del solicitante
          </span>
        </div>

        <CustomInput label="Nombre" placeholder="Ej. María" />
        <CustomInput label="Apellido" placeholder="Ej. González" />
        <CustomInput label="Cédula" placeholder="Ej. 12345678" />

      </div>

      <div className="border border-base-200 rounded-xl p-6 space-y-5 max-w-lg">

        <div className="flex items-center gap-2 pb-3 border-b border-base-200">
          <FaFileAlt className="text-base-content/40 text-sm" />
          <span className="text-sm font-medium text-base-content/60">
            Datos del remitente
          </span>
        </div>

        <CustomInput label="Nombre" placeholder="Ej. María" />
        <CustomInput label="Apellido" placeholder="Ej. González" />
        <CustomInput label="Cédula" placeholder="Ej. 12345678" />

      </div>
    </div>
  )
}

export default ProcedingsPage

