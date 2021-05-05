import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { BASE_URL, TOKEN } from '../../store/utility';

export default function Comment(props) {
	// console.log(props.comment);

	const [profile, setProfile] = useState(null);
	const [allowEdit, setAllowEdit] = useState(false);
	const [edit, setEdit] = useState(false);
	// const [editStatus, setEditStatus] = useState(false);

	const user = useSelector((state) => state.profile.user_details);

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

	useEffect(() => {
		if (user && props.comment.username) {
			if (user.pk === props.comment.username) {
				setAllowEdit(true);
			} else {
				setAllowEdit(false);
			}
		} else {
			setAllowEdit(false);
		}
	}, [user, props.comment.username]);

	const handleSubmit = (event) => {
		let newComment = event.target.elements.comment.value;
		let id = props.comment.id;

		let formData = new FormData();
		formData.append('comment', newComment);
		formData.append('song', props.comment.song);
		formData.append('username', props.comment.username);

		if (TOKEN) {
			axios
				.put(`${BASE_URL}/interaction/comments/api/${id}/update/`, formData, {
					headers: {
						authorization: 'Token ' + TOKEN,
					},
				})
				.then((res) => {
					// console.log(res);
					window.location.reload();
				})
				.catch((err) => console.log(err));
		}
	};

	const handleDelete = (event) => {
		event.preventDefault();
		let id = props.comment.id;
		if (window.confirm('Are you sure you wish to delete Your Comment? \nYou cannot undo this action.')) {
			if (TOKEN) {
				axios
					.delete(`${BASE_URL}/interaction/comments/api/${id}/delete/`, {
						headers: {
							authorization: 'Token ' + TOKEN,
						},
					})
					.then((res) => {
						window.location.reload();
					})
					.catch((err) => {
						console.log(err);
					});
			}
		}
	};

	return (
		<>
			<div className='song-comment d-flex'>
				<img src={profile} height='50px' width='50px' className='song-comment-img' />
				{allowEdit ? (
					<>
						<div className='song-comment-details w-100'>
							<div className='d-flex justify-content-between'>
								<h5> {props.comment.getUsername}</h5>

								<div className='btn-group mb-1'>
									<button
										type='button'
										className='btn btn-secondary dropdown-toggle'
										data-toggle='dropdown'
										aria-haspopup='true'
										aria-expanded='false'
									>
										Options
									</button>
									<div className='dropdown-menu dropdown-menu-right'>
										<button
											className='dropdown-item'
											type='button'
											onClick={(event) => {
												handleDelete(event);
											}}
										>
											Delete
										</button>
										<button
											className='dropdown-item'
											type='button'
											onClick={(event) => {
												event.preventDefault();
												setEdit(!edit);
											}}
										>
											Edit
										</button>
									</div>
								</div>
							</div>

							{edit ? (
								<>
									<form
										onSubmit={(event) => {
											event.preventDefault();
											setEdit(!edit);
											handleSubmit(event);
										}}
									>
										<div className='form-row'>
											<input
												className='form-control '
												id='comment'
												name='comment'
												placeholder='Write a Comment'
												type='text'
												defaultValue={props.comment.comment}
											/>
										</div>
									</form>
								</>
							) : (
								<>
									<p> {props.comment.comment}</p>
								</>
							)}
						</div>
					</>
				) : (
					<>
						<div className='song-comment-details '>
							<h5> {props.comment.getUsername}</h5>
							<p> {props.comment.comment}</p>
						</div>
					</>
				)}
			</div>
		</>
	);
}
