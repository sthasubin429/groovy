import axios from 'axios';
import Loading from '../other/loading';

import React, { useEffect, useState } from 'react';
import { BASE_URL, TOKEN } from '../../store/utility';

import { PlaylistCard } from '../playlist/playlistMain';

export default function FollowingPlaylist(props) {
	const [playlists, setPlaylists] = useState({});
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (props.users) {
			setLoading(true);

			let playlistClone = {};
			props.users.forEach((user) => {
				axios
					.get(`${BASE_URL}/songs/playlist/api/userPlaylist/${user.following}/`, {
						headers: {
							authorization: 'Token ' + TOKEN,
						},
					})
					.then((res) => {
						playlistClone[user.following] = res.data;
						setPlaylists(playlistClone);

						if (props.users.length === Object.keys(playlistClone).length) {
							setLoading(false);
						}
					})
					.catch((err) => {
						setLoading(false);
						window.location.replace('http://localhost:3000/500/');
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
						<h4> Recently Added Playlist</h4>
						<div className='playlist-main-container d-flex align-content-between justify-content-start flex-wrap'>
							{Object.keys(playlists).map((playlist) => (
								<PlaylistCardCover key={playlist} playlist={playlists[playlist]} />
							))}
						</div>
					</div>
				</>
			)}
		</>
	);
}

export function PlaylistCardCover(props) {
	return (
		<>
			{props.playlist.map((playlist) => (
				<PlaylistCard key={playlist.id} playlist={playlist} />
			))}
		</>
	);
}
