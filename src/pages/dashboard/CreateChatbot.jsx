import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const CreateChatbot = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    type: 'documentation', // documentation, support, sales
    sources: [],
    settings: {
      model: 'gpt-4',
      temperature: 0.7,
      maxTokens: 1000,
      systemPrompt: ''
    }
  })
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const navigate = useNavigate()

  const steps = [
    { id: 1, name: 'Basic Info', description: 'Name and purpose' },
    { id: 2, name: 'Data Sources', description: 'Upload content' },
    { id: 3, name: 'Configuration', description: 'AI settings' },
    { id: 4, name: 'Review', description: 'Finalize and deploy' }
  ]

  const chatbotTypes = [
    {
      id: 'documentation',
      name: 'Documentation Assistant',
      description: 'Help users navigate API docs, guides, and technical content',
      icon: '📚',
      examples: ['API documentation', 'User guides', 'Technical specs']
    },
    {
      id: 'support',
      name: 'Customer Support',
      description: 'Answer common questions and provide instant help',
      icon: '🎧',
      examples: ['FAQ responses', 'Troubleshooting', 'Product info']
    },
    {
      id: 'sales',
      name: 'Sales Assistant',
      description: 'Qualify leads and provide product information',
      icon: '💼',
      examples: ['Product demos', 'Pricing info', 'Lead qualification']
    }
  ]

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleTypeSelect = (type) => {
    setFormData(prev => ({
      ...prev,
      type
    }))
  }

  const validateStep = (step) => {
    const newErrors = {}
    
    if (step === 1) {
      if (!formData.name.trim()) {
        newErrors.name = 'Chatbot name is required'
      }
      if (!formData.description.trim()) {
        newErrors.description = 'Description is required'
      }
      if (!formData.type) {
        newErrors.type = 'Please select a chatbot type'
      }
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 4))
    }
  }

  const handleBack = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1))
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      console.log('Creating chatbot:', formData)
      
      // Navigate to chatbot details page
      navigate('/chatbots/new-bot-123')
      
    } catch (error) {
      setErrors({ submit: 'Failed to create chatbot. Please try again.' })
    } finally {
      setIsLoading(false)
    }
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Chatbot Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                style={{ width: '100%', padding: '0.5rem 0.75rem', border: '1px solid #d1d5db', borderRadius: '0.5rem', fontSize: '1rem' }}
                placeholder="e.g., API Documentation Assistant"
              />
              {errors.name && (
                <p className="text-red-600 text-sm mt-1" style={{ color: '#dc2626', fontSize: '0.875rem', marginTop: '0.25rem' }}>
                  {errors.name}
                </p>
              )}
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                style={{ width: '100%', padding: '0.5rem 0.75rem', border: '1px solid #d1d5db', borderRadius: '0.5rem', fontSize: '1rem', resize: 'vertical' }}
                placeholder="Describe what your chatbot will help users with..."
              />
              {errors.description && (
                <p className="text-red-600 text-sm mt-1" style={{ color: '#dc2626', fontSize: '0.875rem', marginTop: '0.25rem' }}>
                  {errors.description}
                </p>
              )}
            </div>

            {/* Type Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Chatbot Type
              </label>
              <div className="grid grid-cols-1 gap-4" style={{ display: 'grid', gap: '1rem' }}>
                {chatbotTypes.map((type) => (
                  <div
                    key={type.id}
                    onClick={() => handleTypeSelect(type.id)}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                      formData.type === type.id 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    style={{
                      padding: '1rem',
                      border: formData.type === type.id ? '2px solid #3b82f6' : '2px solid #e5e7eb',
                      backgroundColor: formData.type === type.id ? '#eff6ff' : 'white',
                      borderRadius: '0.5rem',
                      cursor: 'pointer'
                    }}
                  >
                    <div className="flex items-start" style={{ display: 'flex', alignItems: 'flex-start' }}>
                      <span className="text-2xl mr-3" style={{ fontSize: '1.5rem', marginRight: '0.75rem' }}>
                        {type.icon}
                      </span>
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900" style={{ fontWeight: '500', color: '#111827' }}>
                          {type.name}
                        </h3>
                        <p className="text-gray-600 text-sm mt-1" style={{ color: '#4b5563', fontSize: '0.875rem', marginTop: '0.25rem' }}>
                          {type.description}
                        </p>
                        <div className="flex flex-wrap gap-2 mt-2" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.5rem' }}>
                          {type.examples.map((example, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded"
                              style={{ padding: '0.25rem 0.5rem', backgroundColor: '#f3f4f6', color: '#4b5563', fontSize: '0.75rem', borderRadius: '0.25rem' }}
                            >
                              {example}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {errors.type && (
                <p className="text-red-600 text-sm mt-1" style={{ color: '#dc2626', fontSize: '0.875rem', marginTop: '0.25rem' }}>
                  {errors.type}
                </p>
              )}
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div className="text-center p-8 border-2 border-dashed border-gray-300 rounded-lg" style={{ textAlign: 'center', padding: '2rem', border: '2px dashed #d1d5db', borderRadius: '0.5rem' }}>
              <div className="text-4xl mb-4" style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>📄</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2" style={{ fontSize: '1.125rem', fontWeight: '500', color: '#111827', marginBottom: '0.5rem' }}>
                Upload Your Content
              </h3>
              <p className="text-gray-600 mb-4" style={{ color: '#4b5563', marginBottom: '1rem' }}>
                Add documents, websites, or files that your chatbot should learn from
              </p>
              <button
                type="button"
                className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700"
                style={{ backgroundColor: '#2563eb', color: 'white', padding: '0.5rem 1.5rem', borderRadius: '0.5rem', fontWeight: '500', border: 'none', cursor: 'pointer' }}
              >
                Choose Files
              </button>
            </div>
            
            <div className="text-sm text-gray-600" style={{ fontSize: '0.875rem', color: '#4b5563' }}>
              <p className="font-medium mb-2" style={{ fontWeight: '500', marginBottom: '0.5rem' }}>
                Supported formats:
              </p>
              <ul className="list-disc pl-5 space-y-1" style={{ paddingLeft: '1.25rem', listStyle: 'disc' }}>
                <li>PDF documents</li>
                <li>Markdown files (.md)</li>
                <li>Text files (.txt)</li>
                <li>Website URLs</li>
                <li>API documentation</li>
              </ul>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                AI Model
              </label>
              <select
                name="model"
                value={formData.settings.model}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  settings: { ...prev.settings, model: e.target.value }
                }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                style={{ width: '100%', padding: '0.5rem 0.75rem', border: '1px solid #d1d5db', borderRadius: '0.5rem', fontSize: '1rem' }}
              >
                <option value="gpt-4">GPT-4 (Recommended)</option>
                <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
                <option value="claude-3">Claude 3</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Response Style
              </label>
              <select
                name="temperature"
                value={formData.settings.temperature}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  settings: { ...prev.settings, temperature: parseFloat(e.target.value) }
                }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                style={{ width: '100%', padding: '0.5rem 0.75rem', border: '1px solid #d1d5db', borderRadius: '0.5rem', fontSize: '1rem' }}
              >
                <option value={0.3}>Precise (0.3)</option>
                <option value={0.7}>Balanced (0.7)</option>
                <option value={1.0}>Creative (1.0)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Custom Instructions (Optional)
              </label>
              <textarea
                name="systemPrompt"
                value={formData.settings.systemPrompt}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  settings: { ...prev.settings, systemPrompt: e.target.value }
                }))}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                style={{ width: '100%', padding: '0.5rem 0.75rem', border: '1px solid #d1d5db', borderRadius: '0.5rem', fontSize: '1rem', resize: 'vertical' }}
                placeholder="Add specific instructions for how your chatbot should behave..."
              />
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div className="bg-gray-50 rounded-lg p-6" style={{ backgroundColor: '#f9fafb', borderRadius: '0.5rem', padding: '1.5rem' }}>
              <h3 className="text-lg font-medium text-gray-900 mb-4" style={{ fontSize: '1.125rem', fontWeight: '500', color: '#111827', marginBottom: '1rem' }}>
                Review Your Chatbot
              </h3>
              
              <div className="space-y-3" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <div className="flex justify-between" style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span className="text-gray-600" style={{ color: '#4b5563' }}>Name:</span>
                  <span className="font-medium" style={{ fontWeight: '500' }}>{formData.name}</span>
                </div>
                <div className="flex justify-between" style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span className="text-gray-600" style={{ color: '#4b5563' }}>Type:</span>
                  <span className="font-medium" style={{ fontWeight: '500' }}>
                    {chatbotTypes.find(t => t.id === formData.type)?.name}
                  </span>
                </div>
                <div className="flex justify-between" style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span className="text-gray-600" style={{ color: '#4b5563' }}>Model:</span>
                  <span className="font-medium" style={{ fontWeight: '500' }}>{formData.settings.model}</span>
                </div>
                <div className="flex justify-between" style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span className="text-gray-600" style={{ color: '#4b5563' }}>Data Sources:</span>
                  <span className="font-medium" style={{ fontWeight: '500' }}>Ready to upload</span>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4" style={{ backgroundColor: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '0.5rem', padding: '1rem' }}>
              <div className="flex items-start" style={{ display: 'flex', alignItems: 'flex-start' }}>
                <span className="text-blue-600 mr-2" style={{ color: '#2563eb', marginRight: '0.5rem' }}>ℹ️</span>
                <div>
                  <p className="text-blue-800 text-sm font-medium" style={{ color: '#1e40af', fontSize: '0.875rem', fontWeight: '500' }}>
                    Ready to deploy!
                  </p>
                  <p className="text-blue-700 text-sm" style={{ color: '#1d4ed8', fontSize: '0.875rem' }}>
                    Your chatbot will be created and you can start adding content immediately.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
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
            <Link
              to="/dashboard"
              className="text-gray-600 hover:text-gray-900"
              style={{ color: '#4b5563', textDecoration: 'none' }}
            >
              ← Back to Dashboard
            </Link>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8" style={{ maxWidth: '56rem', margin: '0 auto', padding: '2rem 1rem' }}>
        {/* Header */}
        <div className="mb-8" style={{ marginBottom: '2rem' }}>
          <h1 className="text-3xl font-bold text-gray-900" style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#111827', marginBottom: '0.5rem' }}>
            Create New Chatbot
          </h1>
          <p className="text-gray-600" style={{ color: '#4b5563' }}>
            Build an AI assistant for your documentation and support needs.
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8" style={{ marginBottom: '2rem' }}>
          <nav aria-label="Progress">
            <ol className="flex items-center" style={{ display: 'flex', alignItems: 'center' }}>
              {steps.map((step, index) => (
                <li key={step.id} className={`relative ${index !== steps.length - 1 ? 'pr-8 sm:pr-20' : ''}`} style={{ position: 'relative', paddingRight: index !== steps.length - 1 ? '5rem' : '0' }}>
                  <div className="flex items-center" style={{ display: 'flex', alignItems: 'center' }}>
                    <div
                      className={`flex items-center justify-center w-8 h-8 rounded-full ${
                        currentStep >= step.id
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-200 text-gray-600'
                      }`}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '2rem',
                        height: '2rem',
                        borderRadius: '50%',
                        backgroundColor: currentStep >= step.id ? '#2563eb' : '#e5e7eb',
                        color: currentStep >= step.id ? 'white' : '#4b5563'
                      }}
                    >
                      {step.id}
                    </div>
                    <div className="ml-3" style={{ marginLeft: '0.75rem' }}>
                      <p className={`text-sm font-medium ${currentStep >= step.id ? 'text-blue-600' : 'text-gray-500'}`} style={{ fontSize: '0.875rem', fontWeight: '500', color: currentStep >= step.id ? '#2563eb' : '#6b7280' }}>
                        {step.name}
                      </p>
                      <p className="text-xs text-gray-500" style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                        {step.description}
                      </p>
                    </div>
                  </div>
                  {index !== steps.length - 1 && (
                    <div
                      className={`absolute top-4 left-8 w-full h-0.5 ${
                        currentStep > step.id ? 'bg-blue-600' : 'bg-gray-200'
                      }`}
                      style={{
                        position: 'absolute',
                        top: '1rem',
                        left: '2rem',
                        width: '100%',
                        height: '2px',
                        backgroundColor: currentStep > step.id ? '#2563eb' : '#e5e7eb'
                      }}
                    />
                  )}
                </li>
              ))}
            </ol>
          </nav>
        </div>

        {/* Form Content */}
        <div className="bg-white rounded-lg shadow-sm border p-8" style={{ backgroundColor: 'white', borderRadius: '0.5rem', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)', border: '1px solid #e5e7eb', padding: '2rem' }}>
          {renderStepContent()}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8" style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem' }}>
            <button
              type="button"
              onClick={handleBack}
              disabled={currentStep === 1}
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                padding: '0.5rem 1rem',
                color: '#4b5563',
                border: '1px solid #d1d5db',
                borderRadius: '0.5rem',
                backgroundColor: 'white',
                cursor: currentStep === 1 ? 'not-allowed' : 'pointer',
                opacity: currentStep === 1 ? 0.5 : 1
              }}
            >
              Previous
            </button>

            {currentStep < 4 ? (
              <button
                type="button"
                onClick={handleNext}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
                style={{ padding: '0.5rem 1.5rem', backgroundColor: '#2563eb', color: 'white', borderRadius: '0.5rem', fontWeight: '500', border: 'none', cursor: 'pointer' }}
              >
                Next
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isLoading}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  padding: '0.5rem 1.5rem',
                  backgroundColor: isLoading ? '#9ca3af' : '#2563eb',
                  color: 'white',
                  borderRadius: '0.5rem',
                  fontWeight: '500',
                  border: 'none',
                  cursor: isLoading ? 'not-allowed' : 'pointer',
                  opacity: isLoading ? 0.5 : 1
                }}
              >
                {isLoading ? 'Creating...' : 'Create Chatbot'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateChatbot