import React from 'react';
import { Link } from 'react-router-dom';
// import { profileUpdateProfileView } from '../../store/actions/profile';
// import { useDispatch } from 'react-redux';

export default function ArtistDetail(props) {
	// const dispatch = useDispatch();
	// console.log(props.artist.id, props.user_id);

	if (props.artist.id !== props.user_id) {
		return (
			<>
				<div className='artist-card'>
					<div
						onClick={() => {
							localStorage.setItem('profile_view', props.artist.user);
							window.location.replace('http://localhost:3000/artistDetail');
						}}
						className='text-center'
					>
						<img src={props.artist.profile_picture} className='artistCard-Img' alt='Song' />

						<div className='artistCard-details text-center'>
							<div className='text-capitalize'>
								{props.artist.first_name} {props.artist.last_name}
							</div>

							<div>{props.artist.getUsername}</div>
						</div>
					</div>
				</div>
			</>
		);
	} else {
		return <> </>;
	}
}
