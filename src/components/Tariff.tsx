import { FC, useEffect, useState } from 'react'
import { optionsList } from '../tariffs'

interface ITariff {
    activeElement: number
	distance: number
}

const Tariff: FC<ITariff> = ({ activeElement, distance }) => {

    const [activeTariff, setActiveTariff] = useState<Number>(activeElement)
	const [isCalcPrice, setIsCalcPrice] = useState(true)

    const clickHandler = (index: number) => {
        setActiveTariff(index)
    }

	useEffect(() => {
		if (distance === 0) {
			setIsCalcPrice(true)
		} else {
			setIsCalcPrice(false)
		}
	}, [distance])

	return (
		<div className="tariffs">
			{optionsList.map((option, index) => (
				<div className={`tariffs__tariff ${index === activeTariff ? 'active' : ''}`} key={option._id} onClick={clickHandler.bind(null, index)}>
					<img className="tariffs__pic" src={option.img} alt="tariff" />
					<div className="tariffs__info">
						<p className="tariffs__title">{option.title}</p>
						<span className={`tariffs__price ${!isCalcPrice ? 'active' : ''}`}>{Math.floor(option.multiplier * distance)} ₽</span>
					</div>
				</div>
			))}
		</div>
	)
}

export default Tariff
