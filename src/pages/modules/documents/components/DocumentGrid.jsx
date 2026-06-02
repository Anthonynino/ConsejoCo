import { FaFilePdf, FaFileImage, FaFileWord, FaFileExcel, FaEllipsisV, FaDownload, FaShareAlt } from "react-icons/fa";

const DocumentGrid = ({ documents = [], onEdit, onDelete }) => {
  const getIcon = (tipoArchivo) => {
    if (tipoArchivo?.includes("excel") || tipoArchivo?.includes("spreadsheet")) return <FaFileExcel className="text-success" />;
    if (tipoArchivo?.includes("pdf")) return <FaFilePdf className="text-error" />;
    if (tipoArchivo?.includes("image")) return <FaFileImage className="text-info" />;
    if (tipoArchivo?.includes("word") || tipoArchivo?.includes("wordprocessingml")) return <FaFileWord className="text-primary" />;
    return <FaFilePdf className="opacity-40" />;
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("es-ES", { day: "2-digit", month: "2-digit", year: "numeric" });
  };

  const formatSize = (tamanoMb) => {
    if (!tamanoMb || tamanoMb === "0") return "< 1 MB";
    return `${tamanoMb} MB`;
  };

  const handleDownload = (archivoUrl) => {
    const apiUrl = import.meta.env.VITE_API_URL_DOWNLOAD ?? 'http://localhost:3000';
    const fullUrl = `${apiUrl}${archivoUrl}`;
    window.open(fullUrl, '_blank');
  };

  const handleDelete = (doc) => {
    if (onDelete) {
      onDelete(doc);
    }
  };

  if (documents.length === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {documents.map((doc) => (
        <div key={doc.id} className="card bg-base-100 border border-base-200 shadow-sm hover:shadow-md transition-all group">
          <div className="card-body p-4">
            <div className="flex justify-between items-start">
              <div className="text-3xl p-2 bg-base-200/50 rounded-lg group-hover:scale-110 transition-transform">
                {getIcon(doc.tipoArchivo)}
              </div>
              <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-ghost btn-xs btn-circle"><FaEllipsisV className="opacity-40" /></label>
                <ul tabIndex={0} className="dropdown-content z-1 menu p-2 shadow bg-base-100 rounded-box w-40 border border-base-200">
                  <li><a onClick={() => handleDownload(doc.archivoUrl)} className="gap-2"><FaDownload size={12} /> Descargar</a></li>
                  {onEdit && <li><a onClick={() => onEdit(doc)} className="gap-2">Editar</a></li>}
                  {onDelete && <li><a onClick={() => handleDelete(doc)} className="text-error gap-2">Eliminar</a></li>}
                </ul>
              </div>
            </div>
            
            <div className="mt-3">
              <h4 className="font-bold text-sm truncate" title={doc.nombre}>{doc.nombre}</h4>
              <div className="flex justify-between items-center mt-1">
                <span className="text-[10px] opacity-50 font-bold uppercase tracking-tighter">{doc.categoria}</span>
                <span className="text-[10px] opacity-40 italic">{formatSize(doc.tamanoMb)}</span>
              </div>
            </div>
            
            <div className="divider my-1 opacity-20"></div>
            
            <p className="text-[10px] opacity-40 text-center uppercase font-bold tracking-widest">
              Subido el {formatDate(doc.fechaCreacion)}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DocumentGrid;
