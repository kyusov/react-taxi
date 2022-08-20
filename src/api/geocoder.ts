export const getPlaces = (value: string) => {
	return fetch(
		`https://api.opencagedata.com/geocode/v1/json?q=${
			encodeURI(value)
		}&key=83192afdb7b74e01983ad412137c5dcc&pretty=1&language=ru&no_annotations=1`
	)
}
