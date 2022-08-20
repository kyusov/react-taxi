import { FC, useState } from 'react'
import { optionsList } from '../tariffs'

interface ITariff {
    activeElement: number
}

const Tariff: FC<ITariff> = ({ activeElement }) => {

    const [activeTariff, setActiveTariff] = useState<Number>(activeElement)

    const clickHandler = (index: number) => {
        setActiveTariff(index)
    }

	return (
		<div className="tariffs">
			{optionsList.map((option, index) => (
				<div className={`tariffs__tariff ${index === activeTariff ? 'active' : ''}`} key={option._id} onClick={clickHandler.bind(null, index)}>
					<img className="tariffs__pic" src={option.img} alt="tariff" />
					<div className="tariffs__info">
						<p className="tariffs__title">{option.title}</p>
						<span className="tariffs__price">{option.multiplier * 2} ₽</span>
					</div>
				</div>
			))}
		</div>
	)
}

export default Tariff
