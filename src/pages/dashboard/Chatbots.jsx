import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Chatbots = () => {
  const [chatbots, setChatbots] = useState([])
  const [filteredChatbots, setFilteredChatbots] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()

  // Mock chatbot data
  const mockChatbots = [
    {
      id: 1,
      name: 'API Documentation Bot',
      description: 'Helps users navigate our REST API documentation',
      status: 'active',
      type: 'documentation',
      createdAt: '2024-01-15',
      lastUsed: '2 hours ago',
      totalQuestions: 89,
      successRate: 94,
      sources: 5,
      embedCode: '<script src="https://chatdocs.ai/embed/api-bot-123"></script>'
    },
    {
      id: 2,
      name: 'Help Center Assistant',
      description: 'Customer support chatbot for common questions',
      status: 'active',
      type: 'support',
      createdAt: '2024-01-10',
      lastUsed: '1 day ago',
      totalQuestions: 156,
      successRate: 96,
      sources: 8,
      embedCode: '<script src="https://chatdocs.ai/embed/help-bot-456"></script>'
    },
    {
      id: 3,
      name: 'Product Guide Bot',
      description: 'Interactive product documentation assistant',
      status: 'training',
      type: 'documentation',
      createdAt: '2024-01-20',
      lastUsed: '3 days ago',
      totalQuestions: 2,
      successRate: 100,
      sources: 3,
      embedCode: '<script src="https://chatdocs.ai/embed/product-bot-789"></script>'
    },
    {
      id: 4,
      name: 'Sales Assistant',
      description: 'Qualifies leads and provides pricing information',
      status: 'inactive',
      type: 'sales',
      createdAt: '2024-01-05',
      lastUsed: '1 week ago',
      totalQuestions: 45,
      successRate: 89,
      sources: 4,
      embedCode: '<script src="https://chatdocs.ai/embed/sales-bot-012"></script>'
    }
  ]

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setChatbots(mockChatbots)
      setFilteredChatbots(mockChatbots)
      setIsLoading(false)
    }, 1000)
  }, [])

  useEffect(() => {
    let filtered = chatbots

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(bot =>
        bot.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bot.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Filter by status
    if (statusFilter !== 'all') {
      filtered = filtered.filter(bot => bot.status === statusFilter)
    }

    setFilteredChatbots(filtered)
  }, [searchTerm, statusFilter, chatbots])

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return { bg: '#dcfce7', text: '#166534', dot: '#22c55e' }
      case 'training':
        return { bg: '#fef3c7', text: '#92400e', dot: '#f59e0b' }
      case 'inactive':
        return { bg: '#fee2e2', text: '#991b1b', dot: '#ef4444' }
      default:
        return { bg: '#f3f4f6', text: '#374151', dot: '#6b7280' }
    }
  }

  const getTypeIcon = (type) => {
    switch (type) {
      case 'documentation':
        return '📚'
      case 'support':
        return '🎧'
      case 'sales':
        return '💼'
      default:
        return '🤖'
    }
  }

  const handleDeleteBot = (botId) => {
    if (window.confirm('Are you sure you want to delete this chatbot? This action cannot be undone.')) {
      setChatbots(prev => prev.filter(bot => bot.id !== botId))
    }
  }

  const handleToggleStatus = (botId) => {
    setChatbots(prev => prev.map(bot => {
      if (bot.id === botId) {
        return {
          ...bot,
          status: bot.status === 'active' ? 'inactive' : 'active'
        }
      }
      return bot
    }))
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your chatbots...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50" style={{ minHeight: '100vh', backgroundColor: '#f9fafb' }}>
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200" style={{ backgroundColor: 'white', borderBottom: '1px solid #e5e7eb' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1rem' }}>
          <div className="flex justify-between items-center h-16" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '4rem' }}>
            <Link to="/dashboard" className="flex items-center" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
              <span className="text-2xl font-bold text-gray-900" style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#111827' }}>
                ChatDocs
              </span>
            </Link>
            <div className="flex items-center space-x-6" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
              <Link to="/dashboard" className="text-gray-600 hover:text-gray-900" style={{ color: '#4b5563', textDecoration: 'none' }}>
                Dashboard
              </Link>
              <span className="text-blue-600 font-medium" style={{ color: '#2563eb', fontWeight: '500' }}>
                Chatbots
              </span>
              <Link to="/analytics" className="text-gray-600 hover:text-gray-900" style={{ color: '#4b5563', textDecoration: 'none' }}>
                Analytics
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8" style={{ maxWidth: '1280px', margin: '0 auto', padding: '2rem 1rem' }}>
        {/* Header */}
        <div className="flex justify-between items-center mb-8" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <div>
            <h1 className="text-3xl font-bold text-gray-900" style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#111827', marginBottom: '0.5rem' }}>
              Your Chatbots
            </h1>
            <p className="text-gray-600" style={{ color: '#4b5563' }}>
              Manage and monitor your AI assistants
            </p>
          </div>
          <Link
            to="/chatbots/new"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 flex items-center"
            style={{ backgroundColor: '#2563eb', color: 'white', padding: '0.75rem 1.5rem', borderRadius: '0.5rem', fontWeight: '500', textDecoration: 'none', display: 'flex', alignItems: 'center' }}
          >
            <span className="mr-2" style={{ marginRight: '0.5rem' }}>+</span>
            Create New Chatbot
          </Link>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6" style={{ backgroundColor: 'white', borderRadius: '0.5rem', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)', border: '1px solid #e5e7eb', padding: '1.5rem', marginBottom: '1.5rem' }}>
          <div className="flex flex-col sm:flex-row gap-4" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {/* Search */}
            <div className="flex-1" style={{ flex: 1 }}>
              <input
                type="text"
                placeholder="Search chatbots..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                style={{ width: '100%', padding: '0.5rem 1rem', border: '1px solid #d1d5db', borderRadius: '0.5rem', fontSize: '1rem' }}
              />
            </div>
            
            {/* Status Filter */}
            <div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                style={{ padding: '0.5rem 1rem', border: '1px solid #d1d5db', borderRadius: '0.5rem', fontSize: '1rem' }}
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="training">Training</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
        </div>

        {/* Chatbots Grid */}
        {filteredChatbots.length === 0 ? (
          <div className="text-center py-12" style={{ textAlign: 'center', padding: '3rem 0' }}>
            <div className="text-6xl mb-4" style={{ fontSize: '3.75rem', marginBottom: '1rem' }}>🤖</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2" style={{ fontSize: '1.125rem', fontWeight: '500', color: '#111827', marginBottom: '0.5rem' }}>
              {searchTerm || statusFilter !== 'all' ? 'No chatbots found' : 'No chatbots yet'}
            </h3>
            <p className="text-gray-600 mb-6" style={{ color: '#4b5563', marginBottom: '1.5rem' }}>
              {searchTerm || statusFilter !== 'all' 
                ? 'Try adjusting your search or filters'
                : 'Create your first AI assistant to get started'
              }
            </p>
            {(!searchTerm && statusFilter === 'all') && (
              <Link
                to="/chatbots/new"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700"
                style={{ backgroundColor: '#2563eb', color: 'white', padding: '0.75rem 1.5rem', borderRadius: '0.5rem', fontWeight: '500', textDecoration: 'none' }}
              >
                Create Your First Chatbot
              </Link>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', gap: '1.5rem' }}>
            {filteredChatbots.map((bot) => {
              const statusColor = getStatusColor(bot.status)
              
              return (
                <div key={bot.id} className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow" style={{ backgroundColor: 'white', borderRadius: '0.5rem', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)', border: '1px solid #e5e7eb', transition: 'box-shadow 0.2s' }}>
                  {/* Card Header */}
                  <div className="p-6 border-b border-gray-200" style={{ padding: '1.5rem', borderBottom: '1px solid #e5e7eb' }}>
                    <div className="flex items-start justify-between" style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                      <div className="flex items-start" style={{ display: 'flex', alignItems: 'flex-start' }}>
                        <div className="flex-shrink-0 mr-3" style={{ flexShrink: 0, marginRight: '0.75rem' }}>
                          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center" style={{ width: '3rem', height: '3rem', backgroundColor: '#dbeafe', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <span style={{ fontSize: '1.5rem' }}>{getTypeIcon(bot.type)}</span>
                          </div>
                        </div>
                        <div className="flex-1" style={{ flex: 1 }}>
                          <h3 className="text-lg font-medium text-gray-900" style={{ fontSize: '1.125rem', fontWeight: '500', color: '#111827', marginBottom: '0.25rem' }}>
                            {bot.name}
                          </h3>
                          <p className="text-gray-600 text-sm" style={{ color: '#4b5563', fontSize: '0.875rem' }}>
                            {bot.description}
                          </p>
                        </div>
                      </div>
                      
                      {/* Status Badge */}
                      <div className="flex items-center px-2 py-1 rounded-full text-xs font-medium" style={{ display: 'flex', alignItems: 'center', padding: '0.25rem 0.5rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: '500', backgroundColor: statusColor.bg, color: statusColor.text }}>
                        <div className="w-2 h-2 rounded-full mr-1" style={{ width: '0.5rem', height: '0.5rem', borderRadius: '50%', marginRight: '0.25rem', backgroundColor: statusColor.dot }}></div>
                        {bot.status}
                      </div>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="p-6 border-b border-gray-200" style={{ padding: '1.5rem', borderBottom: '1px solid #e5e7eb' }}>
                    <div className="grid grid-cols-3 gap-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
                      <div className="text-center" style={{ textAlign: 'center' }}>
                        <p className="text-2xl font-bold text-gray-900" style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#111827' }}>
                          {bot.totalQuestions}
                        </p>
                        <p className="text-xs text-gray-600" style={{ fontSize: '0.75rem', color: '#4b5563' }}>
                          Questions
                        </p>
                      </div>
                      <div className="text-center" style={{ textAlign: 'center' }}>
                        <p className="text-2xl font-bold text-gray-900" style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#111827' }}>
                          {bot.successRate}%
                        </p>
                        <p className="text-xs text-gray-600" style={{ fontSize: '0.75rem', color: '#4b5563' }}>
                          Success Rate
                        </p>
                      </div>
                      <div className="text-center" style={{ textAlign: 'center' }}>
                        <p className="text-2xl font-bold text-gray-900" style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#111827' }}>
                          {bot.sources}
                        </p>
                        <p className="text-xs text-gray-600" style={{ fontSize: '0.75rem', color: '#4b5563' }}>
                          Sources
                        </p>
                      </div>
                    </div>
                    
                    <div className="mt-4 text-xs text-gray-500" style={{ marginTop: '1rem', fontSize: '0.75rem', color: '#6b7280' }}>
                      Last used: {bot.lastUsed} • Created: {new Date(bot.createdAt).toLocaleDateString()}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="p-6" style={{ padding: '1.5rem' }}>
                    <div className="flex items-center justify-between" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div className="flex items-center space-x-3" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <Link
                          to={`/chatbots/${bot.id}`}
                          className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                          style={{ color: '#2563eb', textDecoration: 'none', fontSize: '0.875rem', fontWeight: '500' }}
                        >
                          View Details
                        </Link>
                        <Link
                          to={`/chatbots/${bot.id}/settings`}
                          className="text-gray-600 hover:text-gray-700 text-sm"
                          style={{ color: '#4b5563', textDecoration: 'none', fontSize: '0.875rem' }}
                        >
                          Settings
                        </Link>
                      </div>
                      
                      <div className="flex items-center space-x-2" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <button
                          onClick={() => handleToggleStatus(bot.id)}
                          className={`px-3 py-1 rounded text-xs font-medium ${
                            bot.status === 'active' 
                              ? 'bg-red-100 text-red-700 hover:bg-red-200' 
                              : 'bg-green-100 text-green-700 hover:bg-green-200'
                          }`}
                          style={{
                            padding: '0.25rem 0.75rem',
                            borderRadius: '0.25rem',
                            fontSize: '0.75rem',
                            fontWeight: '500',
                            border: 'none',
                            cursor: 'pointer',
                            backgroundColor: bot.status === 'active' ? '#fef2f2' : '#f0fdf4',
                            color: bot.status === 'active' ? '#b91c1c' : '#15803d'
                          }}
                        >
                          {bot.status === 'active' ? 'Deactivate' : 'Activate'}
                        </button>
                        
                        <button
                          onClick={() => handleDeleteBot(bot.id)}
                          className="px-3 py-1 bg-red-100 text-red-700 rounded text-xs font-medium hover:bg-red-200"
                          style={{ padding: '0.25rem 0.75rem', backgroundColor: '#fef2f2', color: '#b91c1c', borderRadius: '0.25rem', fontSize: '0.75rem', fontWeight: '500', border: 'none', cursor: 'pointer' }}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default Chatbots