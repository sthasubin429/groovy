import React from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import Sidebar from '../components/sidebar';

import { BaseRouter, LoggedInRoute } from '../routes';

function Main(props) {
	return (
		<>
			{props.isAuthenticated ? (
				<>
					<Header />
					<BaseRouter />
					<Footer />
				</>
			) : (
				<>
					<div className='left'>
						<Sidebar />
					</div>

					<div className='left'>
						<LoggedInRoute />
					</div>
				</>
			)}
		</>
	);
}

export default Main;
