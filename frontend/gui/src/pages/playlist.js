import axios from 'axios';
import { BASE_URL } from '../store/utility.js';
import React, { useState, useEffect } from 'react';
import PlaylistMain from '../components/playlist/playlistMain.js';

export default function Playlist() {
	const [playlist, setPlaylst] = useState([]);
	const token = localStorage.getItem('token');

	useEffect(() => {
		setPlaylst([]);
		axios
			.get(`${BASE_URL}/songs/playlist/api/`, {
				headers: {
					authorization: 'Token ' + token,
				},
			})
			.then((res) => {
				setPlaylst(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	return (
		<>
			<h2>All Playlist</h2>

			<PlaylistMain playlist={playlist} />
		</>
	);
}
