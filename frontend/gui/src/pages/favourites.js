import axios from 'axios';
import { useSelector } from 'react-redux';

import Loading from '../components/other/loading';
import { BASE_URL, TOKEN } from '../store/utility';

import React, { useEffect, useState } from 'react';
import { SongCard } from '../components/landing/featuredSongs';

export default function Favourites() {
	const [loading, setLoading] = useState(true);
	const userInfo = useSelector((state) => state.profile.user_info);
	const [likes, setLikes] = useState();
	const [songDetail, setSongDetail] = useState();

	useEffect(() => {
		if (userInfo) {
			axios
				.get(`${BASE_URL}/interaction/likes/api/user/${userInfo.user}/`, {
					headers: {
						authorization: 'Token ' + TOKEN,
					},
				})
				.then((res) => {
					setLikes(res.data);
				})
				.catch((err) => {
					setLikes([]);
					window.location.replace('http://localhost:3000/500/');
				});
		}
	}, [userInfo]);

	useEffect(() => {
		if (likes) {
			let likesObj = {};
			likes.forEach((like) => {
				axios
					.get(`${BASE_URL}/songs/api/${like.song}/`, {
						headers: {
							authorization: 'Token ' + TOKEN,
						},
					})
					.then((res) => {
						likesObj[like.song] = res.data;
						setSongDetail(likesObj);
						if (likes.length === Object.keys(likesObj).length) {
							setLoading(false);
						}
					})
					.catch((err) => {
						setLoading(false);
						window.location.replace('http://localhost:3000/500/');
					});
			});
		}
	}, [likes]);

	return (
		<>
			<div className='favourite-container'>
				<h4> Favourites </h4>

				{loading ? (
					<Loading />
				) : (
					<>
						<div className='d-flex flex-wrap justify-content-center'>
							{Object.keys(songDetail).map((song) => (
								<SongCard key={song} song={songDetail[song]} />
							))}
						</div>
					</>
				)}
			</div>
		</>
	);
}
