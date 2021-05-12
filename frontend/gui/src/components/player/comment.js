import axios from 'axios';

import React, { useState, useEffect } from 'react';
import { BASE_URL, TOKEN } from '../../store/utility';

export default function Comment(props) {
	const [profile, setProfile] = useState(null);

	useEffect(() => {
		axios
			.get(`${BASE_URL}/userProfile/api/${props.comment.username}/`, {
				headers: {
					authorization: 'Token ' + TOKEN,
				},
			})
			.then((res) => {
				setProfile(res.data[0].profile_picture);
			})
			.catch((err) => {
				window.location.replace('http://localhost:3000/500/');
			});
	}, []);

	return (
		<>
			<div className='song-comment d-flex'>
				<img src={profile} height='50px' width='50px' className='song-comment-img' />

				<div className='song-comment-details '>
					<h5> {props.comment.getUsername}</h5>
					<p> {props.comment.comment}</p>
				</div>
			</div>
		</>
	);
}
