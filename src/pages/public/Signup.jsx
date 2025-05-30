import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  })
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const getPasswordStrength = (password) => {
    if (password.length < 6) return { strength: 0, text: 'Too weak' }
    if (password.length < 8) return { strength: 1, text: 'Weak' }
    if (password.length >= 8 && /[A-Z]/.test(password) && /[0-9]/.test(password)) {
      return { strength: 3, text: 'Strong' }
    }
    if (password.length >= 8) return { strength: 2, text: 'Medium' }
    return { strength: 1, text: 'Weak' }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters'
    }

    if (!formData.email) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters'
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password'
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the Terms of Service'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Mock successful signup
      console.log('Signup attempt:', formData)
      
      // Store token (mock)
      localStorage.setItem('authToken', 'demo-token-' + Date.now())
      localStorage.setItem('user', JSON.stringify({
        email: formData.email,
        name: formData.name,
        role: 'admin'
      }))

      // Redirect to welcome/setup
      navigate('/welcome')
      
    } catch (error) {
      setErrors({ submit: 'Registration failed. Please try again.' })
    } finally {
      setIsLoading(false)
    }
  }

  const passwordStrength = getPasswordStrength(formData.password)

  return (
    <div className="min-h-screen bg-gray-50" style={{ minHeight: '100vh', backgroundColor: '#f9fafb' }}>
      {/* Header */}
      <div className="bg-white border-b" style={{ backgroundColor: 'white', borderBottom: '1px solid #e5e7eb' }}>
        <div className="max-w-7xl mx-auto px-4 py-4" style={{ maxWidth: '1280px', margin: '0 auto', padding: '1rem' }}>
          <Link to="/" className="flex items-center" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
            <span className="text-2xl font-bold text-gray-900" style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#111827' }}>
              ChatDocs
            </span>
          </Link>
        </div>
      </div>

      {/* Signup Form */}
      <div className="flex items-center justify-center py-12 px-4" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '3rem 1rem' }}>
        <div className="max-w-md w-full" style={{ maxWidth: '28rem', width: '100%' }}>
          <div className="bg-white rounded-lg shadow-sm border p-8" style={{ backgroundColor: 'white', borderRadius: '0.5rem', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)', border: '1px solid #e5e7eb', padding: '2rem' }}>
            {/* Header */}
            <div className="text-center mb-8" style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <h1 className="text-3xl font-bold text-gray-900" style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#111827', marginBottom: '0.5rem' }}>
                Create your account
              </h1>
              <p className="text-gray-600" style={{ color: '#4b5563' }}>
                Start building intelligent documentation chatbots
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit}>
              {/* Name */}
              <div className="mb-6" style={{ marginBottom: '1.5rem' }}>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2" style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>
                  Full name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  style={{ 
                    width: '100%', 
                    padding: '0.5rem 0.75rem', 
                    border: '1px solid #d1d5db', 
                    borderRadius: '0.5rem',
                    fontSize: '1rem',
                    outline: 'none'
                  }}
                  placeholder="Enter your full name"
                  autoComplete="name"
                />
                {errors.name && (
                  <p className="text-red-600 text-sm mt-1" style={{ color: '#dc2626', fontSize: '0.875rem', marginTop: '0.25rem' }}>
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="mb-6" style={{ marginBottom: '1.5rem' }}>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2" style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>
                  Email address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  style={{ 
                    width: '100%', 
                    padding: '0.5rem 0.75rem', 
                    border: '1px solid #d1d5db', 
                    borderRadius: '0.5rem',
                    fontSize: '1rem',
                    outline: 'none'
                  }}
                  placeholder="Enter your email"
                  autoComplete="email"
                />
                {errors.email && (
                  <p className="text-red-600 text-sm mt-1" style={{ color: '#dc2626', fontSize: '0.875rem', marginTop: '0.25rem' }}>
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Password */}
              <div className="mb-6" style={{ marginBottom: '1.5rem' }}>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2" style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  style={{ 
                    width: '100%', 
                    padding: '0.5rem 0.75rem', 
                    border: '1px solid #d1d5db', 
                    borderRadius: '0.5rem',
                    fontSize: '1rem',
                    outline: 'none'
                  }}
                  placeholder="Create a password"
                  autoComplete="new-password"
                />
                
                {/* Password Strength Indicator */}
                {formData.password && (
                  <div className="mt-2" style={{ marginTop: '0.5rem' }}>
                    <div className="flex items-center space-x-2" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <div className="flex space-x-1" style={{ display: 'flex', gap: '0.25rem' }}>
                        {[1, 2, 3].map((level) => (
                          <div
                            key={level}
                            className="h-2 w-8 rounded-full"
                            style={{
                              height: '0.5rem',
                              width: '2rem',
                              borderRadius: '9999px',
                              backgroundColor: passwordStrength.strength >= level 
                                ? (passwordStrength.strength === 1 ? '#ef4444' : passwordStrength.strength === 2 ? '#f59e0b' : '#10b981')
                                : '#e5e7eb'
                            }}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-gray-600" style={{ fontSize: '0.75rem', color: '#4b5563' }}>
                        {passwordStrength.text}
                      </span>
                    </div>
                  </div>
                )}
                
                {errors.password && (
                  <p className="text-red-600 text-sm mt-1" style={{ color: '#dc2626', fontSize: '0.875rem', marginTop: '0.25rem' }}>
                    {errors.password}
                  </p>
                )}
              </div>

              {/* Confirm Password */}
              <div className="mb-6" style={{ marginBottom: '1.5rem' }}>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2" style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>
                  Confirm password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  style={{ 
                    width: '100%', 
                    padding: '0.5rem 0.75rem', 
                    border: '1px solid #d1d5db', 
                    borderRadius: '0.5rem',
                    fontSize: '1rem',
                    outline: 'none'
                  }}
                  placeholder="Confirm your password"
                  autoComplete="new-password"
                />
                {errors.confirmPassword && (
                  <p className="text-red-600 text-sm mt-1" style={{ color: '#dc2626', fontSize: '0.875rem', marginTop: '0.25rem' }}>
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              {/* Terms Agreement */}
              <div className="mb-6" style={{ marginBottom: '1.5rem' }}>
                <label className="flex items-start" style={{ display: 'flex', alignItems: 'flex-start' }}>
                  <input
                    type="checkbox"
                    name="agreeToTerms"
                    checked={formData.agreeToTerms}
                    onChange={handleChange}
                    className="h-4 w-4 text-blue-600 rounded border-gray-300 mt-1"
                    style={{ height: '1rem', width: '1rem', marginRight: '0.5rem', marginTop: '0.125rem' }}
                  />
                  <span className="text-sm text-gray-600" style={{ fontSize: '0.875rem', color: '#4b5563', lineHeight: '1.4' }}>
                    I agree to the{' '}
                    <Link to="/terms" className="text-blue-600 hover:text-blue-500" style={{ color: '#2563eb', textDecoration: 'none' }}>
                      Terms of Service
                    </Link>
                    {' '}and{' '}
                    <Link to="/privacy" className="text-blue-600 hover:text-blue-500" style={{ color: '#2563eb', textDecoration: 'none' }}>
                      Privacy Policy
                    </Link>
                  </span>
                </label>
                {errors.agreeToTerms && (
                  <p className="text-red-600 text-sm mt-1" style={{ color: '#dc2626', fontSize: '0.875rem', marginTop: '0.25rem' }}>
                    {errors.agreeToTerms}
                  </p>
                )}
              </div>

              {/* Submit Error */}
              {errors.submit && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg" style={{ marginBottom: '1rem', padding: '0.75rem', backgroundColor: '#fef2f2', border: '1px solid #fecaca', borderRadius: '0.5rem' }}>
                  <p className="text-red-600 text-sm" style={{ color: '#dc2626', fontSize: '0.875rem' }}>
                    {errors.submit}
                  </p>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ 
                  width: '100%', 
                  backgroundColor: isLoading ? '#9ca3af' : '#2563eb', 
                  color: 'white', 
                  padding: '0.5rem 1rem', 
                  borderRadius: '0.5rem', 
                  fontWeight: '500', 
                  border: 'none', 
                  cursor: isLoading ? 'not-allowed' : 'pointer',
                  fontSize: '1rem'
                }}
              >
                {isLoading ? 'Creating account...' : 'Create account'}
              </button>
            </form>

            {/* Sign in link */}
            <div className="mt-6 text-center" style={{ marginTop: '1.5rem', textAlign: 'center' }}>
              <p className="text-gray-600" style={{ color: '#4b5563' }}>
                Already have an account?{' '}
                <Link 
                  to="/login" 
                  className="text-blue-600 hover:text-blue-500 font-medium"
                  style={{ color: '#2563eb', textDecoration: 'none', fontWeight: '500' }}
                >
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup