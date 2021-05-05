import axios from 'axios';

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getComments } from '../../store/actions/player';
import { BASE_URL, DELETE, POST, TOKEN } from '../../store/utility.js';

export default function PostComment() {
	const user = useSelector((state) => state.profile.user_info);
	const song = useSelector((state) => state.player.current_song);
	const dispatch = useDispatch();

	const [loading, setLoading] = useState(true);
	// console.log(user, song);

	useEffect(() => {
		if (user !== null && song !== null) {
			setLoading(false);
		} else {
			setLoading(true);
		}
	}, [user, song]);

	const handleSubmit = (event, requestType) => {
		event.preventDefault();
		// setLoading(true);
		let formData = new FormData();
		formData.append('comment', event.target.elements.comment.value);
		formData.append('song', song.id);
		formData.append('username', user.user);

		// for (var value of formData.values()) {
		// 	console.log(value);
		// }

		switch (requestType) {
			case POST:
				if (TOKEN) {
					axios
						.post(`${BASE_URL}/interaction/comments/api/create/`, formData, {
							headers: {
								authorization: 'Token ' + TOKEN,
							},
						})
						.then((res) => {
							dispatch(getComments(song.id));
							document.getElementById('post_comment_form').reset();
						})
						.catch((err) => console.log(err));
				}
		}
	};
	return (
		<>
			{loading ? (
				<div className='pt-5 spinner-border text-primary' role='status'>
					<span className='sr-only'>Loading...</span>
				</div>
			) : (
				<>
					<div className='col-12 d-flex justify-content-center align-items-center post-comment'>
						<div className='post-comment-img'>
							<img src={user.profile_picture} height='50px' width='50px' className='float-left' />
						</div>
						<form onSubmit={(event) => handleSubmit(event, POST)} id='post_comment_form' className='flex-fill post-comment-form'>
							<div className='form-row'>
								<input className='form-control ' id='comment' name='comment' placeholder='Write a Comment' type='text' />
							</div>
						</form>

						{/* <button className='post-comment-btn col-2' type='submit' name='submit' form='post_comment_form'>
							<span> Submit </span>
						</button> */}

						{/* <input type='Submit' name='submit' className='btn btn-primary' /> */}
					</div>
				</>
			)}
		</>
	);
}
