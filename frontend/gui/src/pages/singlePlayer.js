import axios from 'axios';

import { useSelector } from 'react-redux';
import AudioPlayer from 'react-h5-audio-player';

import Comment from '../components/player/comments2';
import React, { useEffect, useState } from 'react';

import { BASE_URL, TOKEN, POST } from '../store/utility';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShare, faPlus } from '@fortawesome/free-solid-svg-icons';

import { HeartFilled, HeartNotFilled } from '../components/player/interactionBar';

export default function SinglePlayer() {
	let song_id = localStorage.getItem('listen');
	const [loading, setLoading] = useState(true);
	const [song, setSong] = useState();
	const [commentState, setCommentState] = useState(false);
	const [commentsList, setCommentList] = useState();

	const [likeCount, setLikeCount] = useState(0);
	const [like, setLike] = useState(false);

	const user = useSelector((state) => state.profile.user_info);
	const [likeData, setLikeData] = useState(null);

	useEffect(() => {
		if (commentsList && commentsList.length > 0) {
			setCommentState(true);
		} else {
			setCommentState(false);
		}
	}, [commentsList]);

	useEffect(() => {
		if (user && song_id) {
			let user_id = user.user;
			axios
				.get(`${BASE_URL}/interaction/likes/api/song/${song_id}/`, {
					headers: {
						authorization: 'Token ' + TOKEN,
					},
				})
				.then((res) => {
					setLikeCount(res.data.length);
					axios
						.get(`${BASE_URL}/interaction/likes/api/checkLike/${song_id}/${user_id}/`, {
							headers: {
								authorization: 'Token ' + TOKEN,
							},
						})
						.then((res) => {
							setLikeData(res.data);
							if (res.data.length !== 0) {
								setLike(true);
							} else {
								setLike(false);
							}
						})
						.catch((err) => {
							window.location.replace('http://localhost:3000/500/');
						});
				})
				.catch((err) => {
					window.location.replace('http://localhost:3000/500/');
				});

			axios
				.get(`${BASE_URL}/interaction/comments/api/song/${song_id}/`, {
					headers: {
						authorization: 'Token ' + TOKEN,
					},
				})
				.then((res) => {
					setCommentList(res.data);
				})
				.catch((err) => {
					window.location.replace('http://localhost:3000/500/');
				});
		}
	}, [user, song_id]);

	const toggleLike = (user_id, song_id) => {
		if (likeData && likeData.length !== 0) {
			axios
				.delete(`${BASE_URL}/interaction/likes/api/${likeData[0].id}/delete/`, {
					headers: {
						authorization: 'Token ' + TOKEN,
					},
				})
				.then((res) => {
					window.location.reload();
				})
				.catch((err) => {
					window.location.reload();
				});
		} else {
			let data = {
				song: song_id,
				username: user_id,
			};
			axios
				.post(`${BASE_URL}/interaction/likes/api/create/`, data, {
					headers: {
						authorization: 'Token ' + TOKEN,
					},
				})
				.then((res) => {
					window.location.reload();
				})
				.catch((err) => {
					window.location.reload();
				});
		}
	};

	useEffect(() => {
		if (TOKEN) {
			axios
				.get(`${BASE_URL}/songs/api/${song_id}/`, {
					headers: {
						authorization: 'Token ' + TOKEN,
					},
				})
				.then((res) => {
					setSong(res.data);
					setLoading(false);
				})
				.catch((err) => {
					window.location.replace('http://localhost:3000/500/');
				});
		}
	}, [song_id]);

	const handleSubmit = (event, requestType) => {
		event.preventDefault();

		let formData = new FormData();
		formData.append('comment', event.target.elements.comment.value);
		formData.append('song', song.id);
		formData.append('username', user.user);

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
							window.location.reload();
						})
						.catch((err) => window.location.reload());
				}
		}
	};

	return (
		<>
			{loading ? (
				<div className='spinner-border text-primary' role='status'>
					<span className='sr-only'>Loading...</span>
				</div>
			) : (
				<>
					<div className='container-fluid customPlayer-container d-flex flex-column flex-lg-row justify-content-evenly'>
						<div className='flex-fill'>
							<div className='customPlayer-header'>
								<h2 className='d-flex justify-content-center'>Now Playing</h2>
							</div>
							<div className='flex-container jc-center'>
								<img src={song.song_photo} className='customPlayer-songImg' alt='Song' />
							</div>
							<div className='flex-container jc-center'>
								<h2> {song.song_name} </h2>
							</div>
							<div className='flex-container jc-center'>
								<h4> {song.getUsername} </h4>
							</div>
							<AudioPlayer autoPlay src={song.song_audio} showSkipControls={true} showJumpControls={false} />
						</div>
					</div>

					<div className='d-flex justify-content-center col-12 px-0'>
						<div className='interaction-bar flex-fill'>
							<div className='d-inline'>
								<button
									onClick={(event) => {
										event.preventDefault();
										toggleLike(user.user, song_id);
									}}
									className='interaction-bar-like '
								>
									{like ? <HeartFilled /> : <HeartNotFilled />}
								</button>
								<span className='interaction-bar-likeCount '> {likeCount} </span>
							</div>

							<button className='intraction-bar-btn float-right'>
								<FontAwesomeIcon className='icon' icon={faShare} />
								<span>Share</span>
							</button>
							<button className='intraction-bar-btn float-right'>
								<FontAwesomeIcon icon={faPlus} />
								<span>Add To</span>
							</button>
							<div className='float-right'></div>
						</div>
					</div>

					<div className='col-12 d-flex justify-content-center align-items-center post-comment'>
						<div className='post-comment-img'>{user ? <img src={user.profile_picture} height='50px' width='50px' className='float-left' /> : <></>} </div>
						<form onSubmit={(event) => handleSubmit(event, POST)} id='post_comment_form' className='flex-fill post-comment-form'>
							<div className='form-row'>
								<input className='form-control ' id='comment' name='comment' placeholder='Write a Comment' type='text' />
								{/* <textarea className='form-control ' id='comment' name='comment' placeholder='Write a Comment' rows='2'></textarea> */}
							</div>
						</form>

						{/* <button className='post-comment-btn col-2' type='submit' name='submit' form='post_comment_form'>
							<span> Submit </span>
						</button> */}
					</div>

					<div className='col-12 song-comments'>
						<h4 className='song-comments-title'> Comments</h4>
						{commentState ? (
							<>
								{commentsList.map((comment) => (
									<Comment key={comment.id} comment={comment} />
								))}
							</>
						) : (
							<div className='song-no-comments'>
								<h5> No Comments on this Song</h5>
							</div>
						)}
					</div>
				</>
			)}
		</>
	);
}
