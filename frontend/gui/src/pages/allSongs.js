import axios from 'axios';

import React, { useState, useEffect } from 'react';
import { BASE_URL, TOKEN } from '../store/utility.js';
import SongList from '../components/songList.js';

function AllSongs() {
	const [songs, setSongs] = useState([]);

	useEffect(() => {
		setSongs([]);
		axios
			.get(`${BASE_URL}/songs/api/`, {
				headers: {
					authorization: 'Token ' + TOKEN,
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
			<div className='songlist-container'>
				<h2 className='songlist-title'> All Songs</h2>
				<SongList songs={songs} />
			</div>
		</>
	);
}

export default AllSongs;
