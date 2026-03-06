import React from 'react'

const CardMember = ({miembro}) => {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5 hover:border-gray-400 hover:shadow-md transition-all duration-200">
      <div className="flex items-center gap-4 mb-4">
        <div className={`w-12 h-12 rounded-full flex items-center justify-center text-base font-bold shrink-0 ${miembro.color}`}>
          {miembro.iniciales}
        </div>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-gray-900 truncate">{miembro.nombre}</p>
          <p className="text-xs text-gray-400 mt-0.5">{miembro.cedula}</p>
        </div>
      </div>

      <div className="border-t border-gray-100 mb-4" />

      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-xs">📞</span>
          <span className="text-xs text-gray-600">{miembro.telefono}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs">✉️</span>
          <span className="text-xs text-gray-600 truncate">{miembro.correo}</span>
        </div>
      </div>
    </div>
  )
}

export default CardMember
