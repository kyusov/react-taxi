import { useEffect, useState } from 'react'

type Color = 'light' | 'dark'

const useColorScheme = () => {
	const [colorScheme, setColorScheme] = useState<Color>('light')

	useEffect(() => {
		if (!window.matchMedia) {
			setColorScheme('light')
			return
		}

		const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

		setColorScheme(mediaQuery.matches ? 'dark' : 'light')

		function onChange(event: MediaQueryListEvent): void {
			setColorScheme(event.matches ? 'dark' : 'light')
		}

		mediaQuery.addEventListener('change', onChange)

		return () => {
			mediaQuery.removeEventListener('change', onChange)
		}
	}, [])

    return colorScheme
}

export default useColorScheme
