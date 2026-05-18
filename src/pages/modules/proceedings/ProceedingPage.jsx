import { useNavigate } from "react-router-dom";
import { FaHome, FaHandshake } from "react-icons/fa";
import HeaderModules from "../../../components/HeaderModules";

const proceedings = [
  {
    path: "/proceedings/residence",
    icon: FaHome,
    title: "Constancia de residencia",
    description: "Genera una constancia que certifica la residencia de un habitante en la comunidad.",
  },
  {
    path: "/proceedings/good-conduct",
    icon: FaHandshake,
    title: "Constancia de buena conducta",
    description: "Genera una constancia que certifica el buen comportamiento de un habitante en la comunidad.",
  },
];

const ProceedingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full space-y-6 mx-auto p-6">
      <HeaderModules
        title="Constancias"
        description="Selecciona el tipo de constancia que deseas generar"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {proceedings.map(({ path, icon: Icon, title, description }) => (
          <button
            key={path}
            onClick={() => navigate(path)}
            className="border border-base-200 rounded-xl shadow-sm p-6 flex items-start gap-4 text-left hover:border-primary/40 hover:bg-primary/5 transition-colors group"
          >
            <div className="bg-primary/10 text-primary p-3 rounded-lg group-hover:bg-primary/20 transition-colors">
              <Icon className="text-xl" />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-semibold text-base-content">{title}</p>
              <p className="text-xs text-base-content/50 leading-relaxed">{description}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProceedingPage;