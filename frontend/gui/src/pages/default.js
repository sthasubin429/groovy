import React from 'react';
import { Link } from 'react-router-dom';

export function LoggedOutDefault() {
	return (
		<>
			<div className='container'>
				<div className='default-container'>
					<div className='text-center'>
						<h3> Page not found or Please login to Continue</h3>
						<Link to='/login' className='default-btn'>
							Login
						</Link>{' '}
					</div>
				</div>
			</div>
		</>
	);
}

export function LoggedInDefault() {
	return (
		<>
			<div className='container'>
				<div className='default-container'>
					<div className='text-center'>
						<h3> Page Not Found</h3>
						<Link to='/' className='default-btn'>
							Home
						</Link>
					</div>
				</div>
			</div>
		</>
	);
}
