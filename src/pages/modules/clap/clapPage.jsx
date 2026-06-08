import { useState, useEffect } from "react";
import HeaderModules from "../../../components/HeaderModules";
import { toast } from "react-toastify";
import { 
  FaSearch, 
  FaCalendarAlt, 
  FaUsers, 
  FaCheckCircle, 
  FaClock, 
  FaFileExcel, 
  FaArrowLeft,
  FaCheck,
  FaTrash
} from "react-icons/fa";
import CustomInput from "../../../components/CustomInput";
import { createCensus, getCensuses, updateCensus } from "../../../services/censuses";

const MOCK_FAMILIES = [
  { id: 1, cedula: "V-12.345.678", nombres: "Juan", apellidos: "Pérez" },
  { id: 2, cedula: "V-23.456.789", nombres: "María", apellidos: "García" },
  { id: 3, cedula: "V-34.567.890", nombres: "Pedro", apellidos: "Rodríguez" },
  { id: 4, cedula: "V-45.678.901", nombres: "Ana", apellidos: "Martínez" },
  { id: 5, cedula: "V-56.789.012", nombres: "Luis", apellidos: "Sánchez" },
  { id: 6, cedula: "V-67.890.123", nombres: "Laura", apellidos: "Torres" },
  { id: 7, cedula: "V-78.901.234", nombres: "Carlos", apellidos: "Díaz" },
  { id: 8, cedula: "V-89.012.345", nombres: "Elena", apellidos: "Morales" },
];

const mapApiCensusToState = (censo) => ({
  id: censo.id,
  fechaInicio: censo.fecha ? censo.fecha.split("T")[0] : "",
  totalFamilias: censo._count?.familias ?? censo.familias?.length ?? 0,
  fechaCreacion: censo.fechaCreacion ? censo.fechaCreacion.split("T")[0] : "",
  estado: censo.estado === "EN_ESPERA" ? "pendiente" : censo.estado === "FINALIZADO" ? "finalizado" : censo.estado?.toLowerCase() ?? "pendiente",
  familias: censo.familias?.map((item) => item.familiaId ?? item.id) ?? [],
  entregas: {},
});

const ClapPage = () => {
  const [view, setView] = useState("LIST"); // LIST, FORM, DELIVERY
  const [censuses, setCensuses] = useState([]);
  const [selectedCensus, setSelectedCensus] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  
  // States for the creation/edit form
  const [formSelectedFamilies, setFormSelectedFamilies] = useState([]);
  const [fechaInicio, setFechaInicio] = useState("");

  useEffect(() => {
    const fetchCensuses = async () => {
      try {
        const response = await getCensuses(1);
        const payload = response?.data ?? response;
        const censusList = Array.isArray(payload)
          ? payload
          : payload?.data ?? [];
        const censusesFromApi = censusList.map(mapApiCensusToState);
        setCensuses(censusesFromApi);
      } catch (error) {
        console.error("Error fetching censuses:", error);
        toast.error("Error al cargar los censos");
      }
    };

    fetchCensuses();
  }, []);

  const handleCreateNew = () => {
    setSelectedCensus(null);
    setFormSelectedFamilies([]);
    setFechaInicio("");
    setView("FORM");
  };

  const handleEditCensus = (census) => {
    setSelectedCensus(census);
    setFormSelectedFamilies(census.familias);
    setFechaInicio(census.fechaInicio);
    setView("FORM");
  };

  const handleStartDelivery = (census) => {
    setSelectedCensus(census);
    setView("DELIVERY");
  };

  const toggleFamilySelection = (familyId) => {
    setFormSelectedFamilies(prev => 
      prev.includes(familyId) 
        ? prev.filter(id => id !== familyId)
        : [...prev, familyId]
    );
  };

  const handleSaveCensus = async () => {
    if (formSelectedFamilies.length === 0) {
      toast.error("Debe seleccionar al menos una familia");
      return;
    }
    if (!fechaInicio) {
      toast.error("Debe seleccionar una fecha de inicio");
      return;
    }

    setIsSaving(true);
    try {
      if (selectedCensus) {
        const payload = {
          fecha: fechaInicio,
          fechaCierre: selectedCensus.fechaCierre || null,
          estado: selectedCensus.estado === "finalizado" ? "FINALIZADO" : "EN_ESPERA"
        };

        const updatedCensus = await updateCensus(selectedCensus.id, payload);
        const updatedPayload = updatedCensus?.data ?? updatedCensus;
        const updatedState = mapApiCensusToState(updatedPayload);

        setCensuses(prev => prev.map(c => c.id === selectedCensus.id ? {
          ...c,
          ...updatedState,
          familias: formSelectedFamilies,
          entregas: c.entregas
        } : c));

        toast.success("Censo actualizado correctamente");
      } else {
        const payload = {
          fecha: fechaInicio,
          consejoComunalId: 1,
          familiaIds: formSelectedFamilies,
        };

        const createdCensus = await createCensus(payload);
        const createdPayload = createdCensus?.data ?? createdCensus;
        const createdState = mapApiCensusToState(createdPayload);
        const newCensus = {
          ...createdState,
          familias: formSelectedFamilies,
          entregas: {},
        };

        setCensuses(prev => [newCensus, ...prev]);
        toast.success("Censo creado correctamente");
      }
      setView("LIST");
    } catch (error) {
      console.error("Error saving census:", error);
      toast.error("Error al guardar el censo");
    } finally {
      setIsSaving(false);
    }
  };

  const toggleDeliveryStatus = (familyId) => {
    setSelectedCensus(prev => ({
      ...prev,
      entregas: {
        ...prev.entregas,
        [familyId]: !prev.entregas[familyId]
      }
    }));
  };

  const handleFinishDelivery = async () => {
    if (!selectedCensus) return;

    setIsSaving(true);
    try {
      const payload = {
        fecha: selectedCensus.fechaInicio,
        fechaCierre: new Date().toISOString().split('T')[0],
        estado: "EN_ESPERA"
      };

      const updatedCensus = await updateCensus(selectedCensus.id, payload);
      const updatedPayload = updatedCensus?.data ?? updatedCensus;
      const updatedState = mapApiCensusToState(updatedPayload);

      setCensuses(prev => prev.map(c => c.id === selectedCensus.id ? {
        ...c,
        ...updatedState,
        entregas: selectedCensus.entregas
      } : c));

      toast.success("¡Jornada de entrega finalizada con éxito!");
      setView("LIST");
    } catch (error) {
      console.error("Error finishing delivery:", error);
      toast.error("Error al finalizar la jornada de entrega");
    } finally {
      setIsSaving(false);
    }
  };

  const filteredFamilies = MOCK_FAMILIES.filter(f => 
    f.nombres.toLowerCase().includes(searchTerm.toLowerCase()) ||
    f.apellidos.toLowerCase().includes(searchTerm.toLowerCase()) ||
    f.cedula.includes(searchTerm)
  );

  return (
    <div className="w-full space-y-6 mx-auto p-2 md:p-6 pb-20">
      {view === "LIST" && (
        <>
          <HeaderModules
            title="Gestión de Censos CLAP"
            description="Control de censos y jornadas de distribución de alimentos"
            onActionBtn={handleCreateNew}
            titleBtn="Crear Nuevo Censo"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {censuses.map((census) => (
              <div 
                key={census.id}
                onClick={() => census.estado === 'pendiente' && handleEditCensus(census)}
                className={`card bg-base-100 shadow-xl border border-base-200 hover:shadow-2xl transition-all group overflow-hidden ${census.estado === 'pendiente' ? 'cursor-pointer active:scale-95' : ''}`}
              >
                <div className={`h-2 w-full ${census.estado === 'pendiente' ? 'bg-warning' : 'bg-success'}`} />
                <div className="card-body p-5">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider opacity-60">
                        <FaCalendarAlt /> Inicio: {census.fechaInicio}
                      </div>
                      <h3 className="text-xl font-bold">Censo #{census.id.toString().slice(-4)}</h3>
                    </div>
                    <div className={`badge ${census.estado === 'pendiente' ? 'badge-warning' : 'badge-success'} badge-sm font-bold uppercase`}>
                      {census.estado}
                    </div>
                  </div>

                  <div className="divider my-2 opacity-50"></div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col">
                      <span className="text-[10px] uppercase font-bold opacity-50 flex items-center gap-1">
                        <FaUsers size={10} /> Total Familias
                      </span>
                      <span className="text-lg font-bold">{census.totalFamilias}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] uppercase font-bold opacity-50 flex items-center gap-1">
                        <FaClock size={10} /> Creado
                      </span>
                      <span className="text-sm font-medium">{census.fechaCreacion}</span>
                    </div>
                  </div>

                  <div className="card-actions justify-end mt-6 flex-wrap gap-2">
                    {census.estado === 'pendiente' ? (
                      <>
                        <button 
                          className="btn btn-primary btn-sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleStartDelivery(census);
                          }}
                        >
                          Iniciar Jornada
                        </button>
                      </>
                    ) : (
                      <button className="btn btn-outline btn-sm btn-info gap-2" onClick={(e) => e.stopPropagation()}>
                        <FaFileExcel /> Exportar Reporte
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {view === "FORM" && (
        <div className="animate-in fade-in slide-in-from-left-4 duration-500">
          <div className="flex items-center gap-4 mb-6">
            <button className="btn btn-circle btn-ghost" onClick={() => setView("LIST")}>
              <FaArrowLeft />
            </button>
            <div>
              <h2 className="text-2xl font-bold">{selectedCensus ? 'Editar Censo' : 'Nuevo Censo'}</h2>
              <p className="text-sm opacity-60">Seleccione las familias que participarán en este suministro</p>
            </div>
          </div>

          <div className="bg-base-200/50 p-6 rounded-3xl border border-base-300 space-y-6">
            <div className="max-w-xs">
              <CustomInput 
                label="Fecha de Entrega Estimada"
                type="date"
                value={fechaInicio}
                onChange={(e) => setFechaInicio(e.target.value)}
              />
            </div>

            <div className="space-y-4">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <h3 className="font-bold flex items-center gap-2">
                   Familias registradas ({formSelectedFamilies.length})
                </h3>
                <CustomInput 
                  placeholder="Buscar familia..."
                  icon={FaSearch}
                  className="w-full md:w-80"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-h-100 overflow-y-auto p-2">
                {filteredFamilies.map((family) => {
                  const isSelected = formSelectedFamilies.includes(family.id);
                  return (
                    <div 
                      key={family.id}
                      onClick={() => toggleFamilySelection(family.id)}
                      className={`cursor-pointer p-4 rounded-2xl border transition-all flex justify-between items-center ${
                        isSelected 
                          ? 'bg-primary/20 border-primary shadow-md' 
                          : 'bg-base-100 border-base-300 hover:border-primary/50'
                      }`}
                    >
                      <div>
                        <p className="font-bold">{family.nombres} {family.apellidos}</p>
                        <p className="text-xs opacity-60 font-mono italic">{family.cedula}</p>
                      </div>
                      {isSelected ? (
                        <div className="bg-primary text-primary-content rounded-full p-1">
                          <FaCheck size={12} />
                        </div>
                      ) : (
                        <div className="w-5 h-5 rounded-full border-2 border-base-300" />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <button 
                className="btn btn-primary px-8" 
                onClick={handleSaveCensus}
                disabled={isSaving}
              >
                {isSaving ? 'Guardando...' : selectedCensus ? 'Actualizar Censo' : 'Crear Censo'}
              </button>
            </div>
          </div>
        </div>
      )}

      {view === "DELIVERY" && selectedCensus && (
        <div className="animate-in zoom-in-95 duration-500">
           <div className="flex items-center gap-4 mb-6">
            <button className="btn btn-circle btn-ghost" onClick={() => setView("LIST")}>
              <FaArrowLeft />
            </button>
            <div>
              <h2 className="text-2xl font-bold text-primary">Jornada de Entrega en Curso</h2>
              <p className="text-sm opacity-60">Seleccione las familias a medida que reciban su beneficio</p>
            </div>
          </div>

          <div className="stats shadow w-full mb-8 bg-base-100 border border-base-200">
            <div className="stat">
              <div className="stat-title">Progreso de Entrega</div>
              <div className="stat-value text-primary">
                {Object.values(selectedCensus.entregas).filter(Boolean).length} / {selectedCensus.totalFamilias}
              </div>
              <div className="stat-desc">Familias beneficiadas</div>
              <progress 
                className="progress progress-primary w-full mt-2" 
                value={Object.values(selectedCensus.entregas).filter(Boolean).length} 
                max={selectedCensus.totalFamilias}
              ></progress>
            </div>
            <div className="stat place-items-end">
              <button 
                className="btn btn-success btn-lg gap-2"
                onClick={handleFinishDelivery}
                disabled={isSaving}
              >
                <FaCheckCircle /> {isSaving ? 'Procesando...' : 'Terminar Jornada'}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pb-12">
            {MOCK_FAMILIES.filter(f => selectedCensus.familias.includes(f.id)).map(family => {
              const hasReceived = selectedCensus.entregas[family.id];
              return (
                <div 
                  key={family.id}
                  className={`card shadow-sm border transition-all ${
                    hasReceived ? 'bg-success/10 border-success' : 'bg-base-100 border-base-200'
                  }`}
                >
                  <div className="card-body p-4 flex-row justify-between items-center">
                    <div>
                      <p className="font-bold leading-tight">{family.nombres} {family.apellidos}</p>
                      <p className="text-xs opacity-50">{family.cedula}</p>
                    </div>
                    <div className="form-control">
                      <input 
                        type="checkbox" 
                        className="checkbox checkbox-success checkbox-lg" 
                        checked={!!hasReceived}
                        onChange={() => toggleDeliveryStatus(family.id)}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default ClapPage;
