import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Dashboard = () => {
  const [user, setUser] = useState(null)
  const [stats, setStats] = useState({
    totalChatbots: 3,
    totalQuestions: 247,
    avgResponseTime: '0.8s',
    successRate: '94%'
  })
  const [recentChatbots, setRecentChatbots] = useState([
    { id: 1, name: 'API Documentation Bot', status: 'active', questions: 89, lastUsed: '2 hours ago' },
    { id: 2, name: 'Help Center Assistant', status: 'active', questions: 156, lastUsed: '1 day ago' },
    { id: 3, name: 'Product Guide Bot', status: 'training', questions: 2, lastUsed: '3 days ago' }
  ])
  const navigate = useNavigate()

  useEffect(() => {
    // Get user from localStorage (mock)
    const userData = localStorage.getItem('user')
    if (userData) {
      setUser(JSON.parse(userData))
    } else {
      navigate('/login')
    }
  }, [navigate])

  const handleLogout = () => {
    localStorage.removeItem('authToken')
    localStorage.removeItem('user')
    navigate('/')
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50" style={{ minHeight: '100vh', backgroundColor: '#f9fafb' }}>
      {/* Navigation Header */}
      <nav className="bg-white border-b border-gray-200" style={{ backgroundColor: 'white', borderBottom: '1px solid #e5e7eb' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1rem' }}>
          <div className="flex justify-between items-center h-16" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '4rem' }}>
            {/* Logo */}
            <div className="flex items-center" style={{ display: 'flex', alignItems: 'center' }}>
              <Link to="/dashboard" className="flex items-center" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
                <span className="text-2xl font-bold text-gray-900" style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#111827' }}>
                  ChatDocs
                </span>
              </Link>
            </div>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-8" style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
              <Link to="/dashboard" className="text-blue-600 font-medium" style={{ color: '#2563eb', textDecoration: 'none', fontWeight: '500' }}>
                Dashboard
              </Link>
              <Link to="/chatbots" className="text-gray-600 hover:text-gray-900" style={{ color: '#4b5563', textDecoration: 'none' }}>
                Chatbots
              </Link>
              <Link to="/analytics" className="text-gray-600 hover:text-gray-900" style={{ color: '#4b5563', textDecoration: 'none' }}>
                Analytics
              </Link>
              <Link to="/settings" className="text-gray-600 hover:text-gray-900" style={{ color: '#4b5563', textDecoration: 'none' }}>
                Settings
              </Link>
            </div>

            {/* User Menu */}
            <div className="flex items-center space-x-4" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span className="text-gray-700" style={{ color: '#374151' }}>
                {user.name || user.email}
              </span>
              <button
                onClick={handleLogout}
                className="text-gray-600 hover:text-gray-900"
                style={{ color: '#4b5563', background: 'none', border: 'none', cursor: 'pointer' }}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8" style={{ maxWidth: '1280px', margin: '0 auto', padding: '2rem 1rem' }}>
        {/* Welcome Header */}
        <div className="mb-8" style={{ marginBottom: '2rem' }}>
          <h1 className="text-3xl font-bold text-gray-900" style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#111827', marginBottom: '0.5rem' }}>
            Welcome back, {user.name || 'there'}!
          </h1>
          <p className="text-gray-600" style={{ color: '#4b5563' }}>
            Here's what's happening with your chatbots today.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
          <div className="bg-white rounded-lg shadow-sm border p-6" style={{ backgroundColor: 'white', borderRadius: '0.5rem', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)', border: '1px solid #e5e7eb', padding: '1.5rem' }}>
            <div className="flex items-center" style={{ display: 'flex', alignItems: 'center' }}>
              <div className="p-2 bg-blue-100 rounded-lg" style={{ padding: '0.5rem', backgroundColor: '#dbeafe', borderRadius: '0.5rem' }}>
                <span style={{ fontSize: '1.5rem' }}>🤖</span>
              </div>
              <div className="ml-4" style={{ marginLeft: '1rem' }}>
                <p className="text-sm text-gray-600" style={{ fontSize: '0.875rem', color: '#4b5563' }}>Total Chatbots</p>
                <p className="text-2xl font-bold text-gray-900" style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#111827' }}>
                  {stats.totalChatbots}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6" style={{ backgroundColor: 'white', borderRadius: '0.5rem', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)', border: '1px solid #e5e7eb', padding: '1.5rem' }}>
            <div className="flex items-center" style={{ display: 'flex', alignItems: 'center' }}>
              <div className="p-2 bg-green-100 rounded-lg" style={{ padding: '0.5rem', backgroundColor: '#dcfce7', borderRadius: '0.5rem' }}>
                <span style={{ fontSize: '1.5rem' }}>💬</span>
              </div>
              <div className="ml-4" style={{ marginLeft: '1rem' }}>
                <p className="text-sm text-gray-600" style={{ fontSize: '0.875rem', color: '#4b5563' }}>Questions Answered</p>
                <p className="text-2xl font-bold text-gray-900" style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#111827' }}>
                  {stats.totalQuestions}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6" style={{ backgroundColor: 'white', borderRadius: '0.5rem', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)', border: '1px solid #e5e7eb', padding: '1.5rem' }}>
            <div className="flex items-center" style={{ display: 'flex', alignItems: 'center' }}>
              <div className="p-2 bg-yellow-100 rounded-lg" style={{ padding: '0.5rem', backgroundColor: '#fef3c7', borderRadius: '0.5rem' }}>
                <span style={{ fontSize: '1.5rem' }}>⚡</span>
              </div>
              <div className="ml-4" style={{ marginLeft: '1rem' }}>
                <p className="text-sm text-gray-600" style={{ fontSize: '0.875rem', color: '#4b5563' }}>Avg Response Time</p>
                <p className="text-2xl font-bold text-gray-900" style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#111827' }}>
                  {stats.avgResponseTime}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6" style={{ backgroundColor: 'white', borderRadius: '0.5rem', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)', border: '1px solid #e5e7eb', padding: '1.5rem' }}>
            <div className="flex items-center" style={{ display: 'flex', alignItems: 'center' }}>
              <div className="p-2 bg-purple-100 rounded-lg" style={{ padding: '0.5rem', backgroundColor: '#e9d5ff', borderRadius: '0.5rem' }}>
                <span style={{ fontSize: '1.5rem' }}>📊</span>
              </div>
              <div className="ml-4" style={{ marginLeft: '1rem' }}>
                <p className="text-sm text-gray-600" style={{ fontSize: '0.875rem', color: '#4b5563' }}>Success Rate</p>
                <p className="text-2xl font-bold text-gray-900" style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#111827' }}>
                  {stats.successRate}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
          {/* Recent Chatbots */}
          <div className="lg:col-span-2" style={{ gridColumn: 'span 2' }}>
            <div className="bg-white rounded-lg shadow-sm border" style={{ backgroundColor: 'white', borderRadius: '0.5rem', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)', border: '1px solid #e5e7eb' }}>
              <div className="p-6 border-b border-gray-200" style={{ padding: '1.5rem', borderBottom: '1px solid #e5e7eb' }}>
                <div className="flex justify-between items-center" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h2 className="text-lg font-semibold text-gray-900" style={{ fontSize: '1.125rem', fontWeight: '600', color: '#111827' }}>
                    Your Chatbots
                  </h2>
                  <Link 
                    to="/chatbots/new"
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700"
                    style={{ backgroundColor: '#2563eb', color: 'white', padding: '0.5rem 1rem', borderRadius: '0.5rem', fontSize: '0.875rem', fontWeight: '500', textDecoration: 'none' }}
                  >
                    Create New Bot
                  </Link>
                </div>
              </div>
              <div className="p-6" style={{ padding: '1.5rem' }}>
                <div className="space-y-4" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {recentChatbots.map((bot) => (
                    <div key={bot.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', border: '1px solid #e5e7eb', borderRadius: '0.5rem' }}>
                      <div className="flex items-center" style={{ display: 'flex', alignItems: 'center' }}>
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center" style={{ width: '2.5rem', height: '2.5rem', backgroundColor: '#dbeafe', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <span style={{ fontSize: '1.25rem' }}>🤖</span>
                        </div>
                        <div className="ml-4" style={{ marginLeft: '1rem' }}>
                          <h3 className="text-sm font-medium text-gray-900" style={{ fontSize: '0.875rem', fontWeight: '500', color: '#111827' }}>
                            {bot.name}
                          </h3>
                          <div className="flex items-center mt-1" style={{ display: 'flex', alignItems: 'center', marginTop: '0.25rem' }}>
                            <span className={`inline-block w-2 h-2 rounded-full mr-2 ${bot.status === 'active' ? 'bg-green-400' : 'bg-yellow-400'}`} style={{ 
                              display: 'inline-block', 
                              width: '0.5rem', 
                              height: '0.5rem', 
                              borderRadius: '50%', 
                              marginRight: '0.5rem',
                              backgroundColor: bot.status === 'active' ? '#4ade80' : '#facc15'
                            }}></span>
                            <span className="text-xs text-gray-500" style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                              {bot.status} • {bot.questions} questions • {bot.lastUsed}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Link
                          to={`/chatbots/${bot.id}`}
                          className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                          style={{ color: '#2563eb', textDecoration: 'none', fontSize: '0.875rem', fontWeight: '500' }}
                        >
                          View
                        </Link>
                        <Link
                          to={`/chatbots/${bot.id}/settings`}
                          className="text-gray-600 hover:text-gray-700 text-sm"
                          style={{ color: '#4b5563', textDecoration: 'none', fontSize: '0.875rem' }}
                        >
                          Settings
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div>
            <div className="bg-white rounded-lg shadow-sm border p-6" style={{ backgroundColor: 'white', borderRadius: '0.5rem', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)', border: '1px solid #e5e7eb', padding: '1.5rem' }}>
              <h2 className="text-lg font-semibold text-gray-900 mb-4" style={{ fontSize: '1.125rem', fontWeight: '600', color: '#111827', marginBottom: '1rem' }}>
                Quick Actions
              </h2>
              <div className="space-y-3" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <Link
                  to="/chatbots/new"
                  className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50"
                  style={{ display: 'flex', alignItems: 'center', padding: '0.75rem', border: '1px solid #e5e7eb', borderRadius: '0.5rem', textDecoration: 'none' }}
                >
                  <span className="text-2xl mr-3" style={{ fontSize: '1.5rem', marginRight: '0.75rem' }}>➕</span>
                  <div>
                    <p className="text-sm font-medium text-gray-900" style={{ fontSize: '0.875rem', fontWeight: '500', color: '#111827' }}>
                      Create Chatbot
                    </p>
                    <p className="text-xs text-gray-500" style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                      Start a new AI assistant
                    </p>
                  </div>
                </Link>

                <Link
                  to="/upload"
                  className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50"
                  style={{ display: 'flex', alignItems: 'center', padding: '0.75rem', border: '1px solid #e5e7eb', borderRadius: '0.5rem', textDecoration: 'none' }}
                >
                  <span className="text-2xl mr-3" style={{ fontSize: '1.5rem', marginRight: '0.75rem' }}>📄</span>
                  <div>
                    <p className="text-sm font-medium text-gray-900" style={{ fontSize: '0.875rem', fontWeight: '500', color: '#111827' }}>
                      Upload Documents
                    </p>
                    <p className="text-xs text-gray-500" style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                      Add knowledge sources
                    </p>
                  </div>
                </Link>

                <Link
                  to="/analytics"
                  className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50"
                  style={{ display: 'flex', alignItems: 'center', padding: '0.75rem', border: '1px solid #e5e7eb', borderRadius: '0.5rem', textDecoration: 'none' }}
                >
                  <span className="text-2xl mr-3" style={{ fontSize: '1.5rem', marginRight: '0.75rem' }}>📊</span>
                  <div>
                    <p className="text-sm font-medium text-gray-900" style={{ fontSize: '0.875rem', fontWeight: '500', color: '#111827' }}>
                      View Analytics
                    </p>
                    <p className="text-xs text-gray-500" style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                      Performance insights
                    </p>
                  </div>
                </Link>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-lg shadow-sm border p-6 mt-6" style={{ backgroundColor: 'white', borderRadius: '0.5rem', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)', border: '1px solid #e5e7eb', padding: '1.5rem', marginTop: '1.5rem' }}>
              <h2 className="text-lg font-semibold text-gray-900 mb-4" style={{ fontSize: '1.125rem', fontWeight: '600', color: '#111827', marginBottom: '1rem' }}>
                Recent Activity
              </h2>
              <div className="space-y-3" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <div className="text-sm text-gray-600" style={{ fontSize: '0.875rem', color: '#4b5563' }}>
                  • API Bot answered 23 questions today
                </div>
                <div className="text-sm text-gray-600" style={{ fontSize: '0.875rem', color: '#4b5563' }}>
                  • Help Center updated 2 hours ago
                </div>
                <div className="text-sm text-gray-600" style={{ fontSize: '0.875rem', color: '#4b5563' }}>
                  • Product Guide training completed
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard