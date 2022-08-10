import { useEffect, useState } from 'react'

export const useThemeDetector = () => {
	const getCurrentTheme = () => window.matchMedia('(prefers-color-scheme: dark)').matches

	const [isDarkTheme, setIsDarkTheme] = useState(getCurrentTheme())

	useEffect(() => {
		window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => setIsDarkTheme(e.matches))
		return () =>
			window
				.matchMedia('(prefers-color-scheme: dark)')
				.removeEventListener('change', (e) => setIsDarkTheme(e.matches))
	}, [])

	return isDarkTheme
}
