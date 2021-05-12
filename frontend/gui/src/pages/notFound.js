import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
	return (
		<>
			<div className='notfound-container'>
				<div className='notfound-second-container d-flex flex-column justify-content-center align-items-center'>
					<h1> Groovy </h1>
					<h2> Error Code: 500 </h2>
					<h5> Internal Server Error</h5>
					<Link to='/home' className='default-btn my-4'>
						Home
					</Link>
				</div>
			</div>
		</>
	);
}
