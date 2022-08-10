import { FC, ReactNode } from 'react'

interface ILayout {
	children: ReactNode
}

const Layout: FC<ILayout> = ({ children }) => {
	return <div className="max-w-md h-screen mx-auto relative">{children}</div>
}

export default Layout
