import { Routes, Route } from 'react-router-dom'
import Landing from './pages/public/Landing'
import Login from './pages/public/Login'
import Signup from './pages/public/Signup'
import Dashboard from './pages/dashboard/Dashboard'

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
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot-password" element={<ComingSoon title="Forgot Password" />} />
      <Route path="/terms" element={<ComingSoon title="Terms of Service" />} />
      <Route path="/privacy" element={<ComingSoon title="Privacy Policy" />} />
      
      {/* Authenticated Routes */}
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/welcome" element={<ComingSoon title="Welcome Setup" />} />
      <Route path="/chatbots" element={<ComingSoon title="Chatbots" />} />
      <Route path="/chatbots/new" element={<ComingSoon title="Create New Chatbot" />} />
      <Route path="/chatbots/:id" element={<ComingSoon title="Chatbot Details" />} />
      <Route path="/chatbots/:id/settings" element={<ComingSoon title="Chatbot Settings" />} />
      <Route path="/analytics" element={<ComingSoon title="Analytics" />} />
      <Route path="/settings" element={<ComingSoon title="Settings" />} />
      <Route path="/upload" element={<ComingSoon title="Upload Documents" />} />
      
      {/* 404 Route */}
      <Route path="*" element={<ComingSoon title="Page Not Found" />} />
    </Routes>
  )
}

export default AppRoutes