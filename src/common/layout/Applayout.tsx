import ReactRoute from '../components/Route/Router'
import { IRouteRoot } from '../interface/components/route'
import React from 'react'
import Header from './components/Header'
import NavBar from './components/NavBar'
import Footer from './components/Footer'

const Applayout: React.FC<IRouteRoot> = (props: IRouteRoot) => {
	return (
		<>
			<header>
				<Header />
			</header>
			<aside>
				<NavBar />
			</aside>
			<section>
				<ReactRoute routeInfos={props.routeInfos} defaultPath={props.defaultPath} />
			</section>
			<footer>
				<Footer />
			</footer>
		</>
	)
}

export default Applayout
