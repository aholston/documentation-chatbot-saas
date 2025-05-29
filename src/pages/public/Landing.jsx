import { Link } from 'react-router-dom'

const Landing = () => {
  return (
    <div className="min-h-screen bg-white" style={{ minHeight: '100vh', backgroundColor: 'white' }}>
      {/* Navigation */}
      <nav className="border-b border-gray-200" style={{ borderBottom: '1px solid #e5e7eb', padding: '1rem 0' }}>
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center" style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div className="flex items-center" style={{ display: 'flex', alignItems: 'center' }}>
            <span className="text-2xl font-bold text-gray-900" style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#111827' }}>
              ChatDocs
            </span>
          </div>
          <div className="flex items-center space-x-4" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <Link 
              to="/login" 
              className="text-gray-600 hover:text-gray-900"
              style={{ color: '#4b5563', textDecoration: 'none' }}
            >
              Log in
            </Link>
            <Link 
              to="/signup" 
              className="btn-primary"
              style={{ backgroundColor: '#2563eb', color: 'white', padding: '0.5rem 1rem', borderRadius: '0.5rem', textDecoration: 'none' }}
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20" style={{ padding: '5rem 1rem' }}>
        <div className="max-w-4xl mx-auto text-center" style={{ maxWidth: '896px', margin: '0 auto', textAlign: 'center' }}>
          <h1 className="text-5xl font-bold text-gray-900 mb-6" style={{ fontSize: '3rem', fontWeight: 'bold', color: '#111827', marginBottom: '1.5rem', lineHeight: '1.1' }}>
            Turn Your Documentation Into{' '}
            <span className="text-blue-600" style={{ color: '#2563eb' }}>
              Intelligent Conversations
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8" style={{ fontSize: '1.25rem', color: '#4b5563', marginBottom: '2rem', lineHeight: '1.6' }}>
            Create AI-powered chatbots from your API documentation, knowledge bases, and help content. 
            Give your users instant, accurate answers 24/7.
          </p>
          <div className="flex gap-4 justify-center" style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link 
              to="/signup" 
              className="btn-primary"
              style={{ backgroundColor: '#2563eb', color: 'white', padding: '0.75rem 2rem', borderRadius: '0.5rem', textDecoration: 'none', fontSize: '1.125rem', fontWeight: '600' }}
            >
              Start Building Your Chatbot →
            </Link>
            <Link 
              to="/login" 
              className="btn-secondary"
              style={{ backgroundColor: '#f3f4f6', color: '#374151', padding: '0.75rem 2rem', borderRadius: '0.5rem', textDecoration: 'none', fontSize: '1.125rem', fontWeight: '600' }}
            >
              View Demo
            </Link>
          </div>
        </div>
      </section>

      {/* Simple Features */}
      <section className="bg-gray-50 py-16" style={{ backgroundColor: '#f9fafb', padding: '4rem 1rem' }}>
        <div className="max-w-4xl mx-auto text-center" style={{ maxWidth: '896px', margin: '0 auto', textAlign: 'center' }}>
          <h2 className="text-3xl font-bold mb-8" style={{ fontSize: '1.875rem', fontWeight: 'bold', marginBottom: '2rem' }}>
            Why Choose ChatDocs?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            <div style={{ textAlign: 'left' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>🤖 AI-Powered</h3>
              <p style={{ color: '#6b7280' }}>Advanced AI understands your docs and provides accurate answers with source citations.</p>
            </div>
            <div style={{ textAlign: 'left' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>⚡ Lightning Fast</h3>
              <p style={{ color: '#6b7280' }}>Vector search ensures instant responses to user queries.</p>
            </div>
            <div style={{ textAlign: 'left' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>🔒 Secure</h3>
              <p style={{ color: '#6b7280' }}>Your API keys and data are encrypted and completely isolated.</p>
            </div>
            <div style={{ textAlign: 'left' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>📚 Multi-Source</h3>
              <p style={{ color: '#6b7280' }}>Import from websites, PDFs, APIs, and more.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Landing