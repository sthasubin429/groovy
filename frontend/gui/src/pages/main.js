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
					<div className='container'>
						<div className='row'>
							<div className='d-none d-md-block col-md-4 col-lg-3'>
								<Sidebar />
							</div>

							<div className='col-12 col-sm-12 col-md-8 col-lg-9'>
								<LoggedInRoute />
							</div>
						</div>
					</div>
				</>
			)}
		</>
	);
}

export default Main;
