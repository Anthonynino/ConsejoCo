import { FaArrowUp, FaArrowDown, FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function TransactionTable({ transaction, page, totalPages, onPageChange }) {
  return (
    <div className="border border-base-200 rounded-xl overflow-hidden">

      {/* Encabezado */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-base-200">
        <span className="text-sm font-medium text-base-content/60">
          Historial de movimientos
        </span>
        <span className="text-xs text-base-content/40">
          {transaction.length} registros
        </span>
      </div>

      {/* Tabla */}
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-base-200 bg-base-200/30">
            <th className="text-left px-6 py-3 text-xs font-medium text-base-content/50 uppercase tracking-wide">Tipo</th>
            <th className="text-left px-6 py-3 text-xs font-medium text-base-content/50 uppercase tracking-wide">Descripción</th>
            <th className="text-left px-6 py-3 text-xs font-medium text-base-content/50 uppercase tracking-wide">Fecha</th>
            <th className="text-right px-6 py-3 text-xs font-medium text-base-content/50 uppercase tracking-wide">Monto</th>
          </tr>
        </thead>
        <tbody>
          {transaction.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center py-6 text-base-content/50">
                No se encontraron movimientos
              </td>
            </tr>
          ) : (
            transaction.map((mov, idx) => (
              <tr
                key={mov.id}
                className={`border-b border-base-200 hover:bg-base-200/20 transition-colors ${idx === transaction.length - 1 ? "border-none" : ""}`}
              >
                <td className="px-6 py-4">
                  <div className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full
                    ${mov.tipo === "INGRESO" ? "bg-success/10 text-success" : "bg-error/10 text-error"}`}
                  >
                    {mov.tipo === "INGRESO"
                      ? <FaArrowUp className="text-[10px]" />
                      : <FaArrowDown className="text-[10px]" />
                    }
                    {mov.tipo.charAt(0).toUpperCase() + mov.tipo.slice(1).toLowerCase()}
                  </div>
                </td>
                <td className="px-6 py-4 text-base-content/80">{mov.descripcion}</td>
                <td className="px-6 py-4 text-base-content/50">
                  {new Date(mov.fecha).toLocaleDateString("es-ES", {
                    day: "2-digit", month: "short", year: "numeric"
                  })}
                </td>
                <td className={`px-6 py-4 text-right font-medium ${mov.tipo === "INGRESO" ? "text-success" : "text-error"}`}>
                  {mov.tipo === "INGRESO" ? "+" : "-"}${Number(mov.monto).toFixed(2)}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Paginación */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between px-6 py-4 border-t border-base-200">
          <span className="text-xs text-base-content/40">
            Página {page} de {totalPages}
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => onPageChange(page - 1)}
              disabled={page === 1}
              className="p-2 rounded-lg border border-base-200 text-base-content/50 hover:bg-base-200/50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <FaChevronLeft className="text-xs" />
            </button>
            <button
              onClick={() => onPageChange(page + 1)}
              disabled={page === totalPages}
              className="p-2 rounded-lg border border-base-200 text-base-content/50 hover:bg-base-200/50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <FaChevronRight className="text-xs" />
            </button>
          </div>
        </div>
      )}

    </div>
  );
}