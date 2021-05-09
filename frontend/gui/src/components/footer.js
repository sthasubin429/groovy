import React from 'react';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';

export default function Footer() {
	return (
		<div className='footer-container'>
			<div className='container'>
				<div className='my-3 d-flex justify-content-around flex-wrap'>
					<div className='footer-card d-flex flex-column justify-content-center'>
						<h1> Groovy </h1>
					</div>
					<div className='footer-card d-flex flex-column '>
						<h4> Company </h4>
						<ul>
							<li>
								<Link to='#'> About Us</Link>
							</li>
							<li>
								<Link to='#'> Contact Us</Link>
							</li>
							<li>
								<Link to='#'> Jobs </Link>
							</li>
						</ul>
					</div>
					<div className='footer-card d-flex flex-column'>
						<h4> Community </h4>
						<ul>
							<li>
								<Link to='#'> For Creators </Link>
							</li>
							<li>
								<Link to='#'> </Link>
							</li>
							<li>
								<Link to='#'> For Composers</Link>
							</li>
						</ul>
					</div>

					<div className='footer-card d-flex flex-column '>
						<h4> Other Links </h4>
						<ul>
							<li>
								<Link to='#'>Help</Link>
							</li>
							<li>
								<Link to='#'> Legal</Link>
							</li>
							<li>
								<Link to='#'> Privacy Policy </Link>
							</li>
							<li>
								<Link to='#'> Terms and Conditions</Link>
							</li>
						</ul>
					</div>

					<div className='footer-card d-flex justify-content-center align-items-center'>
						<a href='https://www.facebook.com/' target='_blank' className='footer-link'>
							<FontAwesomeIcon icon={faFacebook} />
						</a>

						<a href='https://twitter.com/home' className='footer-link' target='_blank'>
							<FontAwesomeIcon icon={faTwitter} />
						</a>
						<a href='https://www.instagram.com/' className='footer-link' target='_blank'>
							<FontAwesomeIcon icon={faInstagram} />
						</a>
					</div>
				</div>
				<div className='d-flex justify-content-center'>
					<div className='footer-seperator'></div>
				</div>
				<div className='d-flex justify-content-center'>
					<div className='copyright'>
						<p>All Rights Reserved &copy; Groovy, 2021</p>
					</div>
				</div>
			</div>
		</div>
	);
}
