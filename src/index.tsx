import React from 'react'
import ReactDOM from 'react-dom/client'
import '../node_modules/leaflet/dist/leaflet.css'
import '../node_modules/leaflet-routing-machine/dist/leaflet-routing-machine.css'
import './assets/styles/app.scss'
import App from './App'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
	// <React.StrictMode>
		<App />
	// </React.StrictMode>
)
