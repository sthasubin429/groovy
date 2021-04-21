import React from 'react';
import { Link } from 'react-router-dom';
import { profileUpdateProfileView } from '../../store/actions/profile';
import { useDispatch } from 'react-redux';

export default function ArtistDetail(props) {
	const dispatch = useDispatch();

	return (
		<>
			<div className='artist-card d-flex'>
				<img src={props.artist.profile_picture} className='artistCard-Img' alt='Song' />

				<div className='artistCard-details'>
					<Link
						className='navbar-brand'
						to='/artistDetail/'
						onClick={() => {
							dispatch(profileUpdateProfileView(props.artist.user));
						}}
					>
						<div className='text-capitalize'>
							{props.artist.first_name} {props.artist.last_name}
						</div>
					</Link>

					<div>{props.artist.getUsername}</div>
				</div>

				<div className='artistCard-icon ml-auto'>Icon</div>
			</div>

			<hr />
		</>
	);
}
