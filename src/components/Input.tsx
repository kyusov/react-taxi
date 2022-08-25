import { ChangeEvent, FC, useEffect, useState } from 'react'
import { getPlaces } from '../api/geocoder'
import useDebounce from '../hooks/useDebounce'

interface Places {
	documentation: string
	licenses: []
	rate: {
		limit: number
		remaining: number
		reset: number
	}
	results: Place[]
}

interface Place {
	annotations: {}
	bounds: {}
	components: {}
	confidence: number
	formatted: string
	geometry: {
		lat: number
		lng: number
	}
}

interface InputProps {
	placeholder: string
	selectedPlace: (place: string, coords: number[]) => void
}

const Input: FC<InputProps> = ({ selectedPlace, placeholder }) => {
	const [isLoading, setIsLoading] = useState(false)
	const [showSuggestions, setShowSuggestions] = useState(false)
	const [suggestionValue, setSuggestionValue] = useState('')

	const [value, setValue] = useState('')
	const [places, setPlaces] = useState<Place[]>([])

	const debouncedSearchTerm = useDebounce(value, 800)

	useEffect(() => {
		if (debouncedSearchTerm !== '') {
			setIsLoading(true)
			getPlaces(debouncedSearchTerm)
				.then((rawData) => rawData.json())
				.then((data: Places) => {
					setPlaces(data.results)
					setShowSuggestions(true)
				})
				.catch((err) => console.error(err))
				.finally(() => setIsLoading(false))
		}
	}, [debouncedSearchTerm])

	const inputHandler = (event: ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value
		setValue(value)
		setSuggestionValue(value)
	}

	const suggestionClick = (suggestion: Place) => {
		selectedPlace(suggestion.formatted, [suggestion.geometry.lat, suggestion.geometry.lng])
		setSuggestionValue(suggestion.formatted)
	}

	return (
		<div className="search__wrapper" onBlur={() => setShowSuggestions(false)}>
			<input
				className={`search__input ${showSuggestions && places.length > 0 ? 'active' : ''}`}
				type="text"
				onFocus={() => {
					if (places.length > 0) setShowSuggestions(true)
				}}
				onChange={inputHandler}
				value={suggestionValue}
				placeholder={placeholder}
			/>
			<div className={`search__results ${(showSuggestions && places.length > 0) || isLoading ? 'active' : ''}`}>
				{isLoading && (
					<div className="spinner">
						<div className="spinner__content"></div>
					</div>
				)}
				{!isLoading &&
					places.map((place) => (
						<div className="search__result" onClick={() => suggestionClick(place)} key={place.geometry.lat}>
							{place.formatted}
						</div>
					))}
			</div>
		</div>
	)
}

export default Input
