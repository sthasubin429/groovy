import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BASE_URL, POST, TOKEN } from '../../store/utility.js';
import axios from 'axios';
import { getComments } from '../../store/actions/player';

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

		for (var value of formData.values()) {
			console.log(value);
		}

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
					<div className='col-8'>
						<form onSubmit={(event) => handleSubmit(event, POST)} id='post_comment_form'>
							<div className='form-row'>
								<div className='col-3'>
									<img src={user.profile_picture} height='50px' width='50px' className='float-left' />
								</div>
								<div className='col-9'>
									<textarea className='form-control' id='comment' name='comment' placeholder='Write a Comment' rows='2'></textarea>
								</div>
							</div>

							<div className='form-row'>
								<input type='Submit' name='submit' className='btn btn-primary' />
							</div>
						</form>
					</div>
				</>
			)}
		</>
	);
}
