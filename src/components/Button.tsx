import { FC } from "react"

type CustomButton = {
    disabled?: boolean
    onClick?: () => void
    text: string
} 

const Button: FC<CustomButton> = ({ disabled, onClick, text }) => {
	return <div className={`button ${disabled ? 'disabled' : ''}`} onClick={onClick}>{text}</div>
}

export default Button
