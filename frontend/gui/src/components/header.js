import { Link } from 'react-router-dom';
import React, { Component } from 'react';

class Header extends Component {
	render() {
		return (
			<>
				<nav className='main-nav navbar navbar-expand-lg navbar-light bg-light mb-3'>
					<div className='container d-flex justify-content-around'>
						<Link className='navbar-brand' to='/'>
							{' '}
							Groovy{' '}
						</Link>

						<button
							className='navbar-toggler ml-auto'
							type='button'
							data-toggle='collapse'
							data-target='#navbarSupportedContent'
							aria-controls='navbarSupportedContent'
							aria-expanded='false'
							aria-label='Toggle navigation'
						>
							<span className='navbar-toggler-icon'></span>
						</button>

						<div className='navbar-expand-sm collapse navbar-collapse' id='navbarSupportedContent'>
							<ul className='navbar-nav ml-auto'>
								<li className='nav-item active'>
									<Link className='nav-link' to='/'>
										{' '}
										Home{' '}
									</Link>
								</li>
								<li className='nav-item'>
									<Link className='nav-link' to='/player'>
										{' '}
										Music Player
									</Link>
								</li>
								<li className='nav-item'>
									<Link className='nav-link' to='/'>
										{' '}
										About Us{' '}
									</Link>
								</li>
								<li className='nav-item'>
									<Link className='nav-link' to='/'>
										{' '}
										Community{' '}
									</Link>
								</li>
								<li className='nav-item'>
									<Link className='nav-link' to='/'>
										{' '}
										Help{' '}
									</Link>
								</li>

								<li className='nav-item'>
									<Link className='nav-link' to='/login'>
										{' '}
										Login{' '}
									</Link>
								</li>

								<li className='nav-item'>
									<Link className='nav-link' to='/register'>
										{' '}
										Register{' '}
									</Link>
								</li>
							</ul>
						</div>
					</div>
				</nav>
			</>
		);
	}
}

export default Header;
