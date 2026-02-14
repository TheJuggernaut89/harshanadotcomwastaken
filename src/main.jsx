import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ThemeProvider } from './context/ThemeContext'
import { TruthModeProvider } from './context/TruthModeContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <TruthModeProvider>
        <App />
      </TruthModeProvider>
    </ThemeProvider>
  </React.StrictMode>,
)
