import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { GiftProvider } from './context/GiftContext'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <GiftProvider>
        <App />
      </GiftProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
