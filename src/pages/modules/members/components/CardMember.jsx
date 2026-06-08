import { FaCalendarAlt, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { FiBriefcase } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { FaPen } from "react-icons/fa";
import Avatar from "../../../../components/Avatar";

const CardMember = ({ miembro, idx, onEdit, onDelete }) => {
  return (
    <div className="card bg-base-100 border border-base-200 shadow-sm hover:shadow-md transition-all duration-300">
      <div className="card-body p-5">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Avatar initials={miembro.iniciales} idx={idx}/>
            <div>
              <h3 className="card-title text-sm font-bold truncate max-w-[150px]">
                {miembro.nombre}
              </h3>
              <p className="text-xs opacity-60 uppercase tracking-tighter">
                {miembro.cedula}
              </p>
            </div>
          </div>
          <button 
            onClick={onEdit}
            className="btn btn-ghost btn-circle btn-xs text-base-content/40 hover:text-primary transition-colors">
            <FaPen className="h-3 w-3" />
          </button>
        </div>

        <div className="divider my-1 opacity-20"></div>

        <div className="space-y-4">
          <div className="space-y-2.5">
            <div className="flex items-center gap-3 text-xs font-medium text-base-content/70">
              <div className="p-1.5 bg-base-200 rounded-lg">
                <FaCalendarAlt className="text-primary" />
              </div>
              <span>Miembro desde: {miembro.fechaCreacion}</span>
            </div>
            <div className="flex items-center gap-3 text-xs font-medium text-base-content/70">
              <div className="p-1.5 bg-base-200 rounded-lg">
                <IoMdMail className="text-primary text-base" />
              </div>
              <span className="truncate max-w-[180px]">{miembro.correo}</span>
            </div>
            <div className="flex items-center gap-3 text-xs font-medium text-base-content/70">
              <div className="p-1.5 bg-base-200 rounded-lg">
                <FiBriefcase className="text-primary text-base" />
              </div>
              <span>{miembro.cargo}</span>
            </div>
            <div className={`flex items-center gap-3 text-xs font-medium ${miembro.activo ? 'text-success/70' : 'text-error/70'}`}>
              <div className="p-1.5 bg-base-200 rounded-lg">
                {miembro.activo ? <FaCheckCircle className="text-success text-base" /> : <FaTimesCircle className="text-error text-base" /> }
              </div>
              <span>{miembro.activo ? 'Activo' : 'Inactivo'}</span>
            </div>
          </div>

          <div className="card-actions">
            <button 
              onClick={onDelete}
              className="btn btn-outline btn-error btn-sm btn-block hover:shadow-lg hover:shadow-error/20 transition-all gap-2 lowercase font-bold">
              <MdDelete className="text-lg" />
              Eliminar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardMember;
