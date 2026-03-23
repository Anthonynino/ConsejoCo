import { Outlet } from 'react-router-dom'

const AppLayout = () => {
  return (
     <div className="min-h-screen bg-gray-50">
      <main className="w-full py-6 px-12">
        <Outlet />
      </main>
    </div>
  )
}

export default AppLayout