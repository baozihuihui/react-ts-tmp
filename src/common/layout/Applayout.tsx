import Header from '@common/components/Header'
import NavBar from '@common/components/NavBar'
import ReactRoute from '@common/components/Route/Router'
import { IRouteRoot } from '@common/interface/components/route'
import React from 'react'

const Applayout: React.FC<IRouteRoot> = (props: IRouteRoot) => {
	return (
		<>
			<Header />
			<aside>
				<NavBar />
			</aside>
			<section>
				<ReactRoute routeInfos={props.routeInfos} defaultPath={props.defaultPath} />
			</section>
			<footer></footer>
		</>
	)
}

export default Applayout
