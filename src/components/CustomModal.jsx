import { AiOutlineClose } from "react-icons/ai";

function CustomModal({ isOpen, onClose, children, widthClass, title, subtitle, actionText = "Aceptar", onAction }) {
  if (!isOpen) return null;
  return (
    <div className="modal modal-open">
      <div
        className={`modal-box ${widthClass} bg-base-100 p-0 overflow-hidden border border-base-200 shadow-2xl`}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-base-200 bg-base-200/30">
          <div>
            <h2 className="text-xl font-bold text-base-content">{title}</h2>
            <p className="text-[10px] opacity-60 uppercase tracking-widest font-bold">{subtitle}</p>
          </div>
          <button
            onClick={onClose}
            className="btn btn-ghost btn-sm btn-circle text-base-content/50 hover:text-error transition-colors"
          >
            <AiOutlineClose size={20} />
          </button>
        </div>

        <div className="p-6">{children}</div>

        <div className="modal-action px-6 py-4 border-t border-base-200 bg-base-200/30 mt-0 gap-3">
          <button
            onClick={onClose}
            className="btn btn-ghost btn-sm md:btn-md capitalize font-bold"
          >
            Cancelar
          </button>
          <button
            onClick={onAction}
            className="btn btn-neutral btn-sm md:btn-md capitalize font-bold shadow-lg shadow-neutral/20"
          >
            {actionText}
          </button>
        </div>
      </div>
      <div
        className="modal-backdrop bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      ></div>
    </div>
  );
}

export default CustomModal;
