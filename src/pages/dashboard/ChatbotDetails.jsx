import { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'

const ChatbotDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [chatbot, setChatbot] = useState(null)
  const [activeTab, setActiveTab] = useState('overview')
  const [isLoading, setIsLoading] = useState(true)
  const [embedCodeCopied, setEmbedCodeCopied] = useState(false)

  // Mock chatbot data - in real app, fetch by ID
  const mockChatbot = {
    id: parseInt(id) || 1,
    name: 'API Documentation Bot',
    description: 'Helps users navigate our REST API documentation and provides code examples',
    status: 'active',
    type: 'documentation',
    createdAt: '2024-01-15T10:30:00Z',
    lastUsed: '2 hours ago',
    totalQuestions: 89,
    successRate: 94,
    avgResponseTime: '0.8s',
    sources: [
      { id: 1, name: 'REST API Documentation', type: 'website', url: 'https://api.example.com/docs', status: 'synced', lastSync: '1 hour ago' },
      { id: 2, name: 'Authentication Guide', type: 'pdf', size: '2.3 MB', status: 'synced', lastSync: '2 hours ago' },
      { id: 3, name: 'Code Examples', type: 'github', url: 'https://github.com/example/api-examples', status: 'syncing', lastSync: 'syncing...' },
      { id: 4, name: 'FAQ Document', type: 'markdown', size: '1.1 MB', status: 'synced', lastSync: '3 hours ago' },
      { id: 5, name: 'Error Reference', type: 'pdf', size: '0.8 MB', status: 'error', lastSync: 'Failed 1 hour ago' }
    ],
    recentQuestions: [
      { id: 1, question: 'How do I authenticate with the API?', answer: 'You can authenticate using API keys...', timestamp: '10 minutes ago', rating: 'positive' },
      { id: 2, question: 'What are the rate limits?', answer: 'The API has a rate limit of 1000 requests per hour...', timestamp: '25 minutes ago', rating: 'positive' },
      { id: 3, question: 'How to handle pagination?', answer: 'Pagination is handled using the offset and limit parameters...', timestamp: '1 hour ago', rating: 'neutral' },
      { id: 4, question: 'API endpoint for user data?', answer: 'The user data endpoint is /api/v1/users...', timestamp: '2 hours ago', rating: 'positive' },
      { id: 5, question: 'Error code 403 meaning?', answer: 'Error 403 indicates insufficient permissions...', timestamp: '3 hours ago', rating: 'negative' }
    ],
    settings: {
      model: 'gpt-4',
      temperature: 0.7,
      maxTokens: 1000,
      systemPrompt: 'You are a helpful API documentation assistant. Always provide accurate information with code examples when relevant.',
      isPublic: true,
      allowFeedback: true,
      customBranding: false
    },
    embedCode: `<script 
  src="https://chatdocs.ai/embed.js" 
  data-chatbot-id="${id}"
  data-theme="light"
  data-position="bottom-right">
</script>`,
    usage: {
      thisMonth: 156,
      lastMonth: 134,
      growth: 16
    }
  }

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setChatbot(mockChatbot)
      setIsLoading(false)
    }, 1000)
  }, [id])

  const copyEmbedCode = () => {
    navigator.clipboard.writeText(chatbot.embedCode)
    setEmbedCodeCopied(true)
    setTimeout(() => setEmbedCodeCopied(false), 2000)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
      case 'synced':
        return { bg: '#dcfce7', text: '#166534', dot: '#22c55e' }
      case 'training':
      case 'syncing':
        return { bg: '#fef3c7', text: '#92400e', dot: '#f59e0b' }
      case 'inactive':
      case 'error':
        return { bg: '#fee2e2', text: '#991b1b', dot: '#ef4444' }
      default:
        return { bg: '#f3f4f6', text: '#374151', dot: '#6b7280' }
    }
  }

  const getRatingIcon = (rating) => {
    switch (rating) {
      case 'positive':
        return '👍'
      case 'negative':
        return '👎'
      case 'neutral':
        return '😐'
      default:
        return '❓'
    }
  }

  const handleToggleStatus = () => {
    setChatbot(prev => ({
      ...prev,
      status: prev.status === 'active' ? 'inactive' : 'active'
    }))
  }

  const handleDeleteChatbot = () => {
    if (window.confirm('Are you sure you want to delete this chatbot? This action cannot be undone.')) {
      navigate('/chatbots')
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading chatbot details...</p>
        </div>
      </div>
    )
  }

  if (!chatbot) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Chatbot Not Found</h1>
          <p className="text-gray-600 mb-4">The chatbot you're looking for doesn't exist.</p>
          <Link to="/chatbots" className="text-blue-600 hover:text-blue-700">
            ← Back to Chatbots
          </Link>
        </div>
      </div>
    )
  }

  const statusColor = getStatusColor(chatbot.status)

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
            <div className="flex items-center space-x-4" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <Link to="/chatbots" className="text-gray-600 hover:text-gray-900" style={{ color: '#4b5563', textDecoration: 'none' }}>
                ← Back to Chatbots
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Header */}
      <div className="bg-white border-b border-gray-200" style={{ backgroundColor: 'white', borderBottom: '1px solid #e5e7eb' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6" style={{ maxWidth: '1280px', margin: '0 auto', padding: '1.5rem 1rem' }}>
          <div className="flex items-start justify-between" style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
            <div className="flex items-start" style={{ display: 'flex', alignItems: 'flex-start' }}>
              <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mr-4" style={{ width: '4rem', height: '4rem', backgroundColor: '#dbeafe', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '1rem' }}>
                <span style={{ fontSize: '2rem' }}>📚</span>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900" style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#111827', marginBottom: '0.5rem' }}>
                  {chatbot.name}
                </h1>
                <p className="text-gray-600 mb-2" style={{ color: '#4b5563', marginBottom: '0.5rem' }}>
                  {chatbot.description}
                </p>
                <div className="flex items-center" style={{ display: 'flex', alignItems: 'center' }}>
                  <div className="flex items-center px-3 py-1 rounded-full text-sm font-medium mr-4" style={{ display: 'flex', alignItems: 'center', padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.875rem', fontWeight: '500', marginRight: '1rem', backgroundColor: statusColor.bg, color: statusColor.text }}>
                    <div className="w-2 h-2 rounded-full mr-2" style={{ width: '0.5rem', height: '0.5rem', borderRadius: '50%', marginRight: '0.5rem', backgroundColor: statusColor.dot }}></div>
                    {chatbot.status}
                  </div>
                  <span className="text-sm text-gray-500" style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                    Created {new Date(chatbot.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <button
                onClick={handleToggleStatus}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  chatbot.status === 'active' 
                    ? 'bg-red-100 text-red-700 hover:bg-red-200' 
                    : 'bg-green-100 text-green-700 hover:bg-green-200'
                }`}
                style={{
                  padding: '0.5rem 1rem',
                  borderRadius: '0.5rem',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  border: 'none',
                  cursor: 'pointer',
                  backgroundColor: chatbot.status === 'active' ? '#fef2f2' : '#f0fdf4',
                  color: chatbot.status === 'active' ? '#b91c1c' : '#15803d'
                }}
              >
                {chatbot.status === 'active' ? 'Deactivate' : 'Activate'}
              </button>
              
              <Link
                to={`/chatbots/${chatbot.id}/settings`}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200"
                style={{ padding: '0.5rem 1rem', backgroundColor: '#f3f4f6', color: '#374151', borderRadius: '0.5rem', fontSize: '0.875rem', fontWeight: '500', textDecoration: 'none' }}
              >
                Settings
              </Link>
              
              <button
                onClick={handleDeleteChatbot}
                className="px-4 py-2 bg-red-100 text-red-700 rounded-lg text-sm font-medium hover:bg-red-200"
                style={{ padding: '0.5rem 1rem', backgroundColor: '#fef2f2', color: '#b91c1c', borderRadius: '0.5rem', fontSize: '0.875rem', fontWeight: '500', border: 'none', cursor: 'pointer' }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200" style={{ backgroundColor: 'white', borderBottom: '1px solid #e5e7eb' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1rem' }}>
          <nav className="flex space-x-8" style={{ display: 'flex', gap: '2rem' }}>
            {[
              { id: 'overview', name: 'Overview' },
              { id: 'conversations', name: 'Conversations' },
              { id: 'sources', name: 'Data Sources' },
              { id: 'embed', name: 'Embed Code' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
                style={{
                  padding: '1rem 0.25rem',
                  borderBottom: activeTab === tab.id ? '2px solid #3b82f6' : '2px solid transparent',
                  fontWeight: '500',
                  fontSize: '0.875rem',
                  color: activeTab === tab.id ? '#2563eb' : '#6b7280',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                {tab.name}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8" style={{ maxWidth: '1280px', margin: '0 auto', padding: '2rem 1rem' }}>
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
            {/* Stats Cards */}
            <div className="lg:col-span-2" style={{ gridColumn: 'span 2' }}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginBottom: '2rem' }}>
                <div className="bg-white rounded-lg shadow-sm border p-6" style={{ backgroundColor: 'white', borderRadius: '0.5rem', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)', border: '1px solid #e5e7eb', padding: '1.5rem' }}>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-gray-900" style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#111827' }}>
                      {chatbot.totalQuestions}
                    </p>
                    <p className="text-sm text-gray-600" style={{ fontSize: '0.875rem', color: '#4b5563' }}>
                      Total Questions
                    </p>
                    <p className="text-xs text-green-600 mt-1" style={{ fontSize: '0.75rem', color: '#059669', marginTop: '0.25rem' }}>
                      +{chatbot.usage.growth}% vs last month
                    </p>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border p-6" style={{ backgroundColor: 'white', borderRadius: '0.5rem', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)', border: '1px solid #e5e7eb', padding: '1.5rem' }}>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-gray-900" style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#111827' }}>
                      {chatbot.successRate}%
                    </p>
                    <p className="text-sm text-gray-600" style={{ fontSize: '0.875rem', color: '#4b5563' }}>
                      Success Rate
                    </p>
                    <p className="text-xs text-gray-500 mt-1" style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '0.25rem' }}>
                      Based on user feedback
                    </p>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border p-6" style={{ backgroundColor: 'white', borderRadius: '0.5rem', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)', border: '1px solid #e5e7eb', padding: '1.5rem' }}>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-gray-900" style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#111827' }}>
                      {chatbot.avgResponseTime}
                    </p>
                    <p className="text-sm text-gray-600" style={{ fontSize: '0.875rem', color: '#4b5563' }}>
                      Avg Response Time
                    </p>
                    <p className="text-xs text-green-600 mt-1" style={{ fontSize: '0.75rem', color: '#059669', marginTop: '0.25rem' }}>
                      Excellent performance
                    </p>
                  </div>
                </div>
              </div>

              {/* Recent Questions */}
              <div className="bg-white rounded-lg shadow-sm border" style={{ backgroundColor: 'white', borderRadius: '0.5rem', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)', border: '1px solid #e5e7eb' }}>
                <div className="p-6 border-b border-gray-200" style={{ padding: '1.5rem', borderBottom: '1px solid #e5e7eb' }}>
                  <h3 className="text-lg font-medium text-gray-900" style={{ fontSize: '1.125rem', fontWeight: '500', color: '#111827' }}>
                    Recent Questions
                  </h3>
                </div>
                <div className="divide-y divide-gray-200" style={{ borderTop: '1px solid #e5e7eb' }}>
                  {chatbot.recentQuestions.map((qa, index) => (
                    <div key={qa.id} className="p-6" style={{ padding: '1.5rem', borderTop: index > 0 ? '1px solid #e5e7eb' : 'none' }}>
                      <div className="flex items-start justify-between" style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                        <div className="flex-1" style={{ flex: 1 }}>
                          <p className="font-medium text-gray-900 mb-2" style={{ fontWeight: '500', color: '#111827', marginBottom: '0.5rem' }}>
                            {qa.question}
                          </p>
                          <p className="text-gray-600 text-sm mb-2" style={{ color: '#4b5563', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
                            {qa.answer}
                          </p>
                          <p className="text-xs text-gray-500" style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                            {qa.timestamp}
                          </p>
                        </div>
                        <div className="ml-4" style={{ marginLeft: '1rem' }}>
                          <span className="text-lg" style={{ fontSize: '1.125rem' }}>
                            {getRatingIcon(qa.rating)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div>
              <div className="bg-white rounded-lg shadow-sm border p-6" style={{ backgroundColor: 'white', borderRadius: '0.5rem', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)', border: '1px solid #e5e7eb', padding: '1.5rem' }}>
                <h3 className="text-lg font-medium text-gray-900 mb-4" style={{ fontSize: '1.125rem', fontWeight: '500', color: '#111827', marginBottom: '1rem' }}>
                  Quick Actions
                </h3>
                <div className="space-y-3" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <Link
                    to={`/chatbots/${chatbot.id}/test`}
                    className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50"
                    style={{ display: 'flex', alignItems: 'center', padding: '0.75rem', border: '1px solid #e5e7eb', borderRadius: '0.5rem', textDecoration: 'none' }}
                  >
                    <span className="text-xl mr-3" style={{ fontSize: '1.25rem', marginRight: '0.75rem' }}>💬</span>
                    <div>
                      <p className="text-sm font-medium text-gray-900" style={{ fontSize: '0.875rem', fontWeight: '500', color: '#111827' }}>
                        Test Chatbot
                      </p>
                      <p className="text-xs text-gray-500" style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                        Try it out yourself
                      </p>
                    </div>
                  </Link>

                  <button
                    onClick={() => setActiveTab('sources')}
                    className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 w-full text-left"
                    style={{ display: 'flex', alignItems: 'center', padding: '0.75rem', border: '1px solid #e5e7eb', borderRadius: '0.5rem', background: 'none', width: '100%', textAlign: 'left', cursor: 'pointer' }}
                  >
                    <span className="text-xl mr-3" style={{ fontSize: '1.25rem', marginRight: '0.75rem' }}>📄</span>
                    <div>
                      <p className="text-sm font-medium text-gray-900" style={{ fontSize: '0.875rem', fontWeight: '500', color: '#111827' }}>
                        Manage Sources
                      </p>
                      <p className="text-xs text-gray-500" style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                        {chatbot.sources.length} data sources
                      </p>
                    </div>
                  </button>

                  <button
                    onClick={() => setActiveTab('embed')}
                    className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 w-full text-left"
                    style={{ display: 'flex', alignItems: 'center', padding: '0.75rem', border: '1px solid #e5e7eb', borderRadius: '0.5rem', background: 'none', width: '100%', textAlign: 'left', cursor: 'pointer' }}
                  >
                    <span className="text-xl mr-3" style={{ fontSize: '1.25rem', marginRight: '0.75rem' }}>🔗</span>
                    <div>
                      <p className="text-sm font-medium text-gray-900" style={{ fontSize: '0.875rem', fontWeight: '500', color: '#111827' }}>
                        Get Embed Code
                      </p>
                      <p className="text-xs text-gray-500" style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                        Add to your website
                      </p>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'conversations' && (
          <div className="bg-white rounded-lg shadow-sm border" style={{ backgroundColor: 'white', borderRadius: '0.5rem', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)', border: '1px solid #e5e7eb' }}>
            <div className="p-6 border-b border-gray-200" style={{ padding: '1.5rem', borderBottom: '1px solid #e5e7eb' }}>
              <h3 className="text-lg font-medium text-gray-900" style={{ fontSize: '1.125rem', fontWeight: '500', color: '#111827' }}>
                All Conversations
              </h3>
            </div>
            <div className="p-6" style={{ padding: '1.5rem' }}>
              <div className="space-y-6" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {chatbot.recentQuestions.map((qa) => (
                  <div key={qa.id} className="border border-gray-200 rounded-lg p-4" style={{ border: '1px solid #e5e7eb', borderRadius: '0.5rem', padding: '1rem' }}>
                    <div className="flex items-start justify-between mb-3" style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                      <div className="flex items-center" style={{ display: 'flex', alignItems: 'center' }}>
                        <span className="text-lg mr-2" style={{ fontSize: '1.125rem', marginRight: '0.5rem' }}>
                          {getRatingIcon(qa.rating)}
                        </span>
                        <span className="text-xs text-gray-500" style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                          {qa.timestamp}
                        </span>
                      </div>
                    </div>
                    
                    <div className="space-y-3" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                      <div>
                        <p className="text-sm font-medium text-gray-700" style={{ fontSize: '0.875rem', fontWeight: '500', color: '#374151' }}>
                          Question:
                        </p>
                        <p className="text-gray-900 mt-1" style={{ color: '#111827', marginTop: '0.25rem' }}>
                          {qa.question}
                        </p>
                      </div>
                      
                      <div>
                        <p className="text-sm font-medium text-gray-700" style={{ fontSize: '0.875rem', fontWeight: '500', color: '#374151' }}>
                          Answer:
                        </p>
                        <p className="text-gray-600 mt-1" style={{ color: '#4b5563', marginTop: '0.25rem' }}>
                          {qa.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'sources' && (
          <div className="bg-white rounded-lg shadow-sm border" style={{ backgroundColor: 'white', borderRadius: '0.5rem', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)', border: '1px solid #e5e7eb' }}>
            <div className="p-6 border-b border-gray-200" style={{ padding: '1.5rem', borderBottom: '1px solid #e5e7eb' }}>
              <div className="flex justify-between items-center" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 className="text-lg font-medium text-gray-900" style={{ fontSize: '1.125rem', fontWeight: '500', color: '#111827' }}>
                  Data Sources ({chatbot.sources.length})
                </h3>
                <Link
                  to={`/chatbots/${chatbot.id}/sources/add`}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700"
                  style={{ backgroundColor: '#2563eb', color: 'white', padding: '0.5rem 1rem', borderRadius: '0.5rem', fontSize: '0.875rem', fontWeight: '500', textDecoration: 'none' }}
                >
                  Add Source
                </Link>
              </div>
            </div>
            <div className="divide-y divide-gray-200" style={{ borderTop: '1px solid #e5e7eb' }}>
             {chatbot.sources.map((source, index) => {
               const statusColor = getStatusColor(source.status)
               
               return (
                 <div key={source.id} className="p-6" style={{ padding: '1.5rem', borderTop: index > 0 ? '1px solid #e5e7eb' : 'none' }}>
                   <div className="flex items-start justify-between" style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                     <div className="flex items-start" style={{ display: 'flex', alignItems: 'flex-start' }}>
                       <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mr-3" style={{ width: '2.5rem', height: '2.5rem', backgroundColor: '#f3f4f6', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '0.75rem' }}>
                         <span style={{ fontSize: '1.25rem' }}>
                           {source.type === 'website' ? '🌐' : 
                            source.type === 'pdf' ? '📄' : 
                            source.type === 'github' ? '📂' : 
                            source.type === 'markdown' ? '📝' : '📄'}
                         </span>
                       </div>
                       <div className="flex-1" style={{ flex: 1 }}>
                         <h4 className="font-medium text-gray-900" style={{ fontWeight: '500', color: '#111827', marginBottom: '0.25rem' }}>
                           {source.name}
                         </h4>
                         {source.url && (
                           <p className="text-sm text-blue-600 mb-1" style={{ fontSize: '0.875rem', color: '#2563eb', marginBottom: '0.25rem' }}>
                             {source.url}
                           </p>
                         )}
                         {source.size && (
                           <p className="text-sm text-gray-500 mb-1" style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.25rem' }}>
                             Size: {source.size}
                           </p>
                         )}
                         <div className="flex items-center" style={{ display: 'flex', alignItems: 'center' }}>
                           <div className="flex items-center px-2 py-1 rounded-full text-xs font-medium mr-3" style={{ display: 'flex', alignItems: 'center', padding: '0.25rem 0.5rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: '500', marginRight: '0.75rem', backgroundColor: statusColor.bg, color: statusColor.text }}>
                             <div className="w-1.5 h-1.5 rounded-full mr-1" style={{ width: '0.375rem', height: '0.375rem', borderRadius: '50%', marginRight: '0.25rem', backgroundColor: statusColor.dot }}></div>
                             {source.status}
                           </div>
                           <span className="text-xs text-gray-500" style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                             Last sync: {source.lastSync}
                           </span>
                         </div>
                       </div>
                     </div>
                     
                     <div className="flex items-center space-x-2" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                       <button className="text-blue-600 hover:text-blue-700 text-sm" style={{ color: '#2563eb', background: 'none', border: 'none', fontSize: '0.875rem', cursor: 'pointer' }}>
                         Sync
                       </button>
                       <button className="text-gray-600 hover:text-gray-700 text-sm" style={{ color: '#4b5563', background: 'none', border: 'none', fontSize: '0.875rem', cursor: 'pointer' }}>
                         Edit
                       </button>
                       <button className="text-red-600 hover:text-red-700 text-sm" style={{ color: '#dc2626', background: 'none', border: 'none', fontSize: '0.875rem', cursor: 'pointer' }}>
                         Remove
                       </button>
                     </div>
                   </div>
                 </div>
               )
             })}
           </div>
         </div>
       )}

       {activeTab === 'embed' && (
         <div className="max-w-4xl">
           <div className="bg-white rounded-lg shadow-sm border" style={{ backgroundColor: 'white', borderRadius: '0.5rem', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)', border: '1px solid #e5e7eb' }}>
             <div className="p-6 border-b border-gray-200" style={{ padding: '1.5rem', borderBottom: '1px solid #e5e7eb' }}>
               <h3 className="text-lg font-medium text-gray-900" style={{ fontSize: '1.125rem', fontWeight: '500', color: '#111827' }}>
                 Embed Your Chatbot
               </h3>
               <p className="text-gray-600 mt-1" style={{ color: '#4b5563', marginTop: '0.25rem' }}>
                 Add this code to your website to enable the chatbot widget
               </p>
             </div>
             
             <div className="p-6" style={{ padding: '1.5rem' }}>
               <div className="space-y-6" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                 {/* Embed Code */}
                 <div>
                   <label className="block text-sm font-medium text-gray-700 mb-3" style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.75rem' }}>
                     Embed Code
                   </label>
                   <div className="relative" style={{ position: 'relative' }}>
                     <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm overflow-x-auto" style={{ backgroundColor: '#111827', color: '#f9fafb', padding: '1rem', borderRadius: '0.5rem', fontSize: '0.875rem', overflowX: 'auto' }}>
{chatbot.embedCode}
                     </pre>
                     <button
                       onClick={copyEmbedCode}
                       className="absolute top-2 right-2 bg-gray-700 text-white px-3 py-1 rounded text-xs hover:bg-gray-600"
                       style={{ position: 'absolute', top: '0.5rem', right: '0.5rem', backgroundColor: '#374151', color: 'white', padding: '0.25rem 0.75rem', borderRadius: '0.25rem', fontSize: '0.75rem', border: 'none', cursor: 'pointer' }}
                     >
                       {embedCodeCopied ? 'Copied!' : 'Copy'}
                     </button>
                   </div>
                 </div>

                 {/* Configuration Options */}
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                   <div>
                     <label className="block text-sm font-medium text-gray-700 mb-2" style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>
                       Widget Position
                     </label>
                     <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" style={{ width: '100%', padding: '0.5rem 0.75rem', border: '1px solid #d1d5db', borderRadius: '0.5rem', fontSize: '1rem' }}>
                       <option>Bottom Right</option>
                       <option>Bottom Left</option>
                       <option>Top Right</option>
                       <option>Top Left</option>
                     </select>
                   </div>
                   
                   <div>
                     <label className="block text-sm font-medium text-gray-700 mb-2" style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>
                       Theme
                     </label>
                     <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" style={{ width: '100%', padding: '0.5rem 0.75rem', border: '1px solid #d1d5db', borderRadius: '0.5rem', fontSize: '1rem' }}>
                       <option>Light</option>
                       <option>Dark</option>
                       <option>Auto</option>
                     </select>
                   </div>
                 </div>

                 {/* Preview */}
                 <div>
                   <label className="block text-sm font-medium text-gray-700 mb-3" style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.75rem' }}>
                     Preview
                   </label>
                   <div className="bg-gray-100 rounded-lg p-8 text-center" style={{ backgroundColor: '#f3f4f6', borderRadius: '0.5rem', padding: '2rem', textAlign: 'center' }}>
                     <div className="inline-block bg-blue-600 text-white px-4 py-2 rounded-full shadow-lg" style={{ display: 'inline-block', backgroundColor: '#2563eb', color: 'white', padding: '0.5rem 1rem', borderRadius: '9999px', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}>
                       💬 Chat with {chatbot.name}
                     </div>
                     <p className="text-gray-600 text-sm mt-3" style={{ color: '#4b5563', fontSize: '0.875rem', marginTop: '0.75rem' }}>
                       This is how your chatbot widget will appear to users
                     </p>
                   </div>
                 </div>

                 {/* Instructions */}
                 <div className="bg-blue-50 border border-blue-200 rounded-lg p-4" style={{ backgroundColor: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '0.5rem', padding: '1rem' }}>
                   <h4 className="font-medium text-blue-900 mb-2" style={{ fontWeight: '500', color: '#1e3a8a', marginBottom: '0.5rem' }}>
                     Installation Instructions
                   </h4>
                   <ol className="text-blue-800 text-sm space-y-1" style={{ color: '#1e40af', fontSize: '0.875rem', listStyle: 'decimal', paddingLeft: '1.25rem' }}>
                     <li>Copy the embed code above</li>
                     <li>Paste it before the closing &lt;/body&gt; tag on your website</li>
                     <li>The chatbot widget will automatically appear on your page</li>
                     <li>Customize the appearance using the options above</li>
                   </ol>
                 </div>
               </div>
             </div>
           </div>
         </div>
       )}
     </div>
   </div>
 )
}

export default ChatbotDetails