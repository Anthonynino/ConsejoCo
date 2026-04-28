import { useState } from "react";
import { FaPlus, FaFolderOpen, FaSearch, FaFilter } from "react-icons/fa";
import DocumentStats from "./components/DocumentStats";
import DocumentGrid from "./components/DocumentGrid";
import UploadDocumentModal from "./components/UploadDocumentModal";

const DocumentPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("Todos");

  const categories = [
    "Todos",
    "Legal",
    "Proyectos",
    "Identidad",
    "Finanzas",
    "Otros",
  ];

  return (
    <div className="w-full space-y-8 p-6 mx-auto animate-in fade-in duration-700">
      <UploadDocumentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 overflow-hidden">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold text-base-content tracking-tight">
            Documentos
          </h2>

          <p className="text-sm text-base-content/60 max-w-xl">
            Gestión y almacenamiento de la documentación oficial del consejo
            comunal.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="btn btn-neutral shadow-xl hover:shadow-neutral/20 transition-all font-bold gap-2 btn-sm md:btn-md"
        >
          <FaPlus /> <span className="hidden sm:inline">Subir Documento</span>
        </button>
      </div>

      {/* Stats Dashboard */}
      <DocumentStats />

      {/* Navigation & Controls */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between border-y border-base-200 py-4">
        <div className="flex gap-2 w-full md:w-auto">
          <div className="relative w-full md:w-80">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 opacity-30 h-3.5 w-3.5" />
            <input
              type="text"
              placeholder="Buscar archivos..."
              className="input input-bordered input-sm w-full pl-9 focus:input-primary transition-all bg-base-200/20"
            />
          </div>
          <button className="btn btn-square btn-bordered btn-sm opacity-60 hover:opacity-100">
            <FaFilter />
          </button>
        </div>

        <div className="flex gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`btn btn-xs rounded-full whitespace-nowrap transition-all ${activeCategory === cat ? "btn-neutral px-4" : "btn-ghost opacity-60 hover:opacity-100"}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Documents Grid Section */}
      <div className="space-y-4">
        <DocumentGrid />
      </div>

      {/* Mock storage visualizer (optional nice-to-have visual) */}
      <div className="bg-base-200/50 p-4 rounded-xl border border-base-200">
        <div className="flex justify-between items-center text-[10px] font-bold uppercase opacity-60 mb-2">
          <span>Almacenamiento del Consejo</span>
          <span>1.2 GB / 2.0 GB</span>
        </div>
        <progress
          className="progress progress-primary w-full h-2 rounded-full"
          value="60"
          max="100"
        ></progress>
      </div>
    </div>
  );
};

export default DocumentPage;
