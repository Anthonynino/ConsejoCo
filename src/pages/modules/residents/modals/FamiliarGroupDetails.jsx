import { FaPhoneAlt, FaPlus, FaPen, FaTrashAlt } from "react-icons/fa";
import Avatar from "../../../../components/Avatar";

const FamiliarGroupDetails = ({ familyMembers, onAddMember, onEditMember, onDeleteMember }) => {
  const calculateAge = (birthday) => {
    if (!birthday) return "N/A";
    const ageDifMs = Date.now() - new Date(birthday).getTime();
    const ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };

  const handleAddMember = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('Botón agregar familiar clickeado');
    if (onAddMember) {
      onAddMember();
    }
  };

  if (!familyMembers || familyMembers.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-base-content/60 mb-4">No hay familiares registrados</p>
        <button
          type="button"
          onClick={handleAddMember}
          className="btn btn-primary btn-sm gap-2"
        >
          <FaPlus />
          Agregar Familiar
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <p className="text-xs opacity-60 uppercase tracking-widest font-bold">
          {familyMembers.length} {familyMembers.length === 1 ? 'familiar' : 'familiares'}
        </p>
        <button
          type="button"
          onClick={handleAddMember}
          className="btn btn-primary btn-sm gap-2"
        >
          <FaPlus />
          Agregar Familiar
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {familyMembers.map((member, idx) => {
          const fullName = `${member.nombres} ${member.apellidos}`;
          const initials = (member.nombres || "")
            .split(" ")
            .filter(Boolean)
            .slice(0, 1)
            .concat((member.apellidos || "").split(" ").filter(Boolean).slice(0, 1))
            .map((p) => p[0])
            .join("")
            .toUpperCase();

          return (
            <div
              key={member.id}
              className="card bg-base-100 border border-base-200 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="card-body p-4">
                <div className="flex items-center gap-3">
                  <Avatar initials={initials} idx={idx} />
                  <div className="min-w-0 flex-1">
                    <h4 className="font-bold text-sm truncate">{fullName}</h4>
                    <p className="text-xs opacity-60 uppercase tracking-tighter">
                      V-{member.cedula}
                    </p>
                  </div>
                  <span className="badge badge-secondary badge-outline badge-xs font-bold uppercase">
                    {member.parentesco}
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => onEditMember?.(member)}
                      className="btn btn-ghost btn-xs btn-circle text-base-content/40 hover:text-primary transition-colors"
                    >
                      <FaPen className="text-xs" />
                    </button>
                    <button
                      type="button"
                      onClick={() => onDeleteMember?.(member)}
                      className="btn btn-ghost btn-xs btn-circle text-base-content/40 hover:text-error transition-colors"
                    >
                      <FaTrashAlt className="text-xs" />
                    </button>
                  </div>
                </div>

                <div className="divider my-2 opacity-20"></div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs font-medium text-base-content/70">
                    <div className="p-1 bg-base-200 rounded-lg">
                      <FaPhoneAlt className="text-primary text-[10px]" />
                    </div>
                    <span>{member.telefono || "Sin teléfono"}</span>
                  </div>

                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 text-xs font-medium text-base-content/70">
                      <div className="p-1 bg-base-200 rounded-lg">
                        <span className="text-[9px] font-bold opacity-70">Edad</span>
                      </div>
                      <span>{calculateAge(member.fechaNacimiento)} años</span>
                    </div>

                    <span className="badge badge-info badge-outline badge-xs text-[9px] font-bold uppercase">
                      {member.genero === "M" ? "Masculino" : "Femenino"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FamiliarGroupDetails;