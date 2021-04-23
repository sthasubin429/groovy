import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL, TOKEN } from '../../store/utility';
export default function Comment(props) {
	// console.log(props.comment);

	const [profile, setProfile] = useState(null);
	useEffect(() => {
		axios
			.get(`${BASE_URL}/userProfile/api/${props.comment.username}/`, {
				headers: {
					authorization: 'Token ' + TOKEN,
				},
			})
			.then((res) => {
				// userData['userDetails'] = { ...res.data[0] };
				// console.log(res.data);
				setProfile(res.data[0].profile_picture);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	return (
		<>
			<img src={profile} height='50px' width='50px' className='float-left' />
			<h4> {props.comment.getUsername}</h4>
			<p> {props.comment.comment}</p>
		</>
	);
}
