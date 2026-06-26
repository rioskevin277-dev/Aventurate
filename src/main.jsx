import React from 'react'
import ReactDOM from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import i18n from './i18n'
import App from './App'
import './index.css'

// Update <html lang> on language change
i18n.on('languageChanged', (lng) => {
  document.documentElement.lang = lng
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </React.StrictMode>,
)
