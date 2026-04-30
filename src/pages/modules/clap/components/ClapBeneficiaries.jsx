import { FaSearch, FaEllipsisV } from "react-icons/fa";
import CustomInput from "../../../../components/CustomInput";
import Avatar from "../../../../components/Avatar";

const MOCK_FAMILIES = [
  {
    id: 1,
    head: "Laura Martínez",
    idNumber: "V-12.345.678",
    members: 4,
    address: "Sector 1, Casa #12",
    status: "Activo",
  },
  {
    id: 2,
    head: "Carlos Rondón",
    idNumber: "V-18.765.432",
    members: 3,
    address: "Sector 2, Calle Principal",
    status: "Activo",
  },
  {
    id: 3,
    head: "María Useche",
    idNumber: "V-20.111.222",
    members: 5,
    address: "Sector 1, Vereda 3",
    status: "Suspendido",
  },
];

const ClapBeneficiaries = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 border-y border-base-200 py-4">
        <CustomInput
          className={"md:w-80"}
          placeholder={"Buscar familia..."}
          icon={FaSearch}
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {MOCK_FAMILIES.map((family, idx) => (
          <div
            key={family.id}
            className="card bg-base-100 border border-base-200 shadow-sm overflow-hidden flex-row"
          >
            <div className={`card-body p-5 flex-1 border-l-8 ${family.status === "Activo" ? "border-l-success" : "border-l-error"}`}>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <Avatar
                    initials={family.head.substring(0, 2).toUpperCase()}
                    idx={idx}
                  />
                  <div>
                    <h4 className="font-bold leading-none">{family.head}</h4>
                    <span className="text-[10px] opacity-50 font-mono italic">
                      {family.idNumber}
                    </span>
                  </div>
                </div>
                <div className="dropdown dropdown-end">
                  <label
                    tabIndex={0}
                    className="btn btn-ghost btn-xs btn-circle"
                  >
                    <FaEllipsisV />
                  </label>
                  <ul
                    tabIndex={0}
                    className="dropdown-content z-1 menu p-2 shadow bg-base-100 rounded-box w-52 border border-base-200"
                  >
                    <li>
                      <a>Ver Ficha Familiar</a>
                    </li>
                    <li>
                      <a className="text-error">Suspender Beneficio</a>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 mt-4 text-sm">
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase opacity-40 font-bold">
                    Cargas Familiares
                  </span>
                  <span className="font-medium">{family.members} personas</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase opacity-40 font-bold">
                    Dirección
                  </span>
                  <span className="font-medium truncate">{family.address}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClapBeneficiaries;
