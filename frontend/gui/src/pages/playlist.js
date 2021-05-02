import axios from 'axios';
import { BASE_URL } from '../store/utility.js';
import React, { useState, useEffect } from 'react';
import PlaylistMain from '../components/playlist/playlistMain.js';
import { Link } from 'react-router-dom';

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
			<div className='w-100 m-2 p-3 playlist-container'>
				<div className='clearfix playlist-header'>
					<h2 className='float-left playlist-title'>All Playlist</h2>

					<Link to='/playlistCreate' className='float-right'>
						<button className='btn btn-secondary'> CreatePlaylist</button>
					</Link>
				</div>
				<PlaylistMain playlist={playlist} />
			</div>
		</>
	);
}
