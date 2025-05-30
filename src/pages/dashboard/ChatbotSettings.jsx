import { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'

const ChatbotSettings = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('general')
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [settings, setSettings] = useState({
    // General Settings
    name: '',
    description: '',
    status: 'active',
    
    // AI Configuration
    model: 'gpt-4',
    temperature: 0.7,
    maxTokens: 1000,
    systemPrompt: '',
    responseLanguage: 'en',
    
    // Appearance
    theme: 'light',
    position: 'bottom-right',
    primaryColor: '#2563eb',
    botName: 'Assistant',
    welcomeMessage: 'Hi! How can I help you today?',
    placeholder: 'Type your question...',
    
    // Behavior
    allowFeedback: true,
    showSources: true,
    collectEmail: false,
    rateLimitPerHour: 100,
    enableAnalytics: true,
    
    // Advanced
    customCSS: '',
    webhookUrl: '',
    fallbackMessage: "I'm sorry, I don't have enough information to answer that question.",
    confidenceThreshold: 0.7
  })

  const tabs = [
    { id: 'general', name: 'General', icon: '⚙️' },
    { id: 'ai', name: 'AI Configuration', icon: '🤖' },
    { id: 'appearance', name: 'Appearance', icon: '🎨' },
    { id: 'behavior', name: 'Behavior', icon: '📋' },
    { id: 'advanced', name: 'Advanced', icon: '🔧' }
  ]

  useEffect(() => {
    // Mock loading settings
    setTimeout(() => {
      setSettings(prev => ({
        ...prev,
        name: 'API Documentation Bot',
        description: 'Helps users navigate our REST API documentation',
        systemPrompt: 'You are a helpful API documentation assistant. Always provide accurate information with code examples when relevant.'
      }))
      setIsLoading(false)
    }, 1000)
  }, [id])

  const handleInputChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const handleSave = async () => {
    setIsSaving(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      console.log('Saving settings:', settings)
      
      // Show success message or redirect
      alert('Settings saved successfully!')
      
    } catch (error) {
      alert('Failed to save settings. Please try again.')
    } finally {
      setIsSaving(false)
    }
  }

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all settings to default? This cannot be undone.')) {
      // Reset to defaults
      setSettings(prev => ({
        ...prev,
        model: 'gpt-4',
        temperature: 0.7,
        maxTokens: 1000,
        theme: 'light',
        position: 'bottom-right',
        primaryColor: '#2563eb',
        allowFeedback: true,
        showSources: true,
        collectEmail: false,
        rateLimitPerHour: 100,
        enableAnalytics: true
      }))
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading settings...</p>
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
                {settings.name} Settings
              </h1>
              <p className="text-gray-600" style={{ color: '#4b5563' }}>
                Configure your chatbot's behavior, appearance, and AI settings
              </p>
            </div>
            
            <div className="flex items-center space-x-3" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <button
                onClick={handleReset}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                style={{ padding: '0.5rem 1rem', color: '#4b5563', border: '1px solid #d1d5db', borderRadius: '0.5rem', backgroundColor: 'white', cursor: 'pointer' }}
              >
                Reset to Defaults
              </button>
              
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  padding: '0.5rem 1.5rem',
                  backgroundColor: isSaving ? '#9ca3af' : '#2563eb',
                  color: 'white',
                  borderRadius: '0.5rem',
                  fontWeight: '500',
                  border: 'none',
                  cursor: isSaving ? 'not-allowed' : 'pointer',
                  opacity: isSaving ? 0.5 : 1
                }}
              >
                {isSaving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8" style={{ maxWidth: '1280px', margin: '0 auto', padding: '2rem 1rem' }}>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8" style={{ display: 'grid', gridTemplateColumns: '1fr 3fr', gap: '2rem' }}>
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <nav className="space-y-1" style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg w-full text-left ${
                    activeTab === tab.id
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '0.5rem 0.75rem',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    borderRadius: '0.5rem',
                    width: '100%',
                    textAlign: 'left',
                    backgroundColor: activeTab === tab.id ? '#dbeafe' : 'transparent',
                    color: activeTab === tab.id ? '#1d4ed8' : '#4b5563',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  <span className="mr-3" style={{ marginRight: '0.75rem' }}>{tab.icon}</span>
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm border" style={{ backgroundColor: 'white', borderRadius: '0.5rem', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)', border: '1px solid #e5e7eb' }}>
              <div className="p-6" style={{ padding: '1.5rem' }}>
                {/* General Settings */}
                {activeTab === 'general' && (
                  <div className="space-y-6" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-4" style={{ fontSize: '1.125rem', fontWeight: '500', color: '#111827', marginBottom: '1rem' }}>
                        General Settings
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2" style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>
                          Chatbot Name
                        </label>
                        <input
                          type="text"
                          value={settings.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          style={{ width: '100%', padding: '0.5rem 0.75rem', border: '1px solid #d1d5db', borderRadius: '0.5rem', fontSize: '1rem' }}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2" style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>
                          Status
                        </label>
                        <select
                          value={settings.status}
                          onChange={(e) => handleInputChange('status', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          style={{ width: '100%', padding: '0.5rem 0.75rem', border: '1px solid #d1d5db', borderRadius: '0.5rem', fontSize: '1rem' }}
                        >
                          <option value="active">Active</option>
                          <option value="inactive">Inactive</option>
                          <option value="training">Training</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2" style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>
                        Description
                      </label>
                      <textarea
                        value={settings.description}
                        onChange={(e) => handleInputChange('description', e.target.value)}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        style={{ width: '100%', padding: '0.5rem 0.75rem', border: '1px solid #d1d5db', borderRadius: '0.5rem', fontSize: '1rem', resize: 'vertical' }}
                        placeholder="Describe what your chatbot does..."
                      />
                    </div>
                  </div>
                )}

                {/* AI Configuration */}
                {activeTab === 'ai' && (
                  <div className="space-y-6" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-4" style={{ fontSize: '1.125rem', fontWeight: '500', color: '#111827', marginBottom: '1rem' }}>
                        AI Configuration
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2" style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>
                          AI Model
                        </label>
                        <select
                          value={settings.model}
                          onChange={(e) => handleInputChange('model', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          style={{ width: '100%', padding: '0.5rem 0.75rem', border: '1px solid #d1d5db', borderRadius: '0.5rem', fontSize: '1rem' }}
                        >
                          <option value="gpt-4">GPT-4 (Recommended)</option>
                          <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
                          <option value="claude-3">Claude 3</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2" style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>
                          Creativity Level
                        </label>
                        <select
                          value={settings.temperature}
                          onChange={(e) => handleInputChange('temperature', parseFloat(e.target.value))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          style={{ width: '100%', padding: '0.5rem 0.75rem', border: '1px solid #d1d5db', borderRadius: '0.5rem', fontSize: '1rem' }}
                        >
                          <option value={0.1}>Very Precise (0.1)</option>
                          <option value={0.3}>Precise (0.3)</option>
                          <option value={0.7}>Balanced (0.7)</option>
                          <option value={1.0}>Creative (1.0)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2" style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>
                          Max Response Length
                        </label>
                        <select
                          value={settings.maxTokens}
                          onChange={(e) => handleInputChange('maxTokens', parseInt(e.target.value))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          style={{ width: '100%', padding: '0.5rem 0.75rem', border: '1px solid #d1d5db', borderRadius: '0.5rem', fontSize: '1rem' }}
                        >
                          <option value={500}>Short (500 tokens)</option>
                          <option value={1000}>Medium (1000 tokens)</option>
                          <option value={2000}>Long (2000 tokens)</option>
                          <option value={4000}>Very Long (4000 tokens)</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2" style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>
                        System Prompt
                      </label>
                      <textarea
                        value={settings.systemPrompt}
                        onChange={(e) => handleInputChange('systemPrompt', e.target.value)}
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        style={{ width: '100%', padding: '0.5rem 0.75rem', border: '1px solid #d1d5db', borderRadius: '0.5rem', fontSize: '1rem', resize: 'vertical' }}
                        placeholder="Define how your chatbot should behave..."
                      />
                      <p className="text-sm text-gray-500 mt-1" style={{ fontSize: '0.875rem', color: '#6b7280', marginTop: '0.25rem' }}>
                        This instruction tells the AI how to behave and respond to users.
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2" style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>
                        Response Language
                      </label>
                      <select
                        value={settings.responseLanguage}
                        onChange={(e) => handleInputChange('responseLanguage', e.target.value)}
                        className="w-full md:w-1/3 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        style={{ width: '100%', maxWidth: '300px', padding: '0.5rem 0.75rem', border: '1px solid #d1d5db', borderRadius: '0.5rem', fontSize: '1rem' }}
                      >
                        <option value="en">English</option>
                        <option value="es">Spanish</option>
                        <option value="fr">French</option>
                        <option value="de">German</option>
                        <option value="auto">Auto-detect</option>
                      </select>
                    </div>
                  </div>
                )}

                {/* Appearance */}
                {activeTab === 'appearance' && (
                  <div className="space-y-6" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-4" style={{ fontSize: '1.125rem', fontWeight: '500', color: '#111827', marginBottom: '1rem' }}>
                        Appearance & Branding
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2" style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>
                          Theme
                        </label>
                        <select
                          value={settings.theme}
                          onChange={(e) => handleInputChange('theme', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          style={{ width: '100%', padding: '0.5rem 0.75rem', border: '1px solid #d1d5db', borderRadius: '0.5rem', fontSize: '1rem' }}
                        >
                          <option value="light">Light</option>
                          <option value="dark">Dark</option>
                          <option value="auto">Auto (System)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2" style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>
                          Widget Position
                        </label>
                        <select
                          value={settings.position}
                          onChange={(e) => handleInputChange('position', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          style={{ width: '100%', padding: '0.5rem 0.75rem', border: '1px solid #d1d5db', borderRadius: '0.5rem', fontSize: '1rem' }}
                        >
                          <option value="bottom-right">Bottom Right</option>
                          <option value="bottom-left">Bottom Left</option>
                          <option value="top-right">Top Right</option>
                          <option value="top-left">Top Left</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2" style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>
                          Primary Color
                        </label>
                        <div className="flex items-center space-x-3" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                          <input
                            type="color"
                            value={settings.primaryColor}
                            onChange={(e) => handleInputChange('primaryColor', e.target.value)}
                            className="w-12 h-10 border border-gray-300 rounded cursor-pointer"
                            style={{ width: '3rem', height: '2.5rem', border: '1px solid #d1d5db', borderRadius: '0.25rem', cursor: 'pointer' }}
                          />
                          <input
                            type="text"
                            value={settings.primaryColor}
                            onChange={(e) => handleInputChange('primaryColor', e.target.value)}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            style={{ flex: 1, padding: '0.5rem 0.75rem', border: '1px solid #d1d5db', borderRadius: '0.5rem', fontSize: '1rem' }}
                            placeholder="#2563eb"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2" style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>
                          Bot Display Name
                        </label>
                        <input
                          type="text"
                          value={settings.botName}
                          onChange={(e) => handleInputChange('botName', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          style={{ width: '100%', padding: '0.5rem 0.75rem', border: '1px solid #d1d5db', borderRadius: '0.5rem', fontSize: '1rem' }}
                          placeholder="Assistant"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2" style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>
                        Welcome Message
                      </label>
                      <textarea
                        value={settings.welcomeMessage}
                        onChange={(e) => handleInputChange('welcomeMessage', e.target.value)}
                        rows={2}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        style={{ width: '100%', padding: '0.5rem 0.75rem', border: '1px solid #d1d5db', borderRadius: '0.5rem', fontSize: '1rem', resize: 'vertical' }}
                        placeholder="Hi! How can I help you today?"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2" style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>
                        Input Placeholder
                      </label>
                      <input
                        type="text"
                        value={settings.placeholder}
                        onChange={(e) => handleInputChange('placeholder', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        style={{ width: '100%', padding: '0.5rem 0.75rem', border: '1px solid #d1d5db', borderRadius: '0.5rem', fontSize: '1rem' }}
                        placeholder="Type your question..."
                      />
                    </div>

                    {/* Preview */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3" style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.75rem' }}>
                        Preview
                      </label>
                      <div className="bg-gray-100 rounded-lg p-6" style={{ backgroundColor: '#f3f4f6', borderRadius: '0.5rem', padding: '1.5rem' }}>
                        <div className="max-w-sm mx-auto bg-white rounded-lg shadow-lg" style={{ maxWidth: '24rem', margin: '0 auto', backgroundColor: 'white', borderRadius: '0.5rem', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}>
                          <div className="p-4 border-b" style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb', backgroundColor: settings.primaryColor, color: 'white', borderRadius: '0.5rem 0.5rem 0 0' }}>
                            <h4 className="font-medium" style={{ fontWeight: '500' }}>{settings.botName}</h4>
                          </div>
                          <div className="p-4" style={{ padding: '1rem' }}>
                            <div className="bg-gray-100 rounded-lg p-3 mb-3" style={{ backgroundColor: '#f3f4f6', borderRadius: '0.5rem', padding: '0.75rem', marginBottom: '0.75rem' }}>
                              <p className="text-sm" style={{ fontSize: '0.875rem' }}>{settings.welcomeMessage}</p>
                            </div>
                            <input
                              type="text"
                              placeholder={settings.placeholder}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                              style={{ width: '100%', padding: '0.5rem 0.75rem', border: '1px solid #d1d5db', borderRadius: '0.5rem', fontSize: '0.875rem' }}
                              disabled
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Behavior */}
                {activeTab === 'behavior' && (
                 <div className="space-y-6" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                   <div>
                     <h3 className="text-lg font-medium text-gray-900 mb-4" style={{ fontSize: '1.125rem', fontWeight: '500', color: '#111827', marginBottom: '1rem' }}>
                       Behavior Settings
                     </h3>
                   </div>

                   {/* Toggle Settings */}
                   <div className="space-y-4" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                     <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', border: '1px solid #e5e7eb', borderRadius: '0.5rem' }}>
                       <div>
                         <h4 className="font-medium text-gray-900" style={{ fontWeight: '500', color: '#111827', marginBottom: '0.25rem' }}>
                           Allow User Feedback
                         </h4>
                         <p className="text-sm text-gray-600" style={{ fontSize: '0.875rem', color: '#4b5563' }}>
                           Let users rate responses with thumbs up/down
                         </p>
                       </div>
                       <button
                         onClick={() => handleInputChange('allowFeedback', !settings.allowFeedback)}
                         className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                           settings.allowFeedback ? 'bg-blue-600' : 'bg-gray-200'
                         }`}
                         style={{
                           position: 'relative',
                           display: 'inline-flex',
                           height: '1.5rem',
                           width: '2.75rem',
                           alignItems: 'center',
                           borderRadius: '9999px',
                           backgroundColor: settings.allowFeedback ? '#2563eb' : '#e5e7eb',
                           border: 'none',
                           cursor: 'pointer'
                         }}
                       >
                         <span
                           className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                             settings.allowFeedback ? 'translate-x-6' : 'translate-x-1'
                           }`}
                           style={{
                             display: 'inline-block',
                             height: '1rem',
                             width: '1rem',
                             borderRadius: '50%',
                             backgroundColor: 'white',
                             transform: settings.allowFeedback ? 'translateX(1.5rem)' : 'translateX(0.25rem)',
                             transition: 'transform 0.2s'
                           }}
                         />
                       </button>
                     </div>

                     <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', border: '1px solid #e5e7eb', borderRadius: '0.5rem' }}>
                       <div>
                         <h4 className="font-medium text-gray-900" style={{ fontWeight: '500', color: '#111827', marginBottom: '0.25rem' }}>
                           Show Source Citations
                         </h4>
                         <p className="text-sm text-gray-600" style={{ fontSize: '0.875rem', color: '#4b5563' }}>
                           Display sources used to generate responses
                         </p>
                       </div>
                       <button
                         onClick={() => handleInputChange('showSources', !settings.showSources)}
                         className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                           settings.showSources ? 'bg-blue-600' : 'bg-gray-200'
                         }`}
                         style={{
                           position: 'relative',
                           display: 'inline-flex',
                           height: '1.5rem',
                           width: '2.75rem',
                           alignItems: 'center',
                           borderRadius: '9999px',
                           backgroundColor: settings.showSources ? '#2563eb' : '#e5e7eb',
                           border: 'none',
                           cursor: 'pointer'
                         }}
                       >
                         <span
                           className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                             settings.showSources ? 'translate-x-6' : 'translate-x-1'
                           }`}
                           style={{
                             display: 'inline-block',
                             height: '1rem',
                             width: '1rem',
                             borderRadius: '50%',
                             backgroundColor: 'white',
                             transform: settings.showSources ? 'translateX(1.5rem)' : 'translateX(0.25rem)',
                             transition: 'transform 0.2s'
                           }}
                         />
                       </button>
                     </div>

                     <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', border: '1px solid #e5e7eb', borderRadius: '0.5rem' }}>
                       <div>
                         <h4 className="font-medium text-gray-900" style={{ fontWeight: '500', color: '#111827', marginBottom: '0.25rem' }}>
                           Collect Email Addresses
                         </h4>
                         <p className="text-sm text-gray-600" style={{ fontSize: '0.875rem', color: '#4b5563' }}>
                           Ask users for email before starting conversation
                         </p>
                       </div>
                       <button
                         onClick={() => handleInputChange('collectEmail', !settings.collectEmail)}
                         className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                           settings.collectEmail ? 'bg-blue-600' : 'bg-gray-200'
                         }`}
                         style={{
                           position: 'relative',
                           display: 'inline-flex',
                           height: '1.5rem',
                           width: '2.75rem',
                           alignItems: 'center',
                           borderRadius: '9999px',
                           backgroundColor: settings.collectEmail ? '#2563eb' : '#e5e7eb',
                           border: 'none',
                           cursor: 'pointer'
                         }}
                       >
                         <span
                           className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                             settings.collectEmail ? 'translate-x-6' : 'translate-x-1'
                           }`}
                           style={{
                             display: 'inline-block',
                             height: '1rem',
                             width: '1rem',
                             borderRadius: '50%',
                             backgroundColor: 'white',
                             transform: settings.collectEmail ? 'translateX(1.5rem)' : 'translateX(0.25rem)',
                             transition: 'transform 0.2s'
                           }}
                         />
                       </button>
                     </div>

                     <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', border: '1px solid #e5e7eb', borderRadius: '0.5rem' }}>
                       <div>
                         <h4 className="font-medium text-gray-900" style={{ fontWeight: '500', color: '#111827', marginBottom: '0.25rem' }}>
                           Enable Analytics
                         </h4>
                         <p className="text-sm text-gray-600" style={{ fontSize: '0.875rem', color: '#4b5563' }}>
                           Track usage and performance metrics
                         </p>
                       </div>
                       <button
                         onClick={() => handleInputChange('enableAnalytics', !settings.enableAnalytics)}
                         className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                           settings.enableAnalytics ? 'bg-blue-600' : 'bg-gray-200'
                         }`}
                         style={{
                           position: 'relative',
                           display: 'inline-flex',
                           height: '1.5rem',
                           width: '2.75rem',
                           alignItems: 'center',
                           borderRadius: '9999px',
                           backgroundColor: settings.enableAnalytics ? '#2563eb' : '#e5e7eb',
                           border: 'none',
                           cursor: 'pointer'
                         }}
                       >
                         <span
                           className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                             settings.enableAnalytics ? 'translate-x-6' : 'translate-x-1'
                           }`}
                           style={{
                             display: 'inline-block',
                             height: '1rem',
                             width: '1rem',
                             borderRadius: '50%',
                             backgroundColor: 'white',
                             transform: settings.enableAnalytics ? 'translateX(1.5rem)' : 'translateX(0.25rem)',
                             transition: 'transform 0.2s'
                           }}
                         />
                       </button>
                     </div>
                   </div>

                   {/* Rate Limiting */}
                   <div>
                     <label className="block text-sm font-medium text-gray-700 mb-2" style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>
                       Rate Limit (messages per hour per user)
                     </label>
                     <div className="flex items-center space-x-4" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                       <input
                         type="range"
                         min="10"
                         max="1000"
                         step="10"
                         value={settings.rateLimitPerHour}
                         onChange={(e) => handleInputChange('rateLimitPerHour', parseInt(e.target.value))}
                         className="flex-1"
                         style={{ flex: 1 }}
                       />
                       <span className="text-sm font-medium text-gray-900 min-w-16" style={{ fontSize: '0.875rem', fontWeight: '500', color: '#111827', minWidth: '4rem' }}>
                         {settings.rateLimitPerHour}
                       </span>
                     </div>
                     <p className="text-sm text-gray-500 mt-1" style={{ fontSize: '0.875rem', color: '#6b7280', marginTop: '0.25rem' }}>
                       Prevents abuse by limiting how many messages each user can send per hour
                     </p>
                   </div>
                 </div>
               )}

               {/* Advanced */}
               {activeTab === 'advanced' && (
                 <div className="space-y-6" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                   <div>
                     <h3 className="text-lg font-medium text-gray-900 mb-4" style={{ fontSize: '1.125rem', fontWeight: '500', color: '#111827', marginBottom: '1rem' }}>
                       Advanced Settings
                     </h3>
                   </div>

                   <div>
                     <label className="block text-sm font-medium text-gray-700 mb-2" style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>
                       Confidence Threshold
                     </label>
                     <div className="flex items-center space-x-4" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                       <input
                         type="range"
                         min="0.1"
                         max="1.0"
                         step="0.1"
                         value={settings.confidenceThreshold}
                         onChange={(e) => handleInputChange('confidenceThreshold', parseFloat(e.target.value))}
                         className="flex-1"
                         style={{ flex: 1 }}
                       />
                       <span className="text-sm font-medium text-gray-900 min-w-16" style={{ fontSize: '0.875rem', fontWeight: '500', color: '#111827', minWidth: '4rem' }}>
                         {settings.confidenceThreshold}
                       </span>
                     </div>
                     <p className="text-sm text-gray-500 mt-1" style={{ fontSize: '0.875rem', color: '#6b7280', marginTop: '0.25rem' }}>
                       Minimum confidence required before responding. Higher values = more accurate but fewer responses.
                     </p>
                   </div>

                   <div>
                     <label className="block text-sm font-medium text-gray-700 mb-2" style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>
                       Fallback Message
                     </label>
                     <textarea
                       value={settings.fallbackMessage}
                       onChange={(e) => handleInputChange('fallbackMessage', e.target.value)}
                       rows={3}
                       className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                       style={{ width: '100%', padding: '0.5rem 0.75rem', border: '1px solid #d1d5db', borderRadius: '0.5rem', fontSize: '1rem', resize: 'vertical' }}
                       placeholder="Message shown when the bot can't answer..."
                     />
                     <p className="text-sm text-gray-500 mt-1" style={{ fontSize: '0.875rem', color: '#6b7280', marginTop: '0.25rem' }}>
                       Displayed when the bot doesn't have enough information to answer
                     </p>
                   </div>

                   <div>
                     <label className="block text-sm font-medium text-gray-700 mb-2" style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>
                       Webhook URL (Optional)
                     </label>
                     <input
                       type="url"
                       value={settings.webhookUrl}
                       onChange={(e) => handleInputChange('webhookUrl', e.target.value)}
                       className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                       style={{ width: '100%', padding: '0.5rem 0.75rem', border: '1px solid #d1d5db', borderRadius: '0.5rem', fontSize: '1rem' }}
                       placeholder="https://your-site.com/webhook"
                     />
                     <p className="text-sm text-gray-500 mt-1" style={{ fontSize: '0.875rem', color: '#6b7280', marginTop: '0.25rem' }}>
                       Receive real-time notifications about conversations
                     </p>
                   </div>

                   <div>
                     <label className="block text-sm font-medium text-gray-700 mb-2" style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>
                       Custom CSS (Optional)
                     </label>
                     <textarea
                       value={settings.customCSS}
                       onChange={(e) => handleInputChange('customCSS', e.target.value)}
                       rows={6}
                       className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
                       style={{ width: '100%', padding: '0.5rem 0.75rem', border: '1px solid #d1d5db', borderRadius: '0.5rem', fontSize: '0.875rem', fontFamily: 'monospace', resize: 'vertical' }}
                       placeholder="/* Custom styles for your chatbot widget */
.chatbot-widget {
 /* Your custom styles here */
}"
                     />
                     <p className="text-sm text-gray-500 mt-1" style={{ fontSize: '0.875rem', color: '#6b7280', marginTop: '0.25rem' }}>
                       Advanced styling options for developers
                     </p>
                   </div>

                   <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4" style={{ backgroundColor: '#fffbeb', border: '1px solid #fde68a', borderRadius: '0.5rem', padding: '1rem' }}>
                     <div className="flex items-start" style={{ display: 'flex', alignItems: 'flex-start' }}>
                       <span className="text-yellow-600 mr-2" style={{ color: '#d97706', marginRight: '0.5rem' }}>⚠️</span>
                       <div>
                         <h4 className="font-medium text-yellow-800" style={{ fontWeight: '500', color: '#92400e', marginBottom: '0.25rem' }}>
                           Advanced Settings Warning
                         </h4>
                         <p className="text-yellow-700 text-sm" style={{ color: '#b45309', fontSize: '0.875rem' }}>
                           These settings are for advanced users. Incorrect configuration may affect your chatbot's performance.
                         </p>
                       </div>
                     </div>
                   </div>
                 </div>
               )}
             </div>

             {/* Sticky Save Bar */}
             <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4 rounded-b-lg" style={{ position: 'sticky', bottom: 0, backgroundColor: 'white', borderTop: '1px solid #e5e7eb', padding: '1rem', borderRadius: '0 0 0.5rem 0.5rem' }}>
               <div className="flex justify-between items-center" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                 <p className="text-sm text-gray-600" style={{ fontSize: '0.875rem', color: '#4b5563' }}>
                   Changes will be applied immediately after saving
                 </p>
                 <div className="flex items-center space-x-3" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                   <button
                     onClick={handleReset}
                     className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                     style={{ padding: '0.5rem 1rem', color: '#4b5563', border: '1px solid #d1d5db', borderRadius: '0.5rem', backgroundColor: 'white', cursor: 'pointer' }}
                   >
                     Reset
                   </button>
                   <button
                     onClick={handleSave}
                     disabled={isSaving}
                     className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                     style={{
                       padding: '0.5rem 1.5rem',
                       backgroundColor: isSaving ? '#9ca3af' : '#2563eb',
                       color: 'white',
                       borderRadius: '0.5rem',
                       fontWeight: '500',
                       border: 'none',
                       cursor: isSaving ? 'not-allowed' : 'pointer',
                       opacity: isSaving ? 0.5 : 1
                     }}
                   >
                     {isSaving ? 'Saving...' : 'Save Changes'}
                   </button>
                 </div>
               </div>
             </div>
           </div>
         </div>
       </div>
     </div>
   </div>
 )
}

export default ChatbotSettings