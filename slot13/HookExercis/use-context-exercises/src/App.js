import './App.css'
import { ThemeProvider } from './contexts/ThemeContext'
import { AuthProvider } from './contexts/AuthContext'
import CounterComponent from './components/CounterComponent'
import LightSwitch from './components/LightSwitch'
import LoginForm from './components/LoginForm'
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <div style={{ minHeight: '100vh', transition: 'all 0.3s ease', padding: 20 }}>
          <LoginForm />
          <CounterComponent />
          <LightSwitch />
        </div>
      </ThemeProvider>
    </AuthProvider>
  )
}

export default App
