import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext({})

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    setLoading(false)
  }, [])

  const login = async (email, password) => {
    try {
      const userData = { email, role: 'admin' }
      setUser(userData)
      setIsAuthenticated(true)
      localStorage.setItem('authToken', 'demo-token')
      return { success: true }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  const logout = () => {
    setUser(null)
    setIsAuthenticated(false)
    localStorage.removeItem('authToken')
  }

  const signup = async (email, password, name) => {
    try {
      const userData = { email, name, role: 'admin' }
      setUser(userData)
      setIsAuthenticated(true)
      localStorage.setItem('authToken', 'demo-token')
      return { success: true }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    logout,
    signup
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}