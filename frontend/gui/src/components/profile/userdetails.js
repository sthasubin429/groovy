import axios from 'axios';
import { Link } from 'react-router-dom';

import { useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';

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
					setFollower(res.data.length);
					getFollowingCount(userInfo.user);
				})
				.catch((err) => {
					getFollowingCount(userInfo.user);
					setFollower(0);
					window.location.replace('http://localhost:3000/500/');
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
				</>
			)}
		</>
	);
}
