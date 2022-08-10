import '../node_modules/leaflet-geosearch/dist/geosearch.css'
import './assets/styles/App.css'
import './assets/styles/searchInput.css'

import Home from './components/Home'
import Layout from './layout/Layout'
import ControlPanel from './components/ControlPanel'

function App() {
	return (
		<Layout>
			<Home />
			<ControlPanel />
		</Layout>
	)
}

export default App
