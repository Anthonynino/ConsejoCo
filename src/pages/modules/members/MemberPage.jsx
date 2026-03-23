
import { useState } from "react"
import CardMember from "./components/CardMember"
import CreateMemberModal from "./components/CreateMemberModal"

const MOCK_MIEMBROS = [
  { id: 1, nombre: 'Laura Martínez',  cedula: 'V-12.345.678', telefono: '0414-123-4567', correo: 'laura@correo.com', cargo: "Jefe/a",  iniciales: 'LM', color: 'bg-violet-100 text-violet-700' },
  { id: 2, nombre: 'Carlos Rondón',   cedula: 'V-18.765.432', telefono: '0424-987-6543', correo: 'carlos@correo.com', cargo: "Ninguno", iniciales: 'CR', color: 'bg-sky-100 text-sky-700'        },
  { id: 3, nombre: 'María Useche',    cedula: 'V-20.111.222', telefono: '0416-555-0011', correo: 'maria@correo.com', cargo: "Lider",  iniciales: 'MU', color: 'bg-emerald-100 text-emerald-700' },
  { id: 4, nombre: 'Pedro Salinas',   cedula: 'V-15.999.001', telefono: '0412-300-1122', correo: 'pedro@correo.com', cargo: "Ninguno",  iniciales: 'PS', color: 'bg-amber-100 text-amber-700'     },
  { id: 5, nombre: 'Ana Figueroa',    cedula: 'V-22.456.789', telefono: '0426-741-8520', correo: 'ana@correo.com', cargo: "Tesorero/a",    iniciales: 'AF', color: 'bg-rose-100 text-rose-700'       },
  { id: 6, nombre: 'Jorge Tovar',     cedula: 'V-17.852.963', telefono: '0414-963-8520', correo: 'jorge@correo.com', cargo: "Vocero/a",  iniciales: 'JT', color: 'bg-cyan-100 text-cyan-700'      },
]


const MemberPage = () => {

  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
  <div className=" w-full space-y-6 mx-auto p-6">

    <CreateMemberModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
  {/* Header */}
  <div className="flex items-center justify-between">
    <div>
      <h2 className="text-lg font-semibold text-gray-900">Miembros</h2>
      <p className="text-sm text-gray-400 mt-0.5">{MOCK_MIEMBROS.length} miembros registrados</p>
    </div>
    <button 
      className="px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-xl hover:bg-gray-700 transition-colors"
      onClick={() => setIsModalOpen(true)}
    >
      + Nuevo miembro
    </button>
  </div>

  {/* Grid de tarjetas */}
  <div className=" mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
    {MOCK_MIEMBROS.map((miembro) => (
      <CardMember key={miembro.id} miembro={miembro} />
    ))}
  </div>
</div>
  )
}

export default MemberPage
