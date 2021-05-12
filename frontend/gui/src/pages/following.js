import axios from 'axios';
import { useSelector } from 'react-redux';

import Loading from '../components/other/loading';
import { BASE_URL, TOKEN } from '../store/utility';

import React, { useEffect, useState } from 'react';

import FollowingSongs from '../components/following/followingSongs';
import FollowingPlaylist from '../components/following/followingPlaylist';

export default function Following() {
	const userInfo = useSelector((state) => state.profile.user_info);
	const [following, setFollowing] = useState();
	const [loading, setLoading] = useState(true);

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
					setFollowing(res.data);
					setLoading(false);
				})
				.catch((err) => {
					setLoading(false);
					setFollowing([]);
					window.location.replace('http://localhost:3000/500/');
				});
		}
	}, [userInfo]);

	return (
		<>
			{loading ? (
				<Loading />
			) : (
				<>
					<FollowingSongs users={following} />

					<FollowingPlaylist users={following} />
				</>
			)}
		</>
	);
}
