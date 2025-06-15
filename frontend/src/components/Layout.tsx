import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const navLinks = [
  { to: '/', label: 'Dashboard' },
  { to: '/waste/intake', label: 'Waste Intake' },
  { to: '/waste/sorting', label: 'Waste Sorting' },
  { to: '/sales', label: 'Sales' },
  { to: '/reports', label: 'Reports' },
  { to: '/users', label: 'Users' },
]

export default function Layout() {
  const { user, logout } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="min-h-screen flex bg-gray-50">
      <aside className="w-64 bg-white shadow-md flex flex-col justify-between">
        <div>
          <div className="p-6 text-2xl font-bold text-primary-700">MRF DigiTrack</div>
          <nav className="mt-8 flex flex-col gap-2">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-6 py-3 text-lg rounded-l-full transition-colors ${location.pathname === link.to ? 'bg-primary-100 text-primary-700 font-semibold' : 'text-gray-700 hover:bg-primary-50'}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="p-6 border-t">
          <div className="mb-2 text-sm text-gray-600">{user?.full_name} ({user?.role})</div>
          <button className="btn btn-secondary w-full" onClick={handleLogout}>Logout</button>
        </div>
      </aside>
      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  )
} 