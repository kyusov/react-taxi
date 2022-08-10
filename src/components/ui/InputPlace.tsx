import { FC, FormEvent, useRef, useState } from 'react'
import { OpenStreetMapProvider } from 'leaflet-geosearch'
import cn from 'classnames'
import { SearchResult } from 'leaflet-geosearch/dist/providers/provider'
import { LatLng, LatLngTuple } from 'leaflet'

interface InputPlace {
	selectPlace: (address: string, location: LatLngTuple) => void
	type: 'from' | 'to'
}

const InputPlace: FC<InputPlace> = ({ selectPlace, type }) => {
	const [address, setAddress] = useState('')
	const [active, setActive] = useState(false)
	const [suggestions, setSuggestions] = useState<SearchResult<any>[]>([])

	const inputRef = useRef<HTMLInputElement>(null)

	const provider = new OpenStreetMapProvider()

	const setInputFocus = () => setActive(true)

	const inputHandler = (value: string) => {
		provider.search({ query: value }).then((result) => {
			setSuggestions(result)
			setActive(true)
		}).catch(err => console.error(err))
		setAddress(value)
	}

	const suggestionClick = (suggestion: SearchResult) => {
		setActive(false)
		const place: string = suggestion.label
		const latLng: LatLngTuple = [Number(suggestion.raw.lat), Number(suggestion.raw.lon)]

		setAddress(place)
		selectPlace(place, latLng)
	}

	return (
		<div className="input-search-wrapper">
			<input
				ref={inputRef}
				className={`input-search ${cn({ 'b-b-n': active && suggestions.length > 0 })}`}
				type="text"
				value={address}
				onChange={(e: FormEvent<HTMLInputElement>) => inputHandler(e.currentTarget.value)}
				onFocus={setInputFocus}
				placeholder="Where from?"
			/>
			<div className={`input-search-results ${cn({ full: active && suggestions.length > 0 })}`}>
				{suggestions.map((e) => (
					<div key={e.x} className="input-search-suggestions__item" onClick={() => suggestionClick(e)}>
						{e.label}
					</div>
				))}
			</div>
		</div>
	)
}

export default InputPlace
