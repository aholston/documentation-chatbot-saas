import { Routes, Route } from 'react-router-dom'
import Landing from './pages/public/Landing'

// Placeholder for future pages
const ComingSoon = ({ title }) => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="text-center">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">{title}</h1>
      <p className="text-gray-600">Coming soon...</p>
    </div>
  </div>
)

function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<ComingSoon title="Login" />} />
      <Route path="/signup" element={<ComingSoon title="Sign Up" />} />
      
      {/* Authenticated Routes */}
      <Route path="/dashboard" element={<ComingSoon title="Dashboard" />} />
      
      {/* 404 Route */}
      <Route path="*" element={<ComingSoon title="Page Not Found" />} />
    </Routes>
  )
}

export default AppRoutes