import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL, TOKEN } from '../../store/utility';
import Loading from '../other/loading';
import { SongCard } from '../landing/featuredSongs';

export default function FollowingSongs(props) {
	const [songs, setSongs] = useState({});
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (props.users) {
			setLoading(true);

			let songClone = {};
			props.users.forEach((user) => {
				axios
					.get(`${BASE_URL}/songs/api/userSongs/${user.following}/`, {
						headers: {
							authorization: 'Token ' + TOKEN,
						},
					})
					.then((res) => {
						songClone[user.following] = res.data;
						setSongs(songClone);

						if (props.users.length === Object.keys(songClone).length) {
							setLoading(false);
						}
					})
					.catch((err) => {
						console.log(err);
						setLoading(false);
					});
			});
		}
	}, [props.users]);

	return (
		<>
			{loading ? (
				<Loading />
			) : (
				<>
					<div className='following-song-container'>
						<h4> Recently Added Songs</h4>
						<div className='d-flex flex-wrap justify-content-center'>
							{Object.keys(songs).map((song) => (
								<SongsList key={song} song={songs[song]} />
							))}
						</div>
					</div>
				</>
			)}
		</>
	);
}

export function SongsList(props) {
	return (
		<>
			{props.song.map((song) => (
				<SongCard key={song.id} song={song} />
			))}
		</>
	);
}
