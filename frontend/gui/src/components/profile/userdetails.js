import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { BASE_URL, TOKEN } from '../../store/utility';

export default function UserDetails() {
	const userDetails = useSelector((state) => state.profile.user_details);
	const userInfo = useSelector((state) => state.profile.user_info);
	const loading = useSelector((state) => state.profile.loading);
	const songs = useSelector((state) => state.profile.song_list);
	const [followerLoading, setFollowerLoading] = useState(true);
	const [follower, setFollower] = useState(0);
	const [following, setFollowing] = useState(0);

	useEffect(() => {
		if (userInfo) {
			axios
				.get(`${BASE_URL}/interaction/follow/api/getFollowers/${userInfo.user}/`, {
					headers: {
						authorization: 'Token ' + TOKEN,
					},
				})
				.then((res) => {
					// console.log(res.data);
					setFollower(res.data.length);
					getFollowingCount(userInfo.user);
				})
				.catch((err) => {
					// console.log(err);
					getFollowingCount(userInfo.user);
					setFollower(0);
				});
		}
	}, [userInfo]);

	const getFollowingCount = (user_id) => {
		axios
			.get(`${BASE_URL}/interaction/follow/api/getFollowing/${user_id}/`, {
				headers: {
					authorization: 'Token ' + TOKEN,
				},
			})
			.then((res) => {
				// console.log(res.data);
				setFollowing(res.data.length);
				setFollowerLoading(false);
			})
			.catch((err) => {
				console.log(err);
				setFollowerLoading(false);
				setFollowing(0);
			});
	};
	return (
		<>
			{loading ? (
				<div className='pt-5 spinner-border text-primary' role='status'>
					<span className='sr-only'>Loading...</span>
				</div>
			) : (
				<>
					<div className='artistProfile-container-header'>
						<div className='artistProfile-container-left'>
							<img src={userInfo.profile_picture} alt='Profile Picture' width='100%' />
						</div>

						<div className='artistProfile-container-right'>
							<div className='d-flex flex-column flex-md-row justify-content-evenly justify-content-between'>
								<h4 className='artist-name text-capitalize'>
									{userInfo.first_name} {userInfo.last_name}
								</h4>

								<Link to='/profileEdit' className='artist-edit'>
									<button className='btn btn-secondary'> Edit </button>
								</Link>
							</div>
							<div className='artist-username'>
								<p>{userDetails.username}</p>
							</div>

							<div className='artist-numbers d-flex justify-content-between'>
								{followerLoading ? (
									<div className='spinner-border text-primary' role='status'>
										<span className='sr-only'>Loading...</span>
									</div>
								) : (
									<>
										<div className='col pt-2'>{following} Followers</div>
										<div className='col pt-2'>{follower} Following</div>
									</>
								)}
								<div className='col pt-2'>{songs ? <>{songs.length}</> : <></>} Tracks</div>
							</div>

							<div className='artist-bio'>
								<h4>Bio </h4>
								<p> {userInfo.bio}</p>
							</div>
						</div>
					</div>
					{/* <div className='container-fluid profile-header pt-5 '>
						<div className='row'>
							<div className='col-12 col-sm-4'>
								<div className='d-flex  justify-content-center align-items-center'>
									<img src={userInfo.profile_picture} className='rounded p-2' alt='Profile Picture' width='100%' />
								</div>
							</div>
							<div className='col-12 col-sm-8'>
								<div className='container-fluid'>
									<div className='row'>
										<div className='col-sm-7'>
											<h3 className='profile-name text-capitalize'>
												{userInfo.first_name} {userInfo.last_name}
											</h3>
										</div>
									</div>

									<div className='row'>
										<div className='col-12'>
											<p className='profile-username'>{userDetails.username}</p>
										</div>
									</div>

									<div className='row my-3'>
										{followerLoading ? (
											<div className='pt-5 spinner-border text-primary' role='status'>
												<span className='sr-only'>Loading...</span>
											</div>
										) : (
											<>
												<div className='col pt-2'>{follower} Followers</div>
												<div className='col pt-2'>{following} Following</div>
											</>
										)}
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
											<p> {userInfo.bio}</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div> */}
				</>
			)}
		</>
	);
}
