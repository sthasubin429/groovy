import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { BASE_URL, POST } from '../store/utility.js';
import PlaylistCreateForm from '../components/forms/playlistCreateForm.js';

export default function PlaylistCreate() {
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
			<PlaylistCreateForm requestType={POST} songs={songs} className='container' />
		</>
	);
}
