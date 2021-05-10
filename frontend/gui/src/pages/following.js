import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { BASE_URL, TOKEN } from '../store/utility';
import Loading from '../components/other/loading';
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
					console.log(err);
					setLoading(false);
					setFollowing([]);
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
