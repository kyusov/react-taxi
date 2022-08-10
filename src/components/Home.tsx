import { MapContainer, TileLayer } from 'react-leaflet'
import { useThemeDetector } from '../hooks/useThemeDetector'

const Home = () => {
	const isDarkTheme = useThemeDetector()

	const light: string = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
	const dark: string = 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'

	// https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png
	return (
		<div className="h-full w-full absolute z-10">
			<MapContainer
				attributionControl={false}
				fadeAnimation={true}
				zoomControl={false}
				className="h-screen w-full"
				center={[51.505, -0.09]}
				zoom={13}
				scrollWheelZoom={false}
			>
				<TileLayer detectRetina={true} url={dark} opacity={isDarkTheme ? 1 : 0}/>
				<TileLayer detectRetina={true} url={light} opacity={isDarkTheme ? 0 : 1} />
			</MapContainer>
		</div>
	)
}

export default Home
