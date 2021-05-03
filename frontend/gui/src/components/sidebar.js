import { Link } from 'react-router-dom';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faHome, faHeadphonesAlt, faListUl, faUser, faMusic, faPlay, faUserFriends } from '@fortawesome/free-solid-svg-icons';
import { logout } from '../store/actions/auth';

export default function Sidebar() {
	const dispatch = useDispatch();

	const userInfo = useSelector((state) => state.profile.user_info);
	const loading = useSelector((state) => state.profile.loading);
	return (
		<>
			{loading ? (
				<div className='spinner-border text-primary' role='status'>
					<span className='sr-only'>Loading...</span>
				</div>
			) : (
				<>
					<div className='sidebar-container'>
						<Link className='navbar-brand' to='/'>
							Groovy
						</Link>

						<Link className='navbar-brand my-3' to='/profile'>
							<div className='container-fluid'>
								<div className='row'>
									<div className='col-4'>
										<div className='d-flex justify-content-center align-items-center'>
											<img src={userInfo.profile_picture} className='rounded' alt='Profile Picture' width='100%' />
										</div>
									</div>
									<div className='col-8'>
										<h6 className='profile-name text-capitalize'>
											{userInfo.first_name} {userInfo.last_name}
										</h6>
									</div>
								</div>
							</div>
						</Link>

						<p className='sidebar-header'>LIBRARY</p>
						<ul className='navbar-nav ml-auto'>
							<li className='nav-item active'>
								<Link className='nav-link' to='/'>
									<FontAwesomeIcon icon={faHome} className='nav-icon' />
									Home
								</Link>
							</li>
							<li className='nav-item'>
								<Link className='nav-link' to='/player'>
									<FontAwesomeIcon icon={faHeadphonesAlt} className='nav-icon' />
									Now Playing
								</Link>
							</li>
							<li className='nav-item'>
								<Link className='nav-link' to='/playlist'>
									<FontAwesomeIcon icon={faListUl} className='nav-icon' />
									Playlist
								</Link>
							</li>
							<li className='nav-item'>
								<Link className='nav-link' to='/artists'>
									<FontAwesomeIcon icon={faUser} className='nav-icon' />
									Artists
								</Link>
							</li>
							<li className='nav-item'>
								<Link className='nav-link' to='/'>
									<FontAwesomeIcon icon={faMusic} className='nav-icon' />
									Albums
								</Link>
							</li>
							<li className='nav-item'>
								<Link className='nav-link' to='/allSongs'>
									<FontAwesomeIcon icon={faPlay} className='nav-icon' />
									Songs
								</Link>
							</li>
							<li className='nav-item'>
								<Link className='nav-link' to='/'>
									<FontAwesomeIcon icon={faHeart} className='nav-icon' />
									Favourites
								</Link>
							</li>
							<li className='nav-item'>
								<Link className='nav-link' to='/'>
									<FontAwesomeIcon icon={faUserFriends} className='nav-icon' />
									Following
								</Link>
							</li>
							{/* <li className='nav-item' onClick={this.props.logout}>
                        <Link className='nav-link'> Logout </Link>
                    </li> */}
						</ul>
						<p className='sidebar-header'>DISCOVER</p>
						<ul className='navbar-nav ml-auto'>
							<li className='nav-item'>
								<Link className='nav-link' to='/'>
									<FontAwesomeIcon icon={faHeart} className='nav-icon' />
									Trending
								</Link>
							</li>
							<li className='nav-item'>
								<Link className='nav-link' to='/'>
									<FontAwesomeIcon icon={faHeart} className='nav-icon' />
									Most Popular
								</Link>
							</li>
							<li className='nav-item'>
								<Link className='nav-link' to='/'>
									<FontAwesomeIcon icon={faHeart} className='nav-icon' />
									New Releases
								</Link>
							</li>
							<li className='nav-item'>
								<Link className='nav-link' to='/'>
									<FontAwesomeIcon icon={faHeart} className='nav-icon' />
									Songs You May Like
								</Link>
							</li>
							<li className='nav-item'>
								<Link className='nav-link' to='/'>
									<FontAwesomeIcon icon={faHeart} className='nav-icon' />
									Featured
								</Link>
							</li>
							<li className='nav-item'>
								<Link className='nav-link' to='/'>
									<FontAwesomeIcon icon={faHeart} className='nav-icon' />
									Charts
								</Link>
							</li>
						</ul>
						<p className='sidebar-header'>OTHERS</p>
						<ul className='navbar-nav ml-auto'>
							<li className='nav-item'>
								<Link className='nav-link' to='/upload'>
									<FontAwesomeIcon icon={faHeart} className='nav-icon' />
									Upload
								</Link>
							</li>
							<li className='nav-item'>
								<Link className='nav-link' to='/composer'>
									<FontAwesomeIcon icon={faHeart} className='nav-icon' />
									Composer
								</Link>
							</li>
							<li
								className='nav-item'
								onClick={() => {
									dispatch(logout());
								}}
							>
								<Link className='nav-link' to='/'>
									Logout
								</Link>
							</li>
						</ul>
					</div>
				</>
			)}
		</>
	);
}
