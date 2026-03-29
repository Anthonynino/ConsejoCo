import { FiX, FiSearch } from "react-icons/fi";

const RegisterBeneficiaryModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box max-w-lg bg-base-100 p-0 overflow-hidden border border-base-200 shadow-2xl">
        <div className="flex items-center justify-between px-6 py-4 border-b border-base-200 bg-base-200/30">
          <div>
            <h2 className="text-xl font-bold text-base-content">Vincular Jefe de Familia</h2>
            <p className="text-[10px] opacity-60">Selecciona un habitante registrado</p>
          </div>
          <button
            onClick={onClose}
            className="btn btn-ghost btn-sm btn-circle text-base-content/50 hover:text-error transition-colors"
          >
            <FiX size={20} />
          </button>
        </div>

        <div className="p-6 space-y-5">
          <div className="form-control w-full">
            <label className="label py-1">
              <span className="label-text font-bold text-[10px] uppercase opacity-60 tracking-wider">Buscar Habitante</span>
            </label>
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 opacity-40" />
              <input
                type="text"
                placeholder="Nombre o Cédula..."
                className="input input-bordered w-full pl-10 focus:input-primary bg-base-200/20"
              />
            </div>
            <div className="mt-2 text-[10px] opacity-50 px-1 italic">
              * Solo aparecerán habitantes que NO estén vinculados a otro grupo familiar.
            </div>
          </div>

          <div className="bg-base-200/30 rounded-lg p-3 max-h-40 overflow-y-auto border border-base-200 space-y-2">
            {/* Mocked Search Results */}
            <div className="flex items-center justify-between p-2 hover:bg-base-100 rounded-md cursor-pointer transition-colors border border-transparent hover:border-base-300">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-violet-100 text-violet-700 flex items-center justify-center text-xs font-bold">AF</div>
                <div>
                  <p className="text-sm font-bold">Ana Figueroa</p>
                  <p className="text-[10px] opacity-50 italic">V-22.456.789</p>
                </div>
              </div>
              <button className="btn btn-xs btn-outline btn-primary">Seleccionar</button>
            </div>
            <div className="flex items-center justify-between p-2 hover:bg-base-100 rounded-md cursor-pointer transition-colors border border-transparent hover:border-base-300">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-cyan-100 text-cyan-700 flex items-center justify-center text-xs font-bold">JT</div>
                <div>
                  <p className="text-sm font-bold">Jorge Tovar</p>
                  <p className="text-[10px] opacity-50 italic">V-17.852.963</p>
                </div>
              </div>
              <button className="btn btn-xs btn-outline btn-primary">Seleccionar</button>
            </div>
          </div>

          <div className="divider my-0 opacity-10"></div>

          <div className="grid grid-cols-2 gap-4">
             <div className="form-control w-full">
              <label className="label py-1">
                <span className="label-text font-bold text-[10px] uppercase opacity-60 tracking-wider">Nro de Integrantes</span>
              </label>
              <input
                type="number"
                placeholder="Ej: 4"
                className="input input-bordered w-full focus:input-primary bg-base-200/20"
              />
            </div>
            <div className="form-control w-full">
              <label className="label py-1">
                <span className="label-text font-bold text-[10px] uppercase opacity-60 tracking-wider">Código de Carnet</span>
              </label>
              <input
                type="text"
                placeholder="Opcional"
                className="input input-bordered w-full focus:input-primary bg-base-200/20"
              />
            </div>
          </div>
        </div>

        <div className="modal-action px-6 py-4 border-t border-base-200 bg-base-200/30 mt-0 gap-3">
          <button onClick={onClose} className="btn btn-ghost btn-sm md:btn-md capitalize font-bold">Cancelar</button>
          <button className="btn btn-neutral btn-sm md:btn-md capitalize px-8 font-bold shadow-lg shadow-neutral/20">Registrar Beneficiario</button>
        </div>
      </div>
      <div className="modal-backdrop bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
    </div>
  );
};

export default RegisterBeneficiaryModal;
