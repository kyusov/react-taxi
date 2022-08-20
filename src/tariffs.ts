import businessIcon from './assets/images/business-icon.png'
import comfortIcon from './assets/images/comfort-icon.png'
import comfortPlusIcon from './assets/images/comfort-plus-icon.png'
import economyIcon from './assets/images/economy-icon.png'
import premiumIcon from './assets/images/premium-icon.png'

interface List {
	_id: string
	title: string
	img: string
	multiplier: number
}

export const optionsList: List[] = [
	{
		_id: 'taxi-economy',
		title: 'Economy',
		img: economyIcon,
		multiplier: 46,
	},
	{
		_id: 'taxi-comfort',
		title: 'Comfort',
		img: comfortIcon,
		multiplier: 64,
	},
	{
		_id: 'taxi-comfort-plus',
		title: 'Comfort Plus',
		img: comfortPlusIcon,
		multiplier: 72,
	},
	{
		_id: 'taxi-business',
		title: 'Business',
		img: businessIcon,
		multiplier: 117,
	},
	{
		_id: 'Premium',
		title: 'Premium',
		img: premiumIcon,
		multiplier: 196,
	},
]
