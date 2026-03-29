import { FiX } from "react-icons/fi";

const ProductModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box max-w-md bg-base-100 p-0 overflow-hidden border border-base-200 shadow-2xl">
        <div className="flex items-center justify-between px-6 py-4 border-b border-base-200 bg-base-200/30">
          <h2 className="text-xl font-bold text-base-content">Nuevo Producto</h2>
          <button
            onClick={onClose}
            className="btn btn-ghost btn-sm btn-circle text-base-content/50 hover:text-error transition-colors"
          >
            <FiX size={20} />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div className="form-control w-full">
            <label className="label py-1">
              <span className="label-text font-bold text-[10px] uppercase opacity-60 tracking-wider">Nombre del Producto</span>
            </label>
            <input
              type="text"
              placeholder="Ej: Arroz Blanco"
              className="input input-bordered w-full focus:input-primary bg-base-200/20"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="form-control w-full">
              <label className="label py-1">
                <span className="label-text font-bold text-[10px] uppercase opacity-60 tracking-wider">Categoría</span>
              </label>
              <select className="select select-bordered w-full focus:select-primary bg-base-200/20">
                <option disabled selected>Seleccionar</option>
                <option>Granos</option>
                <option>Harinas</option>
                <option>Aceites</option>
                <option>Lácteos</option>
                <option>Proteína</option>
                <option>Otros</option>
              </select>
            </div>
            <div className="form-control w-full">
              <label className="label py-1">
                <span className="label-text font-bold text-[10px] uppercase opacity-60 tracking-wider">Unidad de Medida</span>
              </label>
              <input
                type="text"
                placeholder="Ej: kg, L, ud"
                className="input input-bordered w-full focus:input-primary bg-base-200/20"
              />
            </div>
          </div>

          <div className="form-control w-full">
            <label className="label py-1">
              <span className="label-text font-bold text-[10px] uppercase opacity-60 tracking-wider">Proveedor Predeterminado</span>
            </label>
            <select className="select select-bordered w-full focus:select-primary bg-base-200/20">
              <option disabled selected>Seleccionar Fuente</option>
              <option>Gubernamental</option>
              <option>Compra Local</option>
              <option>Donación</option>
              <option>Otro</option>
            </select>
          </div>
        </div>

        <div className="modal-action px-6 py-4 border-t border-base-200 bg-base-200/30 mt-0 gap-3">
          <button onClick={onClose} className="btn btn-ghost btn-sm md:btn-md capitalize font-bold">Cancelar</button>
          <button className="btn btn-neutral btn-sm md:btn-md capitalize px-8 font-bold shadow-lg shadow-neutral/20">Guardar Producto</button>
        </div>
      </div>
      <div className="modal-backdrop bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
    </div>
  );
};

export default ProductModal;
