import { FiCheckCircle } from "react-icons/fi";
import { AiOutlineClose } from "react-icons/ai";

const CreateMinuteModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box max-w-2xl bg-base-100 p-0 overflow-hidden border border-base-200 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-base-200 bg-base-200/30">
          <div>
            <h2 className="text-xl font-bold text-base-content">Registrar Nueva Acta</h2>
            <p className="text-[10px] opacity-60 uppercase tracking-widest font-bold font-mono">Formalización de Acuerdos</p>
          </div>
          <button
            onClick={onClose}
            className="btn btn-ghost btn-sm btn-circle text-base-content/50 hover:text-error transition-colors"
          >
            <AiOutlineClose size={20} />
          </button>
        </div>

        {/* Form */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="form-control w-full md:col-span-2">
            <label className="label py-1">
              <span className="label-text font-bold text-[10px] uppercase opacity-60 tracking-wider">Título de la Sesión / Asamblea</span>
            </label>
            <input
              type="text"
              placeholder="Ej: Asamblea Ordinaria de Rendición de Cuentas"
              className="input input-bordered w-full focus:input-primary transition-all bg-base-200/20"
            />
          </div>

          <div className="form-control w-full">
            <label className="label py-1">
              <span className="label-text font-bold text-[10px] uppercase opacity-60 tracking-wider">Fecha de Sesión</span>
            </label>
            <input
              type="date"
              className="input input-bordered w-full focus:input-primary bg-base-200/20"
            />
          </div>

          <div className="form-control w-full">
            <label className="label py-1">
              <span className="label-text font-bold text-[10px] uppercase opacity-60 tracking-wider">Tipo de Acta</span>
            </label>
            <select className="select select-bordered w-full focus:select-primary bg-base-200/20">
              <option disabled selected>Seleccionar Tipo</option>
              <option>Ordinaria</option>
              <option>Extraordinaria</option>
              <option>Asamblea General</option>
              <option>Reunión de Voceros</option>
            </select>
          </div>

          <div className="form-control w-full">
            <label className="label py-1">
              <span className="label-text font-bold text-[10px] uppercase opacity-60 tracking-wider">Nro de Asistentes</span>
            </label>
            <input
              type="number"
              placeholder="Ej: 45"
              className="input input-bordered w-full focus:input-primary bg-base-200/20"
            />
          </div>

          <div className="form-control w-full">
            <label className="label py-1">
              <span className="label-text font-bold text-[10px] uppercase opacity-60 tracking-wider">Lugar de Sesión</span>
            </label>
            <input
              type="text"
              placeholder="Ej: Casa Comunal"
              className="input input-bordered w-full focus:input-primary bg-base-200/20"
            />
          </div>

          <div className="form-control w-full md:col-span-2">
            <label className="label py-1">
              <span className="label-text font-bold text-[10px] uppercase opacity-60 tracking-wider">Resumen de Acuerdos / Orden del Día</span>
            </label>
            <textarea 
               className="textarea textarea-bordered h-32 bg-base-200/20 focus:textarea-primary" 
               placeholder="Indicar los puntos tratados y las decisiones tomadas..."
            ></textarea>
          </div>

          <div className="form-control w-full md:col-span-2">
            <label className="label py-1 border-t border-base-200 pt-2 border-dashed">
              <span className="label-text font-bold text-[10px] uppercase opacity-60 tracking-wider">Carga de Soporte (Opcional)</span>
            </label>
            <input type="file" className="file-input file-input-bordered file-input-sm w-full bg-base-200/10 h-10" />
            <p className="text-[9px] opacity-40 mt-1 italic">Sube el acta escaneada o fotos de las firmas de los asistentes (PDF, PNG, JPG).</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="modal-action px-6 py-4 border-t border-base-200 bg-base-200/30 mt-0 gap-3">
          <button
            onClick={onClose}
            className="btn btn-ghost btn-sm md:btn-md capitalize font-bold"
          >
            Cancelar
          </button>
          <button className="btn btn-neutral btn-sm md:btn-md capitalize px-8 font-bold shadow-lg shadow-neutral/20 gap-2">
            <FiCheckCircle /> Registrar Acta
          </button>
        </div>
      </div>
      <div className="modal-backdrop bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
    </div>
  );
};

export default CreateMinuteModal;
