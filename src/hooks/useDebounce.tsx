import { useEffect, useState } from 'react'

const useDebounce: Function = (value: string, delay: number): string => {
	const [debouncedValue, setDebouncedValue] = useState<string>(value)

	useEffect(() => {
		const handler = setTimeout(() => {
			setDebouncedValue(value)
		}, delay)

		return () => {
			clearTimeout(handler)
		}
	}, [value])

	return debouncedValue
}

export default useDebounce
