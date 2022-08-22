import L, { Icon, LatLng, LatLngBounds, LatLngTuple, Marker } from 'leaflet'
import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, useMap } from 'react-leaflet'
import { Input, Tariff } from './components'
import 'leaflet-routing-machine'

import { finishIcon, finishIconDark, startIcon, startIconDark } from './Icons'
import useColorScheme from './hooks/useColorScheme'

function App() {
	const [fromCoords, setFromCoords] = useState<number[]>([])
	const [toCoords, setToCoords] = useState<number[]>([])
	const [route, setRoute] = useState<L.Routing.Control>()
	const colorScheme = useColorScheme()

	const selectedStartPlace = (place: string, coords: number[]) => {
		console.log('place:', place, 'coords:', coords)
		setFromCoords(coords)
	}

	const selectedFinishPlace = (place: string, coords: number[]) => {
		console.log('place:', place, 'coords:', coords)
		setToCoords(coords)
	}

	const createLeafletIcon = (coords: LatLng, isDark: boolean, start: boolean): Marker => {
		if (isDark) {
			return new Marker(coords, {
				icon: new Icon({
					iconUrl: start ? startIcon : finishIcon,
					iconAnchor: [16, 16],
					iconSize: [32, 32],
				}),
			})
		}

		return new Marker(coords, {
			icon: new Icon({
				iconUrl: start ? startIconDark: finishIconDark,
				iconAnchor: [16, 16],
				iconSize: [32, 32],
			}),
		})
	}

	const FitBoundsView = () => {
		const map = useMap()

		useEffect(() => {
			if (fromCoords.length && toCoords.length) {
				// map.setView(new LatLng(coords[0], coords[1]))
				map.fitBounds(new LatLngBounds([fromCoords as LatLngTuple, toCoords as LatLngTuple]), {
					padding: [50, 50],
				})
			}
		}, [map])
		return null
	}

	const RouteControl = () => {
		const map = useMap()

		useEffect(() => {
			if (fromCoords.length && toCoords.length) {
				if (route) {
					route.setWaypoints([])
					route.setWaypoints([new LatLng(fromCoords[0], fromCoords[1]), new LatLng(toCoords[0], toCoords[1])])
				} else {
					const coords = [new LatLng(fromCoords[0], fromCoords[1]), new LatLng(toCoords[0], toCoords[1])]
					const routeControl = L.Routing.control({
						waypoints: coords,
						useZoomParameter: true,
						addWaypoints: false,
						routeWhileDragging: true,
						fitSelectedRoutes: true,
						showAlternatives: false,
						lineOptions: {
							styles: [
								{
									opacity: 1,
									weight: 4,
									className: colorScheme === 'dark' ? 'route-line-dark' : 'route-line-light',
								},
							],
							extendToWaypoints: false,
							missingRouteTolerance: 100,
						},
						plan: new L.Routing.Plan(coords, {
							draggableWaypoints: false,
							language: 'ru',
							createMarker(waypointIndex, waypoint, numberOfWaypoints) {
								if (waypointIndex === 0)
									return createLeafletIcon(waypoint.latLng, colorScheme === 'dark', true)
								return createLeafletIcon(waypoint.latLng, colorScheme === 'dark', false)
							},
						}),
					})

					setRoute(routeControl)
					routeControl.addTo(map)
				}
			}
		}, [map])

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
						// minZoom={9}
						maxZoom={17}
						zoomControl={false}
						zoomAnimation={true}
					>
						<FitBoundsView />
						<RouteControl />
						<TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
					</MapContainer>
				</div>
				<div className="map__control">
					<div className="map__inputs">
						<Input selectedPlace={selectedStartPlace} />
						<Input selectedPlace={selectedFinishPlace} />
					</div>
					<Tariff activeElement={0} />
				</div>
			</div>
		</div>
	)
}

export default App
