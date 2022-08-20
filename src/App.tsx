import { LatLng, LatLngExpression } from 'leaflet'
import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, useMap } from 'react-leaflet'
import { Input, Tariff } from './components'

function App() {
	const [coords, setCoords] = useState<number[]>([])

	const selectedPlace = (place: string, coords: number[]) => {
		console.log('place:', place, 'coords:', coords)
		setCoords(coords)
	}

	const ChangeView = () => {
		const map = useMap()

		useEffect(() => {
			if (coords.length) {
				map.setView(new LatLng(coords[0], coords[1]))
			}
		}, [coords])
		return null
	}

	return (
		<div className="app">
			<div className="map">
				<div className="map__container">
					<MapContainer
						center={[51.505, -0.09]}
						zoom={13}
						attributionControl={false}
						fadeAnimation={true}
						minZoom={9}
						maxZoom={17}
						zoomControl={false}
						zoomAnimation={true}
					>
						<ChangeView />
						<TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
					</MapContainer>
				</div>
				<div className="map__control">
					<div className="map__inputs">
						<Input selectedPlace={selectedPlace} />
						<Input selectedPlace={selectedPlace} />
					</div>
					<Tariff activeElement={0} />
				</div>
			</div>
		</div>
	)
}

export default App
