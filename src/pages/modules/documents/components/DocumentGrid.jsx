import { FaFilePdf, FaFileImage, FaFileWord, FaEllipsisV, FaDownload, FaShareAlt } from "react-icons/fa";

const MOCK_DOCUMENTS = [
  { id: 1, name: "Reglamento Interno CC.pdf", size: "1.2 MB", type: "pdf", category: "Legal", date: "20/03/2024" },
  { id: 2, name: "Mapa del Sector 1.jpg", size: "4.5 MB", type: "image", category: "Cartografía", date: "15/03/2024" },
  { id: 3, name: "Plan de Inversión 2024.docx", size: "850 KB", type: "word", category: "Proyectos", date: "10/03/2024" },
  { id: 4, name: "Acta Constitutiva.pdf", size: "2.1 MB", type: "pdf", category: "Legal", date: "05/03/2024" },
  { id: 5, name: "Censo Viviendas 2023.xlsx", size: "3.2 MB", type: "excel", category: "Habitantes", date: "01/03/2024" },
  { id: 6, name: "Foto Jornada CLAP.png", size: "5.8 MB", type: "image", category: "Eventos", date: "28/02/2024" },
];

const DocumentGrid = () => {
  const getIcon = (type) => {
    switch (type) {
      case "pdf": return <FaFilePdf className="text-error" />;
      case "image": return <FaFileImage className="text-info" />;
      case "word": return <FaFileWord className="text-primary" />;
      default: return <FaFilePdf className="opacity-40" />;
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {MOCK_DOCUMENTS.map((doc) => (
        <div key={doc.id} className="card bg-base-100 border border-base-200 shadow-sm hover:shadow-md transition-all group">
          <div className="card-body p-4">
            <div className="flex justify-between items-start">
              <div className="text-3xl p-2 bg-base-200/50 rounded-lg group-hover:scale-110 transition-transform">
                {getIcon(doc.type)}
              </div>
              <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-ghost btn-xs btn-circle"><FaEllipsisV className="opacity-40" /></label>
                <ul tabIndex={0} className="dropdown-content z-1 menu p-2 shadow bg-base-100 rounded-box w-40 border border-base-200">
                  <li><a className="gap-2"><FaDownload size={12} /> Descargar</a></li>
                  <li><a className="gap-2"><FaShareAlt size={12} /> Compartir</a></li>
                  <li><a className="text-error gap-2">Eliminar</a></li>
                </ul>
              </div>
            </div>
            
            <div className="mt-3">
              <h4 className="font-bold text-sm truncate" title={doc.name}>{doc.name}</h4>
              <div className="flex justify-between items-center mt-1">
                <span className="text-[10px] opacity-50 font-bold uppercase tracking-tighter">{doc.category}</span>
                <span className="text-[10px] opacity-40 italic">{doc.size}</span>
              </div>
            </div>
            
            <div className="divider my-1 opacity-20"></div>
            
            <p className="text-[10px] opacity-40 text-center uppercase font-bold tracking-widest">
              Subido el {doc.date}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DocumentGrid;
