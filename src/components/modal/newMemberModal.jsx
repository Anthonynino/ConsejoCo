
import { FiX,FiUpload } from 'react-icons/fi'

const ModalNuevoMiembro = ({ isOpen, onClose }) => {
  if (!isOpen) return null

  return (
    
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md mx-4">
        <div className="flex items-center justify-between px-6 py-2 border-b border-gray-100">
          <h2 className="text-base font-semibold text-gray-900">Nuevo miembro</h2>
          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <FiX size={18} />
          </button>
        </div>

        {/* Formulario */}
        <div className="px-6 py-2 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nombre completo</label>
            <input
              type="text"
              placeholder="Ej: Laura Martínez"
              className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Cédula / ID</label>
            <input
              type="text"
              placeholder="Ej: V-12.345.678"
              className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
            <input
              type="tel"
              placeholder="Ej: 0414-123-4567"
              className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Correo</label>
            <input
              type="email"
              placeholder="Ej: laura@correo.com"
              className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Cargo / Puesto</label>
            <input
              type="text"
              placeholder="Ej: Coordinador"
              className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
            />
          </div>
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Foto</label>
            <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 flex flex-col items-center justify-center gap-2 hover:border-gray-400 transition-colors cursor-pointer">
                <FiUpload size={20} className="text-gray-400" />
                    <p className="text-sm text-gray-400">Haz click para subir una foto</p>
                    <p className="text-xs text-gray-300">PNG, JPG hasta 2MB</p>
                    <input type="file" accept="image/*" className="hidden" />
                </div>
            </div>
        </div>

        <div className="flex justify-end gap-2 px-6 py-4 border-t border-gray-100">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-600 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
          >
            Cancelar
          </button>
          <button className="px-4 py-2 text-sm font-medium text-white bg-gray-900 rounded-xl hover:bg-gray-700 transition-colors">
            Guardar
          </button>
        </div>

      </div>
    </div>
  )
}

export default ModalNuevoMiembro