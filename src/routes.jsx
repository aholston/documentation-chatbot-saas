import { Routes, Route } from 'react-router-dom'
import Landing from './pages/public/Landing'
import Login from './pages/public/Login'
import Signup from './pages/public/Signup'
import Dashboard from './pages/dashboard/Dashboard'
import CreateChatbot from './pages/dashboard/CreateChatbot'
import Chatbots from './pages/dashboard/Chatbots'
import ChatbotDetails from './pages/dashboard/ChatbotDetails'
import UploadDocuments from './pages/dashboard/UploadDocuments'
import ChatbotSettings from './pages/dashboard/ChatbotSettings'
import TestChatbot from './pages/dashboard/TestChatbot'

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
      <Route path="/chatbots" element={<Chatbots />} />
      <Route path="/chatbots/new" element={<CreateChatbot />} />
      <Route path="/chatbots/:id" element={<ChatbotDetails />} />
      <Route path="/chatbots/:id/settings" element={<ChatbotSettings />} />
      <Route path="/chatbots/:id/test" element={<TestChatbot />} />
      <Route path="/chatbots/:id/sources/add" element={<ComingSoon title="Add Data Source" />} />
      <Route path="/upload" element={<UploadDocuments />} />
      <Route path="/analytics" element={<ComingSoon title="Analytics" />} />
      <Route path="/settings" element={<ComingSoon title="Settings" />} />
      
      {/* 404 Route */}
      <Route path="*" element={<ComingSoon title="Page Not Found" />} />
    </Routes>
  )
}

export default AppRoutes