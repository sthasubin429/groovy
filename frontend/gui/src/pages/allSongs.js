import axios from 'axios';

import React, { useState, useEffect } from 'react';
import { BASE_URL } from '../store/utility.js';
import SongList from '../components/songList.js';

function AllSongs() {
	const [songs, setSongs] = useState([]);

	const token = localStorage.getItem('token');

	useEffect(() => {
		setSongs([]);
		axios
			.get(`${BASE_URL}/songs/api/`, {
				headers: {
					authorization: 'Token ' + token,
				},
			})
			.then((res) => {
				setSongs(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	return (
		<>
			<h2> All Songs</h2>
			<SongList songs={songs} />
		</>
	);
}

export default AllSongs;
