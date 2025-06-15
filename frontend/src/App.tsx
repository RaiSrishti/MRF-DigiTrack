import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast'
import Layout from './components/Layout'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import WasteIntake from './pages/WasteIntake'
import WasteSorting from './pages/WasteSorting'
import Sales from './pages/Sales'
import Reports from './pages/Reports'
import Users from './pages/Users'
import { AuthProvider, useAuth } from './context/AuthContext'

const queryClient = new QueryClient()

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth()
  
  if (loading) {
    return <div>Loading...</div>
  }
  
  if (!user) {
    return <Navigate to="/login" />
  }
  
  return <>{children}</>
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <Toaster position="top-right" />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            
            <Route
              path="/app"
              element={
                <PrivateRoute>
                  <Layout />
                </PrivateRoute>
              }
            >
              <Route index element={<Dashboard />} />
              <Route path="waste/intake" element={<WasteIntake />} />
              <Route path="waste/sorting" element={<WasteSorting />} />
              <Route path="sales" element={<Sales />} />
              <Route path="reports" element={<Reports />} />
              <Route path="users" element={<Users />} />
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  )
}

export default App
