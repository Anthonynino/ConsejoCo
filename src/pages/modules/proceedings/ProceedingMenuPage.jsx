import { useNavigate } from "react-router-dom";
import { FaHome, FaHandshake, FaHardHat, FaLeaf, FaStore } from "react-icons/fa";
import HeaderModules from "../../../components/HeaderModules";

const proceedings = [
  {
    path: "/proceedings/residence",
    icon: FaHome,
    title: "Constancia de Residencia",
    description: "Certifica la residencia de un habitante en la comunidad.",
  },
  {
    path: "/proceedings/good-conduct",
    icon: FaHandshake,
    title: "Constancia de Buena Conducta",
    description: "Certifica el buen comportamiento de un habitante en la comunidad.",
  },
  {
    path: "/proceedings/enginery",
    icon: FaHardHat,
    title: "Constancia de Ingeniería",
    description: "Aval para trámites ante Ingeniería Municipal.",
  },
  {
    path: "/proceedings/enviroment",
    icon: FaLeaf,
    title: "Constancia de Ambiente",
    description: "Aval para trámites ante la Dirección de Ambiente.",
  },
  {
    path: "/proceedings/economy",
    icon: FaStore,
    title: "Carta Aval de Actividades Económicas",
    description: "Aval para obtención de licencia de actividades económicas.",
  },
];

const ProceedingsPage = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full space-y-6 mx-auto p-6">
      <HeaderModules
        title="Constancias"
        description="Selecciona el tipo de constancia que deseas generar"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {proceedings.map(({ path, icon: Icon, title, description }) => (
          <button
            key={path}
            onClick={() => navigate(path)}
            className="border border-base-200 rounded-xl p-6 flex items-start gap-4 text-left hover:border-primary/40 hover:bg-primary/5 transition-colors group"
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

export default ProceedingsPage;