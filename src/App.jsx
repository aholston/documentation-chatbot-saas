import { BrowserRouter as Router } from 'react-router-dom'
import AppRoutes from './routes'
import './styles/globals.css'

function App() {
  return (
    <Router>
      <div className="App">
        <AppRoutes />
      </div>
    </Router>
  )
}

export default App