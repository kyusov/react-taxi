import Button from './Button'

import grats from '../assets/images/grats.gif'
import { FC, useState } from 'react'

type CustomModal = {
    isActive: boolean
    closeBtnClick: () => void
}

const Modal: FC<CustomModal> = ({ isActive, closeBtnClick }) => {
	return (
		<div className={`overlay ${isActive ? 'active' : ''}`}>
			<div className={`modal ${isActive ? 'show' : 'hide'}`}>
				<img className="modal__grats" src={grats} alt="grats" />
				<div className="modal__description">
					<p className="modal__text">Спасибо за заказ!</p>
					<p className="modal__text">Так как это тестовое приложение, машина не приедет</p>
				</div>
				<Button text="Закрыть" onClick={closeBtnClick} />
			</div>
		</div>
	)
}

export default Modal
