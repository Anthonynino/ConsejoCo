import { FaPhoneAlt } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { FiBriefcase } from 'react-icons/fi';
import { MdDelete } from "react-icons/md";
import { FaPen } from "react-icons/fa";

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
        <div>
          <button className="mx-5 text-gray-400 hover:text-gray-600 transition-colors duration-200">
            <FaPen />
          </button>
        </div>
      </div>

      <div className="border-t border-gray-100 mb-4" />

      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <FaPhoneAlt className="text-xs text-gray-600" />
          <span className="text-xs text-gray-600">{miembro.telefono}</span>
        </div>
        <div className="flex items-center gap-2">
          <IoMdMail className="text-xs text-gray-600" />
          <span className="text-xs text-gray-600 truncate">{miembro.correo}</span>
        </div>
        <div className="flex items-center gap-2">
          <FiBriefcase className="text-xs text-gray-600" />
          <span className="text-xs text-gray-600 truncate">{miembro.cargo}</span>
        </div>
        <div>
          <button className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-red-500 border border-red-200 rounded-lg hover:bg-red-50 transition-colors">
            <MdDelete size={14} />
            Eliminar
          </button>
        </div>
      </div>
    </div>
  )
}

export default CardMember
