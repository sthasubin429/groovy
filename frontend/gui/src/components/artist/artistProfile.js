import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { POST, TOKEN, BASE_URL, DELETE } from '../../store/utility';
import axios from 'axios';

export default function ArtistProfile(props) {
	const follow = useSelector((state) => state.profile.user_info);
	const following = props.artist[0].user;
	const [followState, setFollowState] = useState(false);
	const [followData, setFollowData] = useState([]);
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

	// console.log(followData);
	const handleOnClick = (event, requestType) => {
		event.preventDefault();
		// console.log(follow, following);
		let formData = new FormData();

		formData.append('user', follow.user);
		formData.append('following', following);
		// for (var value of formData.values()) {
		// 	console.log(value);
		// }
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
			<h2> Artist Profile</h2>
			<div className='container-fluid profile-header pt-5 '>
				<div className='row'>
					<div className='col-12 col-sm-4'>
						<div className='d-flex  justify-content-center align-items-center'>
							<img src={props.artist[0].profile_picture} className='rounded p-2' alt='Profile Picture' width='100%' />
						</div>
					</div>
					<div className='col-12 col-sm-8'>
						<div className='container-fluid'>
							<div className='row'>
								<div className='col-sm-7'>
									<h3 className='profile-name text-capitalize'>
										{props.artist[0].first_name} {props.artist[0].last_name}
									</h3>
								</div>

								<div className='col-sm-5'>
									{followState ? (
										<>
											<button className='btn btn-secondary mx-2' onClick={(event) => handleOnClick(event, DELETE)}>
												Following
											</button>
										</>
									) : (
										<>
											<button className='btn btn-secondary mx-2' onClick={(event) => handleOnClick(event, POST)}>
												Follow
											</button>
										</>
									)}

									<button className='btn btn-secondary mx-2'> Share </button>
								</div>
							</div>

							<div className='row'>
								<div className='col-12'>
									<p className='profile-username'>{props.artist[0].getUsername}</p>
								</div>
							</div>

							<div className='row my-3'>
								<div className='col pt-2'>526 Followers</div>
								<div className='col pt-2'>562 Following</div>
								<div className='col pt-2'>15 Tracks</div>

								<div className='col'>
									<Link to='/profileEdit'>
										<button className='btn btn-secondary'> Edit </button>
									</Link>
								</div>
							</div>

							<div className='row my-4'>
								<div className='col-12'>
									<h4>Bio </h4>
									<p> {props.artist[0].bio}</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
