import { FaArrowUp, FaArrowDown } from "react-icons/fa";

export default function TransactionTable({ transaction }) {
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
                {/* Tipo */}
                <td className="px-6 py-4">
                  <div className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full
                    ${mov.tipo === "ingreso"
                      ? "bg-success/10 text-success"
                      : "bg-error/10 text-error"
                    }`}
                  >
                    {mov.tipo === "ingreso"
                      ? <FaArrowUp className="text-[10px]" />
                      : <FaArrowDown className="text-[10px]" />
                    }
                    {mov.tipo.charAt(0).toUpperCase() + mov.tipo.slice(1)}
                  </div>
                </td>

                {/* Descripción */}
                <td className="px-6 py-4 text-base-content/80">{mov.descripcion}</td>

                {/* Fecha */}
                <td className="px-6 py-4 text-base-content/50">
                  {new Date(mov.fecha).toLocaleDateString("es-ES", {
                    day: "2-digit", month: "short", year: "numeric"
                  })}
                </td>

                {/* amount */}
                <td className={`px-6 py-4 text-right font-medium
                  ${mov.tipo === "ingreso" ? "text-success" : "text-error"}`}
                >
                  {mov.tipo === "ingreso" ? "+" : "-"}${mov.amount.toFixed(2)}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

    </div>
  );
}