import { FaSearch } from "react-icons/fa";
import CardResident from "./CardResident";
import CustomInput from "../../../../components/CustomInput";

const MOCK_RESIDENTS = [
  {
    id: 1,
    name: "Laura Martínez",
    idNumber: "V-12.345.678",
    age: 34,
    phone: "0414-123-4567",
    sector: "Sector 1",
    headOfFamily: true,
  },
  {
    id: 2,
    name: "Carlos Rondón",
    idNumber: "V-18.765.432",
    age: 28,
    phone: "0424-987-6543",
    sector: "Sector 2",
    headOfFamily: true,
  },
  {
    id: 3,
    name: "María Useche",
    idNumber: "V-20.111.222",
    age: 45,
    phone: "0416-555-0011",
    sector: "Sector 1",
    headOfFamily: false,
  },
  {
    id: 4,
    name: "Pedro Salinas",
    idNumber: "V-15.999.001",
    age: 52,
    phone: "0412-300-1122",
    sector: "Sector 3",
    headOfFamily: true,
  },
  {
    id: 5,
    name: "Ana Figueroa",
    idNumber: "V-22.456.789",
    age: 22,
    phone: "0426-741-8520",
    sector: "Sector 2",
    headOfFamily: false,
  },
];

const ResidentTable = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 border-y border-base-200 py-4">
        <CustomInput
          className={"md:w-80"}
          placeholder={"Buscar por nombre o cédula..."}
          icon={FaSearch}
        />
      </div>
      {/* Grid de tarjetas */}
      <div className="mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {MOCK_RESIDENTS.map((resident) => (
          <CardResident key={resident.id} resident={resident} />
        ))}
      </div>
    </div>
  );
};

export default ResidentTable;
