import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { POST, TOKEN, BASE_URL, DELETE } from '../../store/utility';
import axios from 'axios';

export default function ArtistProfile(props) {
	const follow = useSelector((state) => state.profile.user_info);
	// const loading = useSelector((state) => state.profile.loading);

	const following = props.artist[0].user;
	const [followState, setFollowState] = useState(false);
	const [followData, setFollowData] = useState([]);

	const [countLoading, setCountLoading] = useState(true);
	const [followerCount, setFollowerCount] = useState(0);
	const [followingCount, setFollowingCount] = useState(0);

	// console.log(follow);

	// console.log(props.artist);
	useEffect(() => {
		if (follow && following) {
			checkFollowState(follow.user, following);
		}
	}, [follow, following]);

	useEffect(() => {
		if (followData && followData.length > 0) {
			setFollowState(true);
		} else {
			setFollowState(false);
		}
	}, [followData]);

	useEffect(() => {
		if (follow) {
			axios
				.get(`${BASE_URL}/interaction/follow/api/getFollowers/${follow.user}/`, {
					headers: {
						authorization: 'Token ' + TOKEN,
					},
				})
				.then((res) => {
					// console.log(res.data);
					setFollowerCount(res.data.length);
					getFollowingCount(follow.user);
				})
				.catch((err) => {
					// console.log(err);
					getFollowingCount(follow.user);
					setFollowerCount(0);
				});
		}
	}, [follow]);

	const getFollowingCount = (user_id) => {
		axios
			.get(`${BASE_URL}/interaction/follow/api/getFollowing/${user_id}/`, {
				headers: {
					authorization: 'Token ' + TOKEN,
				},
			})
			.then((res) => {
				// console.log(res.data);
				setFollowingCount(res.data.length);
				setCountLoading(false);
			})
			.catch((err) => {
				console.log(err);
				setFollowingCount(0);
				setCountLoading(false);
			});
	};

	// console.log(followData);
	const handleOnClick = (event, requestType) => {
		event.preventDefault();
		// console.log(follow, following);
		let formData = new FormData();

		formData.append('user', follow.user);
		formData.append('following', following);
		for (var value of formData.values()) {
			console.log(value);
		}
		switch (requestType) {
			case POST:
				if (TOKEN) {
					axios
						.post(`${BASE_URL}/interaction/follow/api/create/`, formData, {
							headers: {
								authorization: 'Token ' + TOKEN,
							},
						})
						.then((res) => {
							// console.log(res.data);
							// checkFollowState(follow.user, following);
							window.location.reload();
						})
						.catch((err) => {
							console.log(err);
						});
				}

			case DELETE:
				if (TOKEN) {
					axios
						.delete(`${BASE_URL}/interaction/follow/api/${followData[0].id}/delete/`, {
							headers: {
								authorization: 'Token ' + TOKEN,
							},
						})
						.then((res) => {
							// console.log(res.data);
							// checkFollowState(follow.user, following);
							window.location.reload();
						})
						.catch((err) => {
							console.log(err);
						});
				}
		}
	};

	const checkFollowState = (user, following) => {
		axios
			.get(`${BASE_URL}/interaction/follow/api/checkFollow/${user}/${following}/`, {
				headers: {
					authorization: 'Token ' + TOKEN,
				},
			})
			.then((res) => {
				// console.log(res.data);
				setFollowData(res.data);
			})
			.catch((err) => console.log(err));
	};
	return (
		<>
			<div className='artistProfile-container'>
				<div className='artistProfile-container-header'>
					<div className='artistProfile-container-left'>
						<img src={props.artist[0].profile_picture} alt='Profile Picture' width='100%' />
					</div>

					<div className='artistProfile-container-right'>
						<div className='d-flex flex-column flex-md-row justify-content-evenly justify-content-between'>
							<h4 className='artist-name text-capitalize'>
								{props.artist[0].first_name} {props.artist[0].last_name}
							</h4>
							<div className='artist-follow'>
								{followState ? (
									<>
										<button className='btn btn-secondary' onClick={(event) => handleOnClick(event, DELETE)}>
											Following
										</button>
									</>
								) : (
									<>
										<button className='btn btn-secondary' onClick={(event) => handleOnClick(event, POST)}>
											Follow
										</button>
									</>
								)}
							</div>
						</div>
						<div className='artist-username'>
							<p>{props.artist[0].getUsername}</p>
						</div>

						<div className='artist-numbers d-flex justify-content-between'>
							{countLoading ? (
								<div className='spinner-border text-primary' role='status'>
									<span className='sr-only'>Loading...</span>
								</div>
							) : (
								<>
									<div>{followerCount} Followers</div>
									<div>{followingCount} Following</div>
									<div>15 Tracks</div>
								</>
							)}
						</div>

						<div className='artist-bio'>
							<h4>Bio </h4>
							<p> {props.artist[0].bio}</p>
						</div>

						{/* <img src={props.artist[0].profile_picture} className='rounded p-2 ' alt='Profile Picture' width='100%' /> */}
					</div>
				</div>
			</div>
		</>
	);
}
