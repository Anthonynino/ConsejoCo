import { FiX } from "react-icons/fi";

const InventoryEntryModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box max-w-lg bg-base-100 p-0 overflow-hidden border border-base-200 shadow-2xl">
        <div className="flex items-center justify-between px-6 py-4 border-b border-base-200 bg-base-200/30">
          <h2 className="text-xl font-bold text-base-content">Registrar Entrada Masiva</h2>
          <button
            onClick={onClose}
            className="btn btn-ghost btn-sm btn-circle text-base-content/50 hover:text-error transition-colors"
          >
            <FiX size={20} />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div className="alert alert-info py-2 rounded-lg text-xs">
            <span>Se recomienda cargar productos por lote recibido.</span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="form-control w-full">
              <label className="label py-1">
                <span className="label-text font-bold text-[10px] uppercase opacity-60 tracking-wider">Producto</span>
              </label>
              <select className="select select-bordered w-full focus:select-primary bg-base-200/20">
                <option disabled selected>Seleccionar rubro</option>
                <option>Arroz</option>
                <option>Harina de Maíz</option>
                <option>Aceite vegetal</option>
                <option>Leche en polvo</option>
              </select>
            </div>
            <div className="form-control w-full">
              <label className="label py-1">
                <span className="label-text font-bold text-[10px] uppercase opacity-60 tracking-wider">Cantidad Recibida</span>
              </label>
              <input
                type="number"
                placeholder="0.00"
                className="input input-bordered w-full focus:input-primary bg-base-200/20"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="form-control w-full">
              <label className="label py-1">
                <span className="label-text font-bold text-[10px] uppercase opacity-60 tracking-wider">Nro de Lote</span>
              </label>
              <input
                type="text"
                placeholder="Ej: L-102-23"
                className="input input-bordered w-full focus:input-primary bg-base-200/20"
              />
            </div>
            <div className="form-control w-full">
              <label className="label py-1">
                <span className="label-text font-bold text-[10px] uppercase opacity-60 tracking-wider">Fecha de Vencimiento</span>
              </label>
              <input
                type="date"
                className="input input-bordered w-full focus:input-primary bg-base-200/20"
              />
            </div>
          </div>

          <div className="form-control w-full">
            <label className="label py-1">
              <span className="label-text font-bold text-[10px] uppercase opacity-60 tracking-wider">Notas adicionales</span>
            </label>
            <textarea 
              className="textarea textarea-bordered h-20 bg-base-200/20 focus:textarea-primary" 
              placeholder="Detalles sobre el estado del envío..."
            ></textarea>
          </div>
        </div>

        <div className="modal-action px-6 py-4 border-t border-base-200 bg-base-200/30 mt-0 gap-3">
          <button onClick={onClose} className="btn btn-ghost btn-sm md:btn-md capitalize font-bold">Cancelar</button>
          <button className="btn btn-neutral btn-sm md:btn-md capitalize px-8 font-bold shadow-lg shadow-neutral/20">Procesar Entrada</button>
        </div>
      </div>
      <div className="modal-backdrop bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
    </div>
  );
};

export default InventoryEntryModal;
