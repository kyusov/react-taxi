export const getPlaces = (value: string) => {
	return fetch(
		`https://api.opencagedata.com/geocode/v1/json?q=${
			encodeURI(value)
		}&key=${process.env.REACT_APP_API}&pretty=1&language=ru&no_annotations=1`
	)
}
