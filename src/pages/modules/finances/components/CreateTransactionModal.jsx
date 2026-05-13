import { FaTimes } from "react-icons/fa";
import CustomInput from "../../../../components/CustomInput";

export default function CreateTransactionModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">

      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-base-100 border border-base-200 rounded-xl w-full max-w-md mx-4 shadow-xl">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-base-200">
          <div>
            <h2 className="text-base font-semibold text-base-content">Nuevo movimiento</h2>
            <p className="text-xs text-base-content/50 mt-0.5">Registra un ingreso o egreso</p>
          </div>
          <button
            onClick={onClose}
            className="text-base-content/40 hover:text-base-content transition-colors p-1"
          >
            <FaTimes />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-4">

          {/* Tipo */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-base-content/50 uppercase tracking-wide">
              Tipo
            </label>
            <div className="flex gap-3">
              <button className="flex-1 py-2.5 rounded-lg border border-success/40 bg-success/10 text-success text-sm font-medium">
                Ingreso
              </button>
              <button className="flex-1 py-2.5 rounded-lg border border-base-200 text-base-content/50 text-sm font-medium hover:border-error/40 hover:bg-error/10 hover:text-error transition-colors">
                Egreso
              </button>
            </div>
          </div>

          <CustomInput label="Descripción" placeholder="Ej. Aporte vecinos sector A" />
          <CustomInput label="Monto" placeholder="Ej. 150.00" />
          <CustomInput label="Fecha" placeholder="dd/mm/aaaa" />

        </div>

        {/* Footer */}
        <div className="flex gap-3 px-6 py-4 border-t border-base-200">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-lg border border-base-200 text-sm text-base-content/60 hover:bg-base-200/50 transition-colors"
          >
            Cancelar
          </button>
          <button className="flex-1 py-2.5 rounded-lg bg-primary text-primary-content text-sm font-medium hover:opacity-90 transition-opacity">
            Registrar
          </button>
        </div>

      </div>
    </div>
  );
}