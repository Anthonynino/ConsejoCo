import { FiX, FiPlusCircle } from "react-icons/fi";

const CreateResidentModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box max-w-2xl bg-base-100 p-0 overflow-hidden border border-base-200 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-base-200 bg-base-200/30">
          <div>
            <h2 className="text-xl font-bold text-base-content">Nuevo Habitante</h2>
            <p className="text-[10px] opacity-60 uppercase tracking-widest font-bold font-mono">Registro Integral Comunidad</p>
          </div>
          <button
            onClick={onClose}
            className="btn btn-ghost btn-sm btn-circle text-base-content/50 hover:text-error transition-colors"
          >
            <FiX size={20} />
          </button>
        </div>

        {/* Form */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="form-control w-full md:col-span-2">
            <label className="label py-1">
              <span className="label-text font-bold text-[10px] uppercase opacity-60 tracking-wider">Nombre Completo</span>
            </label>
            <input
              type="text"
              placeholder="Ej: Marcos Antonio Pérez"
              className="input input-bordered w-full focus:input-primary transition-all bg-base-200/20"
            />
          </div>

          <div className="form-control w-full">
            <label className="label py-1">
              <span className="label-text font-bold text-[10px] uppercase opacity-60 tracking-wider">Cédula / Identidad</span>
            </label>
            <input
              type="text"
              placeholder="Ej: V-22.123.456"
              className="input input-bordered w-full focus:input-primary bg-base-200/20"
            />
          </div>

          <div className="form-control w-full">
            <label className="label py-1">
              <span className="label-text font-bold text-[10px] uppercase opacity-60 tracking-wider">Fecha de Nacimiento</span>
            </label>
            <input
              type="date"
              className="input input-bordered w-full focus:input-primary bg-base-200/20"
            />
          </div>

          <div className="form-control w-full">
            <label className="label py-1">
              <span className="label-text font-bold text-[10px] uppercase opacity-60 tracking-wider">Teléfono de Contacto</span>
            </label>
            <input
              type="tel"
              placeholder="0414-000-0000"
              className="input input-bordered w-full focus:input-primary bg-base-200/20"
            />
          </div>

          <div className="form-control w-full">
            <label className="label py-1">
              <span className="label-text font-bold text-[10px] uppercase opacity-60 tracking-wider">Profesión / Oficio</span>
            </label>
            <input
              type="text"
              placeholder="Ej: Albañil, Estudiante..."
              className="input input-bordered w-full focus:input-primary bg-base-200/20"
            />
          </div>

          <div className="form-control w-full">
            <label className="label py-1">
               <span className="label-text font-bold text-[10px] uppercase opacity-60 tracking-wider">Sexo</span>
            </label>
            <select className="select select-bordered w-full focus:select-primary bg-base-200/20">
              <option disabled selected>Seleccionar</option>
              <option>Femenino</option>
              <option>Masculino</option>
              <option>Otro</option>
            </select>
          </div>

          <div className="form-control w-full">
            <label className="label py-1">
              <span className="label-text font-bold text-[10px] uppercase opacity-60 tracking-wider">Sector de Residencia</span>
            </label>
            <select className="select select-bordered w-full focus:select-primary bg-base-200/20">
              <option disabled selected>Seleccionar Sector</option>
              <option>Sector 1</option>
              <option>Sector 2</option>
              <option>Sector 3</option>
            </select>
          </div>

          <div className="form-control w-full md:col-span-2">
            <label className="label py-1">
              <span className="label-text font-bold text-[10px] uppercase opacity-60 tracking-wider">Notas Médicas / Discapacidades</span>
            </label>
            <textarea 
               className="textarea textarea-bordered h-20 bg-base-200/20 focus:textarea-primary" 
               placeholder="Indicar si posee alguna condición de salud especial..."
            ></textarea>
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
            <FiPlusCircle /> Registrar Habitante
          </button>
        </div>
      </div>
      <div className="modal-backdrop bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
    </div>
  );
};

export default CreateResidentModal;
