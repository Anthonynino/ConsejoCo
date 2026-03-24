import { FiX, FiUpload } from "react-icons/fi";

const CreateMemberModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box max-w-md bg-base-100 p-0 overflow-hidden border border-base-200 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-base-200 bg-base-200/30">
          <h2 className="text-xl font-bold text-base-content">Nuevo miembro</h2>
          <button
            onClick={onClose}
            className="btn btn-ghost btn-sm btn-circle text-base-content/50 hover:text-error transition-colors"
          >
            <FiX size={20} />
          </button>
        </div>

        {/* Formulario */}
        <div className="p-6 space-y-5">
          <div className="form-control w-full">
            <label className="label py-1">
              <span className="label-text font-bold text-[10px] uppercase opacity-60 tracking-wider">
                Nombre completo
              </span>
            </label>
            <input
              type="text"
              placeholder="Ej: Laura Martínez"
              className="input input-bordered w-full focus:input-primary transition-all bg-base-200/20"
            />
          </div>

          <div className="form-control w-full">
            <label className="label py-1">
              <span className="label-text font-bold text-[10px] uppercase opacity-60 tracking-wider">
                Cédula / ID
              </span>
            </label>
            <input
              type="text"
              placeholder="Ej: V-12.345.678"
              className="input input-bordered w-full focus:input-primary transition-all bg-base-200/20"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="form-control w-full">
              <label className="label py-1">
                <span className="label-text font-bold text-[10px] uppercase opacity-60 tracking-wider">
                  Teléfono
                </span>
              </label>
              <input
                type="tel"
                placeholder="0414-123-4567"
                className="input input-bordered w-full focus:input-primary transition-all bg-base-200/20"
              />
            </div>

            <div className="form-control w-full">
              <label className="label py-1">
                <span className="label-text font-bold text-[10px] uppercase opacity-60 tracking-wider">
                  Correo
                </span>
              </label>
              <input
                type="email"
                placeholder="correo@ejemplo.com"
                className="input input-bordered w-full focus:input-primary transition-all bg-base-200/20"
              />
            </div>
          </div>

          <div className="form-control w-full">
            <label className="label py-1">
              <span className="label-text font-bold text-[10px] uppercase opacity-60 tracking-wider">
                Cargo / Puesto
              </span>
            </label>
            <input
              type="text"
              placeholder="Ej: Coordinador"
              className="input input-bordered w-full focus:input-primary transition-all bg-base-200/20"
            />
          </div>

          <div className="form-control w-full mt-2">
            <label className="label py-1">
              <span className="label-text font-bold text-[10px] uppercase opacity-60 tracking-wider">
                Foto de perfil
              </span>
            </label>
            <div className="group border-2 border-dashed border-base-300 rounded-xl p-8 flex flex-col items-center justify-center gap-3 hover:border-primary/50 hover:bg-primary/5 transition-all cursor-pointer">
              <FiUpload size={24} className="text-base-content/30 group-hover:text-primary transition-colors" />
              <div className="text-center">
                <p className="text-xs font-bold text-base-content/70">Haz click para subir</p>
                <p className="text-[10px] opacity-50 mt-1">PNG, JPG hasta 2MB</p>
              </div>
              <input type="file" accept="image/*" className="hidden" />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="modal-action px-6 py-4 border-t border-base-200 bg-base-200/30 mt-0 gap-3">
          <button
            onClick={onClose}
            className="btn btn-ghost btn-sm md:btn-md capitalize font-bold"
          >
            Cancelar
          </button>
          <button className="btn btn-neutral btn-sm md:btn-md capitalize px-8 font-bold shadow-lg shadow-neutral/20">
            Guardar Miembro
          </button>
        </div>
      </div>
      <div className="modal-backdrop bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
    </div>
  );
};


export default CreateMemberModal;
