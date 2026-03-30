import { FiX, FiUploadCloud } from "react-icons/fi";

const UploadDocumentModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box max-w-lg bg-base-100 p-0 overflow-hidden border border-base-200 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-base-200 bg-base-200/30">
          <div>
            <h2 className="text-xl font-bold text-base-content">Subir Documento</h2>
            <p className="text-[10px] opacity-60 uppercase tracking-widest font-bold font-mono">Archivo Digital Comunitario</p>
          </div>
          <button
            onClick={onClose}
            className="btn btn-ghost btn-sm btn-circle text-base-content/50 hover:text-error transition-colors"
          >
            <FiX size={20} />
          </button>
        </div>

        {/* Dropzone */}
        <div className="px-6 pt-6">
          <div className="border-2 border-dashed border-base-300 rounded-2xl p-10 flex flex-col items-center justify-center gap-3 hover:border-primary/50 hover:bg-primary/5 transition-all cursor-pointer group">
             <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <FiUploadCloud className="text-primary text-3xl" />
             </div>
             <div className="text-center">
                <p className="font-bold text-sm">Haz click o arrastra un archivo</p>
                <p className="text-[10px] opacity-40 mt-1">Soporta PDF, JPG, PNG, DOCX hasta 15MB</p>
             </div>
          </div>
        </div>

        {/* Form Fields */}
        <div className="p-6 space-y-4">
          <div className="form-control w-full">
            <label className="label py-1">
              <span className="label-text font-bold text-[10px] uppercase opacity-60 tracking-wider">Nombre del Documento</span>
            </label>
            <input
              type="text"
              placeholder="Ej: Acta de Asamblea 01-2024"
              className="input input-bordered w-full focus:input-primary transition-all bg-base-200/20"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="form-control w-full">
              <label className="label py-1">
                <span className="label-text font-bold text-[10px] uppercase opacity-60 tracking-wider">Categoría</span>
              </label>
              <select className="select select-bordered w-full focus:select-primary bg-base-200/20">
                <option disabled selected>Seleccionar</option>
                <option>Legal</option>
                <option>Proyectos</option>
                <option>Identidad</option>
                <option>Finanzas</option>
                <option>Otros</option>
              </select>
            </div>
            <div className="form-control w-full">
              <label className="label py-1">
                <span className="label-text font-bold text-[10px] uppercase opacity-60 tracking-wider">Fecha de Emisión</span>
              </label>
              <input
                type="date"
                className="input input-bordered w-full focus:input-primary bg-base-200/20"
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="modal-action px-6 py-4 border-t border-base-200 bg-base-200/30 mt-0 gap-3">
          <button
            onClick={onClose}
            className="btn btn-ghost btn-sm md:btn-md capitalize font-bold"
          >
            Cancelar
          </button>
          <button className="btn btn-neutral btn-sm md:btn-md capitalize px-8 font-bold shadow-lg shadow-neutral/20">
            Cargar Archivo
          </button>
        </div>
      </div>
      <div className="modal-backdrop bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
    </div>
  );
};

export default UploadDocumentModal;
