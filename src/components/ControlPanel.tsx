import { LatLngTuple } from 'leaflet'
import InputPlace from './ui/InputPlace'


const ControlPanel = () => {
	const selectPlace = (address: string, location: LatLngTuple) => {
		console.log('kek')
	}
	return (
		<div className="w-full absolute bottom-0 left-0 right-0 z-20 p-2">
			<InputPlace selectPlace={selectPlace} type="from" />
		</div>
	)
}

export default ControlPanel
