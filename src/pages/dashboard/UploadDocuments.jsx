import { useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const UploadDocuments = () => {
  const [uploadType, setUploadType] = useState('file') // file, url, text
  const [files, setFiles] = useState([])
  const [urlInput, setUrlInput] = useState('')
  const [textInput, setTextInput] = useState('')
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState({})
  const [errors, setErrors] = useState({})
  const fileInputRef = useRef(null)
  const navigate = useNavigate()

  const supportedFormats = [
    { type: 'PDF', extensions: '.pdf', icon: '📄', description: 'PDF documents' },
    { type: 'Text', extensions: '.txt', icon: '📝', description: 'Plain text files' },
    { type: 'Markdown', extensions: '.md', icon: '📋', description: 'Markdown files' },
    { type: 'Word', extensions: '.docx', icon: '📄', description: 'Word documents' },
    { type: 'CSV', extensions: '.csv', icon: '📊', description: 'CSV data files' }
  ]

  const urlTypes = [
    { type: 'Website', icon: '🌐', description: 'Crawl entire websites or specific pages' },
    { type: 'Documentation', icon: '📚', description: 'API docs, knowledge bases, wikis' },
    { type: 'GitHub', icon: '🐙', description: 'Repository README and documentation' },
    { type: 'Notion', icon: '📝', description: 'Notion pages and databases' }
  ]

  const handleFileSelect = (e) => {
    const selectedFiles = Array.from(e.target.files)
    const newFiles = selectedFiles.map(file => ({
      id: Date.now() + Math.random(),
      file,
      name: file.name,
      size: file.size,
      type: file.type,
      status: 'pending',
      progress: 0
    }))
    setFiles(prev => [...prev, ...newFiles])
  }

  const handleDragOver = (e) => {
    e.preventDefault()
  }

  const handleDrop = (e) => {
    e.preventDefault()
    const droppedFiles = Array.from(e.dataTransfer.files)
    const newFiles = droppedFiles.map(file => ({
      id: Date.now() + Math.random(),
      file,
      name: file.name,
      size: file.size,
      type: file.type,
      status: 'pending',
      progress: 0
    }))
    setFiles(prev => [...prev, ...newFiles])
  }

  const removeFile = (fileId) => {
    setFiles(prev => prev.filter(file => file.id !== fileId))
  }

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const simulateUpload = async (file) => {
    return new Promise((resolve) => {
      let progress = 0
      const interval = setInterval(() => {
        progress += Math.random() * 30
        if (progress >= 100) {
          progress = 100
          clearInterval(interval)
          resolve()
        }
        setFiles(prev => prev.map(f => 
          f.id === file.id 
            ? { ...f, progress: Math.round(progress), status: progress === 100 ? 'completed' : 'uploading' }
            : f
        ))
      }, 200)
    })
  }

  const handleUpload = async () => {
    if (uploadType === 'file' && files.length === 0) {
      setErrors({ files: 'Please select at least one file to upload' })
      return
    }
    if (uploadType === 'url' && !urlInput.trim()) {
      setErrors({ url: 'Please enter a valid URL' })
      return
    }
    if (uploadType === 'text' && !textInput.trim()) {
      setErrors({ text: 'Please enter some text content' })
      return
    }

    setIsUploading(true)
    setErrors({})

    try {
      if (uploadType === 'file') {
        // Upload files sequentially
        for (const file of files.filter(f => f.status === 'pending')) {
          await simulateUpload(file)
        }
      } else {
        // Simulate URL/text processing
        await new Promise(resolve => setTimeout(resolve, 2000))
      }

      // Success - redirect to chatbots page
      setTimeout(() => {
        navigate('/chatbots')
      }, 1000)

    } catch (error) {
      setErrors({ upload: 'Upload failed. Please try again.' })
    } finally {
      setIsUploading(false)
    }
  }

  const getFileIcon = (type) => {
    if (type.includes('pdf')) return '📄'
    if (type.includes('text')) return '📝'
    if (type.includes('word') || type.includes('document')) return '📄'
    if (type.includes('csv')) return '📊'
    return '📎'
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
              <Link to="/dashboard" className="text-gray-600 hover:text-gray-900" style={{ color: '#4b5563', textDecoration: 'none' }}>
                ← Back to Dashboard
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8" style={{ maxWidth: '56rem', margin: '0 auto', padding: '2rem 1rem' }}>
        {/* Header */}
        <div className="mb-8" style={{ marginBottom: '2rem' }}>
          <h1 className="text-3xl font-bold text-gray-900" style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#111827', marginBottom: '0.5rem' }}>
            Upload Documents
          </h1>
          <p className="text-gray-600" style={{ color: '#4b5563' }}>
            Add content for your chatbots to learn from. Upload files, add URLs, or paste text directly.
          </p>
        </div>

        {/* Upload Type Selection */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6" style={{ backgroundColor: 'white', borderRadius: '0.5rem', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)', border: '1px solid #e5e7eb', padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 className="text-lg font-medium text-gray-900 mb-4" style={{ fontSize: '1.125rem', fontWeight: '500', color: '#111827', marginBottom: '1rem' }}>
            Choose Upload Method
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
            {[
              { id: 'file', name: 'Upload Files', icon: '📁', description: 'Upload documents from your computer' },
              { id: 'url', name: 'From URL', icon: '🌐', description: 'Import content from websites' },
              { id: 'text', name: 'Paste Text', icon: '📝', description: 'Add content directly by typing' }
            ].map((type) => (
              <button
                key={type.id}
                onClick={() => setUploadType(type.id)}
                className={`p-4 border-2 rounded-lg text-left transition-colors ${
                  uploadType === type.id 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 hover:border-gray-300 bg-white'
                }`}
                style={{
                  padding: '1rem',
                  border: uploadType === type.id ? '2px solid #3b82f6' : '2px solid #e5e7eb',
                  backgroundColor: uploadType === type.id ? '#eff6ff' : 'white',
                  borderRadius: '0.5rem',
                  textAlign: 'left',
                  cursor: 'pointer'
                }}
              >
                <div className="text-2xl mb-2" style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>
                  {type.icon}
                </div>
                <h3 className="font-medium text-gray-900" style={{ fontWeight: '500', color: '#111827', marginBottom: '0.25rem' }}>
                  {type.name}
                </h3>
                <p className="text-sm text-gray-600" style={{ fontSize: '0.875rem', color: '#4b5563' }}>
                  {type.description}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Upload Content */}
        <div className="bg-white rounded-lg shadow-sm border" style={{ backgroundColor: 'white', borderRadius: '0.5rem', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)', border: '1px solid #e5e7eb' }}>
          <div className="p-6" style={{ padding: '1.5rem' }}>
            {uploadType === 'file' && (
              <div className="space-y-6" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {/* Drag & Drop Area */}
                <div
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors"
                  style={{ border: '2px dashed #d1d5db', borderRadius: '0.5rem', padding: '2rem', textAlign: 'center', cursor: 'pointer' }}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <div className="text-6xl mb-4" style={{ fontSize: '3.75rem', marginBottom: '1rem' }}>📁</div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2" style={{ fontSize: '1.125rem', fontWeight: '500', color: '#111827', marginBottom: '0.5rem' }}>
                    Drop files here or click to browse
                  </h3>
                  <p className="text-gray-600 mb-4" style={{ color: '#4b5563', marginBottom: '1rem' }}>
                    Support for PDF, TXT, MD, DOCX, and CSV files
                  </p>
                  <button
                    type="button"
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700"
                    style={{ backgroundColor: '#2563eb', color: 'white', padding: '0.5rem 1.5rem', borderRadius: '0.5rem', fontWeight: '500', border: 'none', cursor: 'pointer' }}
                  >
                    Choose Files
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept=".pdf,.txt,.md,.docx,.csv"
                    onChange={handleFileSelect}
                    className="hidden"
                    style={{ display: 'none' }}
                  />
                </div>

                {/* Supported Formats */}
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-3" style={{ fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.75rem' }}>
                    Supported Formats
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '0.75rem' }}>
                    {supportedFormats.map((format) => (
                      <div key={format.type} className="flex items-center p-2 border border-gray-200 rounded" style={{ display: 'flex', alignItems: 'center', padding: '0.5rem', border: '1px solid #e5e7eb', borderRadius: '0.25rem' }}>
                        <span className="mr-2" style={{ marginRight: '0.5rem' }}>{format.icon}</span>
                        <div>
                          <p className="text-xs font-medium text-gray-900" style={{ fontSize: '0.75rem', fontWeight: '500', color: '#111827' }}>
                            {format.type}
                          </p>
                          <p className="text-xs text-gray-500" style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                            {format.extensions}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* File List */}
                {files.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-3" style={{ fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.75rem' }}>
                      Selected Files ({files.length})
                    </h4>
                    <div className="space-y-3" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                      {files.map((file) => (
                        <div key={file.id} className="flex items-center p-3 border border-gray-200 rounded-lg" style={{ display: 'flex', alignItems: 'center', padding: '0.75rem', border: '1px solid #e5e7eb', borderRadius: '0.5rem' }}>
                          <span className="text-2xl mr-3" style={{ fontSize: '1.5rem', marginRight: '0.75rem' }}>
                            {getFileIcon(file.type)}
                          </span>
                          <div className="flex-1" style={{ flex: 1 }}>
                            <p className="font-medium text-gray-900" style={{ fontWeight: '500', color: '#111827' }}>
                              {file.name}
                            </p>
                            <p className="text-sm text-gray-500" style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                              {formatFileSize(file.size)}
                            </p>
                            {file.status === 'uploading' && (
                              <div className="mt-2" style={{ marginTop: '0.5rem' }}>
                                <div className="bg-gray-200 rounded-full h-2" style={{ backgroundColor: '#e5e7eb', borderRadius: '9999px', height: '0.5rem' }}>
                                  <div 
                                    className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                                    style={{ 
                                      backgroundColor: '#2563eb', 
                                      height: '0.5rem', 
                                      borderRadius: '9999px', 
                                      width: `${file.progress}%`,
                                      transition: 'width 0.3s'
                                    }}
                                  />
                                </div>
                                <p className="text-xs text-gray-500 mt-1" style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '0.25rem' }}>
                                  {file.progress}% uploaded
                                </p>
                              </div>
                            )}
                            {file.status === 'completed' && (
                              <p className="text-xs text-green-600 mt-1" style={{ fontSize: '0.75rem', color: '#059669', marginTop: '0.25rem' }}>
                                ✓ Upload complete
                              </p>
                            )}
                          </div>
                          {file.status === 'pending' && (
                            <button
                              onClick={() => removeFile(file.id)}
                              className="text-gray-400 hover:text-red-600"
                              style={{ color: '#9ca3af', background: 'none', border: 'none', cursor: 'pointer' }}
                            >
                              ✕
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {errors.files && (
                  <p className="text-red-600 text-sm" style={{ color: '#dc2626', fontSize: '0.875rem' }}>
                    {errors.files}
                  </p>
                )}
              </div>
            )}

            {uploadType === 'url' && (
              <div className="space-y-6" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {/* URL Input */}
                <div>
                  <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-2" style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>
                    Website URL
                  </label>
                  <input
                    type="url"
                    id="url"
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    placeholder="https://example.com/docs"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    style={{ width: '100%', padding: '0.5rem 0.75rem', border: '1px solid #d1d5db', borderRadius: '0.5rem', fontSize: '1rem' }}
                  />
                  {errors.url && (
                    <p className="text-red-600 text-sm mt-1" style={{ color: '#dc2626', fontSize: '0.875rem', marginTop: '0.25rem' }}>
                      {errors.url}
                    </p>
                  )}
                </div>

                {/* URL Types */}
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-3" style={{ fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.75rem' }}>
                    Supported URL Types
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem' }}>
                    {urlTypes.map((type) => (
                      <div key={type.type} className="flex items-start p-3 border border-gray-200 rounded-lg" style={{ display: 'flex', alignItems: 'flex-start', padding: '0.75rem', border: '1px solid #e5e7eb', borderRadius: '0.5rem' }}>
                        <span className="text-xl mr-3 mt-0.5" style={{ fontSize: '1.25rem', marginRight: '0.75rem', marginTop: '0.125rem' }}>
                          {type.icon}
                        </span>
                        <div>
                          <p className="font-medium text-gray-900" style={{ fontWeight: '500', color: '#111827', marginBottom: '0.25rem' }}>
                            {type.type}
                          </p>
                          <p className="text-sm text-gray-600" style={{ fontSize: '0.875rem', color: '#4b5563' }}>
                            {type.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {uploadType === 'text' && (
              <div className="space-y-6" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div>
                  <label htmlFor="text" className="block text-sm font-medium text-gray-700 mb-2" style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>
                    Text Content
                  </label>
                  <textarea
                    id="text"
                    value={textInput}
                    onChange={(e) => setTextInput(e.target.value)}
                    rows={12}
                    placeholder="Paste your documentation, FAQ, or any text content here..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    style={{ width: '100%', padding: '0.5rem 0.75rem', border: '1px solid #d1d5db', borderRadius: '0.5rem', fontSize: '1rem', resize: 'vertical' }}
                  />
                  <p className="text-sm text-gray-500 mt-2" style={{ fontSize: '0.875rem', color: '#6b7280', marginTop: '0.5rem' }}>
                    You can paste markdown, plain text, or formatted content. The AI will automatically parse and structure it.
                  </p>
                  {errors.text && (
                    <p className="text-red-600 text-sm mt-1" style={{ color: '#dc2626', fontSize: '0.875rem', marginTop: '0.25rem' }}>
                      {errors.text}
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Upload Button */}
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 rounded-b-lg" style={{ padding: '1rem 1.5rem', backgroundColor: '#f9fafb', borderTop: '1px solid #e5e7eb', borderRadius: '0 0 0.5rem 0.5rem' }}>
            <div className="flex justify-between items-center" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div className="text-sm text-gray-600" style={{ fontSize: '0.875rem', color: '#4b5563' }}>
                {uploadType === 'file' && files.length > 0 && `${files.length} file(s) selected`}
                {uploadType === 'url' && urlInput && 'URL ready to process'}
                {uploadType === 'text' && textInput && `${textInput.length} characters entered`}
              </div>
              
              <div className="flex items-center space-x-3" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                {errors.upload && (
                  <p className="text-red-600 text-sm" style={{ color: '#dc2626', fontSize: '0.875rem' }}>
                    {errors.upload}
                  </p>
                )}
                
                <button
                  onClick={handleUpload}
                  disabled={isUploading || (uploadType === 'file' && files.length === 0)}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    backgroundColor: isUploading ? '#9ca3af' : '#2563eb',
                    color: 'white',
                    padding: '0.5rem 1.5rem',
                    borderRadius: '0.5rem',
                    fontWeight: '500',
                    border: 'none',
                    cursor: isUploading ? 'not-allowed' : 'pointer',
                    opacity: (isUploading || (uploadType === 'file' && files.length === 0)) ? 0.5 : 1
                  }}
                >
                  {isUploading ? 'Processing...' : 'Upload & Process'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UploadDocuments