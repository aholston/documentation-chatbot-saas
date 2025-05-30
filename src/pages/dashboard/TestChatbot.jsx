import { useState, useEffect, useRef } from 'react'
import { Link, useParams } from 'react-router-dom'

const TestChatbot = () => {
  const { id } = useParams()
  const [chatbot, setChatbot] = useState(null)
  const [messages, setMessages] = useState([])
  const [inputMessage, setInputMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  // Mock chatbot data
  const mockChatbot = {
    id: parseInt(id) || 1,
    name: 'API Documentation Bot',
    description: 'Helps users navigate our REST API documentation',
    botName: 'Assistant',
    welcomeMessage: 'Hi! I\'m here to help you with our API documentation. What would you like to know?',
    placeholder: 'Ask me about our API...',
    primaryColor: '#2563eb',
    theme: 'light'
  }

  // Mock responses for different questions
  const mockResponses = {
    'hello': 'Hello! I\'m your API documentation assistant. How can I help you today?',
    'hi': 'Hi there! What would you like to know about our API?',
    'authentication': 'Our API uses API key authentication. You can authenticate by including your API key in the Authorization header: `Authorization: Bearer YOUR_API_KEY`. You can get your API key from your dashboard settings.',
    'auth': 'Our API uses API key authentication. You can authenticate by including your API key in the Authorization header: `Authorization: Bearer YOUR_API_KEY`. You can get your API key from your dashboard settings.',
    'rate limit': 'Our API has a rate limit of 1000 requests per hour for free accounts and 10,000 requests per hour for pro accounts. If you exceed this limit, you\'ll receive a 429 status code.',
    'endpoints': 'Our main API endpoints include:\n\n• GET /api/v1/users - Get user information\n• POST /api/v1/users - Create a new user\n• GET /api/v1/posts - Get all posts\n• POST /api/v1/posts - Create a new post\n\nEach endpoint requires authentication.',
    'error codes': 'Common error codes in our API:\n\n• 400 - Bad Request: Invalid request format\n• 401 - Unauthorized: Missing or invalid API key\n• 403 - Forbidden: Insufficient permissions\n• 404 - Not Found: Resource doesn\'t exist\n• 429 - Too Many Requests: Rate limit exceeded\n• 500 - Internal Server Error: Server issue',
    'pricing': 'Our API pricing tiers:\n\n**Free**: 1,000 requests/month\n**Pro**: $29/month for 100,000 requests\n**Enterprise**: Custom pricing for unlimited requests\n\nAll plans include full documentation access and email support.',
    'pagination': 'Our API uses cursor-based pagination. Include `limit` (max 100) and `cursor` parameters:\n\n```\nGET /api/v1/posts?limit=20&cursor=eyJpZCI6MTIz...\n```\n\nThe response includes a `next_cursor` field for the next page.',
    'webhooks': 'You can set up webhooks to receive real-time notifications. Configure them in your dashboard under Settings > Webhooks. We support events like user.created, post.updated, etc.',
    'default': 'I\'m not sure about that specific question. Could you try asking about authentication, rate limits, endpoints, error codes, pricing, pagination, or webhooks? You can also check our full documentation for more detailed information.'
  }

  useEffect(() => {
    // Mock loading
    setTimeout(() => {
      setChatbot(mockChatbot)
      setMessages([
        {
          id: 1,
          type: 'bot',
          content: mockChatbot.welcomeMessage,
          timestamp: new Date(),
          sources: []
        }
      ])
      setIsLoading(false)
    }, 1000)
  }, [id])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const findBestResponse = (input) => {
    const lowercaseInput = input.toLowerCase()
    
    // Find the best matching response
    for (const [key, response] of Object.entries(mockResponses)) {
      if (key !== 'default' && lowercaseInput.includes(key)) {
        return response
      }
    }
    
    return mockResponses.default
  }

  const simulateTyping = async (response) => {
    setIsTyping(true)
    
    // Simulate typing delay based on response length
    const typingDelay = Math.min(Math.max(response.length * 20, 1000), 3000)
    await new Promise(resolve => setTimeout(resolve, typingDelay))
    
    setIsTyping(false)
    
    // Add bot response
    const botMessage = {
      id: Date.now(),
      type: 'bot',
      content: response,
      timestamp: new Date(),
      sources: response.includes('authentication') || response.includes('endpoints') ? 
        ['API Documentation', 'Authentication Guide'] : []
    }
    
    setMessages(prev => [...prev, botMessage])
  }

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return

    // Add user message
    const userMessage = {
      id: Date.now(),
      type: 'user', 
      content: inputMessage,
      timestamp: new Date()
    }
    
    setMessages(prev => [...prev, userMessage])
    
    // Clear input
    const currentMessage = inputMessage
    setInputMessage('')
    
    // Get bot response
    const response = findBestResponse(currentMessage)
    await simulateTyping(response)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const formatTimestamp = (timestamp) => {
    return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  const handleQuickQuestion = (question) => {
    setInputMessage(question)
    inputRef.current?.focus()
  }

  const quickQuestions = [
    'How do I authenticate with the API?',
    'What are the rate limits?',
    'Show me the available endpoints',
    'What error codes might I see?'
  ]

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading chatbot...</p>
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
            <div className="flex items-center space-x-4" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <Link to={`/chatbots/${id}`} className="text-gray-600 hover:text-gray-900" style={{ color: '#4b5563', textDecoration: 'none' }}>
                ← Back to Chatbot
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Header */}
      <div className="bg-white border-b border-gray-200" style={{ backgroundColor: 'white', borderBottom: '1px solid #e5e7eb' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6" style={{ maxWidth: '1280px', margin: '0 auto', padding: '1.5rem 1rem' }}>
          <div className="flex items-center justify-between" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <h1 className="text-3xl font-bold text-gray-900" style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#111827', marginBottom: '0.5rem' }}>
                Test {chatbot.name}
              </h1>
              <p className="text-gray-600" style={{ color: '#4b5563' }}>
                Try out your chatbot and see how it responds to different questions
              </p>
            </div>
            
            <div className="flex items-center space-x-3" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Link
                to={`/chatbots/${id}/settings`}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                style={{ padding: '0.5rem 1rem', color: '#4b5563', border: '1px solid #d1d5db', borderRadius: '0.5rem', textDecoration: 'none', backgroundColor: 'white' }}
              >
                Settings
              </Link>
              
              <button
                onClick={() => {
                  setMessages([{
                    id: 1,
                    type: 'bot',
                    content: chatbot.welcomeMessage,
                    timestamp: new Date(),
                    sources: []
                  }])
                }}
                className="px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50"
                style={{ padding: '0.5rem 1rem', color: '#2563eb', border: '1px solid #2563eb', borderRadius: '0.5rem', backgroundColor: 'white', cursor: 'pointer' }}
              >
                Reset Chat
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8" style={{ maxWidth: '72rem', margin: '0 auto', padding: '2rem 1rem' }}>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8" style={{ display: 'grid', gridTemplateColumns: '3fr 1fr', gap: '2rem' }}>
          {/* Chat Interface */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm border flex flex-col" style={{ backgroundColor: 'white', borderRadius: '0.5rem', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)', border: '1px solid #e5e7eb', display: 'flex', flexDirection: 'column', height: '600px' }}>
              {/* Chat Header */}
              <div className="p-4 border-b border-gray-200" style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb', backgroundColor: chatbot.primaryColor, color: 'white', borderRadius: '0.5rem 0.5rem 0 0' }}>
                <div className="flex items-center" style={{ display: 'flex', alignItems: 'center' }}>
                  <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-3" style={{ width: '2rem', height: '2rem', backgroundColor: 'rgba(255, 255, 255, 0.2)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '0.75rem' }}>
                    <span style={{ fontSize: '1rem' }}>🤖</span>
                  </div>
                  <div>
                    <h3 className="font-medium" style={{ fontWeight: '500', marginBottom: '0.125rem' }}>
                      {chatbot.botName}
                    </h3>
                    <p className="text-sm opacity-90" style={{ fontSize: '0.875rem', opacity: 0.9 }}>
                      Online
                    </p>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4" style={{ flex: 1, overflowY: 'auto', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    style={{ display: 'flex', justifyContent: message.type === 'user' ? 'flex-end' : 'flex-start' }}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        message.type === 'user'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-900'
                      }`}
                      style={{
                        maxWidth: '24rem',
                        padding: '0.5rem 1rem',
                        borderRadius: '0.5rem',
                        backgroundColor: message.type === 'user' ? chatbot.primaryColor : '#f3f4f6',
                        color: message.type === 'user' ? 'white' : '#111827'
                      }}
                    >
                      <p className="text-sm" style={{ fontSize: '0.875rem', whiteSpace: 'pre-wrap' }}>
                        {message.content}
                      </p>
                      
                      {message.sources && message.sources.length > 0 && (
                        <div className="mt-2 pt-2 border-t border-gray-200" style={{ marginTop: '0.5rem', paddingTop: '0.5rem', borderTop: '1px solid #e5e7eb' }}>
                          <p className="text-xs text-gray-500 mb-1" style={{ fontSize: '0.75rem', color: '#6b7280', marginBottom: '0.25rem' }}>
                            Sources:
                          </p>
                          {message.sources.map((source, index) => (
                            <span
                              key={index}
                              className="inline-block text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded mr-1"
                              style={{ display: 'inline-block', fontSize: '0.75rem', backgroundColor: '#e5e7eb', color: '#374151', padding: '0.25rem 0.5rem', borderRadius: '0.25rem', marginRight: '0.25rem' }}
                            >
                              {source}
                            </span>
                          ))}
                        </div>
                      )}
                      
                      <p className="text-xs mt-1 opacity-70" style={{ fontSize: '0.75rem', marginTop: '0.25rem', opacity: 0.7 }}>
                        {formatTimestamp(message.timestamp)}
                      </p>
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex justify-start" style={{ display: 'flex', justifyContent: 'flex-start' }}>
                    <div className="bg-gray-100 px-4 py-2 rounded-lg" style={{ backgroundColor: '#f3f4f6', padding: '0.5rem 1rem', borderRadius: '0.5rem' }}>
                      <div className="flex space-x-1" style={{ display: 'flex', gap: '0.25rem' }}>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{ width: '0.5rem', height: '0.5rem', backgroundColor: '#9ca3af', borderRadius: '50%', animation: 'pulse 1.5s infinite' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{ width: '0.5rem', height: '0.5rem', backgroundColor: '#9ca3af', borderRadius: '50%', animation: 'pulse 1.5s infinite 0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{ width: '0.5rem', height: '0.5rem', backgroundColor: '#9ca3af', borderRadius: '50%', animation: 'pulse 1.5s infinite 0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="p-4 border-t border-gray-200" style={{ padding: '1rem', borderTop: '1px solid #e5e7eb' }}>
                <div className="flex space-x-2" style={{ display: 'flex', gap: '0.5rem' }}>
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder={chatbot.placeholder}
                    disabled={isTyping}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                    style={{ 
                      flex: 1, 
                      padding: '0.5rem 0.75rem', 
                      border: '1px solid #d1d5db', 
                      borderRadius: '0.5rem', 
                      fontSize: '1rem',
                      opacity: isTyping ? 0.5 : 1
                    }}
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!inputMessage.trim() || isTyping}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{
                      padding: '0.5rem 1rem',
                      backgroundColor: (!inputMessage.trim() || isTyping) ? '#9ca3af' : chatbot.primaryColor,
                      color: 'white',
                      borderRadius: '0.5rem',
                      border: 'none',
                      cursor: (!inputMessage.trim() || isTyping) ? 'not-allowed' : 'pointer',
                      opacity: (!inputMessage.trim() || isTyping) ? 0.5 : 1
                    }}
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="space-y-6" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {/* Quick Questions */}
              <div className="bg-white rounded-lg shadow-sm border p-6" style={{ backgroundColor: 'white', borderRadius: '0.5rem', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)', border: '1px solid #e5e7eb', padding: '1.5rem' }}>
                <h3 className="text-lg font-medium text-gray-900 mb-4" style={{ fontSize: '1.125rem', fontWeight: '500', color: '#111827', marginBottom: '1rem' }}>
                  Try These Questions
                </h3>
                <div className="space-y-2" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {quickQuestions.map((question, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuickQuestion(question)}
                      className="text-left text-sm text-blue-600 hover:text-blue-700 p-2 rounded hover:bg-blue-50 transition-colors"
                      style={{ textAlign: 'left', fontSize: '0.875rem', color: '#2563eb', padding: '0.5rem', borderRadius: '0.25rem', backgroundColor: 'transparent', border: 'none', cursor: 'pointer', width: '100%' }}
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>

              {/* Chat Stats */}
              <div className="bg-white rounded-lg shadow-sm border p-6" style={{ backgroundColor: 'white', borderRadius: '0.5rem', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)', border: '1px solid #e5e7eb', padding: '1.5rem' }}>
                <h3 className="text-lg font-medium text-gray-900 mb-4" style={{ fontSize: '1.125rem', fontWeight: '500', color: '#111827', marginBottom: '1rem' }}>
                  Test Session
                </h3>
                <div className="space-y-3" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <div className="flex justify-between" style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span className="text-gray-600" style={{ color: '#4b5563' }}>Messages:</span>
                    <span className="font-medium" style={{ fontWeight: '500' }}>{messages.length}</span>
                  </div>
                  <div className="flex justify-between" style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span className="text-gray-600" style={{ color: '#4b5563' }}>User questions:</span>
                    <span className="font-medium" style={{ fontWeight: '500' }}>
                      {messages.filter(m => m.type === 'user').length}
                    </span>
                  </div>
                  <div className="flex justify-between" style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span className="text-gray-600" style={{ color: '#4b5563' }}>Bot responses:</span>
                    <span className="font-medium" style={{ fontWeight: '500' }}>
                      {messages.filter(m => m.type === 'bot').length}
                    </span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="bg-white rounded-lg shadow-sm border p-6" style={{ backgroundColor: 'white', borderRadius: '0.5rem', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)', border: '1px solid #e5e7eb', padding: '1.5rem' }}>
                <h3 className="text-lg font-medium text-gray-900 mb-4" style={{ fontSize: '1.125rem', fontWeight: '500', color: '#111827', marginBottom: '1rem' }}>
                  Actions
                </h3>
                <div className="space-y-3" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <Link
                    to={`/chatbots/${id}/settings`}
                    className="w-full text-center px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50"
                    style={{ width: '100%', textAlign: 'center', padding: '0.5rem 1rem', color: '#2563eb', border: '1px solid #2563eb', borderRadius: '0.5rem', textDecoration: 'none', display: 'block' }}
                  >
                    Adjust Settings
                  </Link>
                  
                  <Link
                    to={`/chatbots/${id}/sources/add`}
                    className="w-full text-center px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                    style={{ width: '100%', textAlign: 'center', padding: '0.5rem 1rem', color: '#4b5563', border: '1px solid #d1d5db', borderRadius: '0.5rem', textDecoration: 'none', display: 'block' }}
                  >
                    Add More Data
                  </Link>
                  
                  <button
                    onClick={() => {
                      setMessages([{
                        id: 1,
                        type: 'bot',
                        content: chatbot.welcomeMessage,
                        timestamp: new Date(),
                        sources: []
                      }])
                      setInputMessage('')
                    }}
                    className="w-full px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                    style={{ width: '100%', padding: '0.5rem 1rem', color: '#4b5563', border: '1px solid #d1d5db', borderRadius: '0.5rem', backgroundColor: 'white', cursor: 'pointer' }}
                  >
                    Reset Chat
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TestChatbot