import CustomModal from "../../../../components/CustomModal";

const BombonaAssignmentModal = ({ isOpen, onClose, family, bombonas, onUpdateBombonas, onAddBombona, onRemoveBombona }) => {
  if (!isOpen || !family) return null;

  const BOMBONA_TYPES = [
    { value: "KG_10", label: "KG 10" },
    { value: "KG_18", label: "KG 18" },
    { value: "KG_27", label: "KG 27" }
  ];

  const getAvailableBombonaTypes = () => {
    const selectedTypes = bombonas?.map(b => b.tipoBombona) || [];
    return BOMBONA_TYPES.filter(type => !selectedTypes.includes(type.value));
  };

  const isMaxBombonasReached = () => {
    return (bombonas?.length || 0) >= BOMBONA_TYPES.length;
  };

  return (
    <CustomModal
      isOpen={isOpen}
      onClose={onClose}
      widthClass={"max-w-lg"}
      title={"Asignar Bombonas"}
      subtitle={`${family.nombres} ${family.apellidos}`}
      actionText={"Guardar"}
      onAction={onClose}
    >
      <div className="space-y-4">
        <div className="bg-base-200/30 rounded-lg p-3 border border-base-200">
          <p className="text-xs font-bold uppercase opacity-60 mb-3">Bombonas asignadas:</p>
          
          {bombonas && bombonas.length > 0 ? (
            <div className="space-y-2">
              {bombonas.map((bombona, idx) => (
                <div key={idx} className="flex gap-2 items-center">
                  <select 
                    className="select select-bordered select-sm flex-1"
                    value={bombona.tipoBombona}
                    onChange={(e) => onUpdateBombonas(idx, 'tipoBombona', e.target.value)}
                  >
                    {BOMBONA_TYPES.map(type => {
                      const isTypeSelected = bombonas.some((b, i) => i !== idx && b.tipoBombona === type.value);
                      return (
                        <option 
                          key={type.value} 
                          value={type.value}
                          disabled={isTypeSelected}
                        >
                          {type.label} {isTypeSelected ? '(ya seleccionado)' : ''}
                        </option>
                      );
                    })}
                  </select>
                  <input 
                    type="number"
                    className="input input-bordered input-sm w-24"
                    min="1"
                    max="3"
                    value={bombona.cantidad}
                    onChange={(e) => {
                      const value = parseInt(e.target.value) || 1;
                      if (value <= 3) {
                        onUpdateBombonas(idx, 'cantidad', value);
                      }
                    }}
                  />
                  <button 
                    className="btn btn-sm btn-circle btn-ghost btn-error"
                    onClick={() => onRemoveBombona(idx)}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm opacity-50 italic text-center py-4">No hay bombonas asignadas</p>
          )}
        </div>

        <button 
          className="btn btn-sm btn-primary btn-outline w-full"
          onClick={onAddBombona}
          disabled={isMaxBombonasReached()}
        >
          + Agregar Bombona
        </button>
        {isMaxBombonasReached() && (
          <p className="text-xs text-center opacity-50">Máximo de tipos de bombonas alcanzado</p>
        )}
      </div>
    </CustomModal>
  );
};

export default BombonaAssignmentModal;
