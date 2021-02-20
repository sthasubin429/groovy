import axios from 'axios';
import React, { useEffect, useState } from 'react';

import { BASE_URL } from '../store/utility.js';

import CustomPlayer from '../components/player/customPlayer';

function Player() {
	const [playlist, setPlaylist] = useState([]);
	const [index, setIndex] = useState(0);
	const [nowPlaying, setNowPlaying] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		setLoading(true);
		axios
			.get(`${BASE_URL}/songs/playlistDetail/api/1/`)
			.then((res) => {
				setPlaylist(res.data);
				setLoading(false);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	useEffect(() => {
		if (!loading) {
			handleNowPlaying();
			handleChange('next');
		}
	}, [loading]);

	const handleNowPlaying = () => {
		const song_id = playlist[index].playlist_songs;
		axios
			.get(`${BASE_URL}/songs/api/${song_id}/`)
			.then((res) => {
				setNowPlaying(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const handleChange = (changeValue) => {
		console.log('old index ' + index);
		if (changeValue === 'next') {
			if (index + 1 < playlist.length) {
				const newIndex = index + 1;
				setIndex(newIndex);
				console.log('inside if ' + index);
			} else {
				setIndex(0);
				console.log('inside else ' + index);
			}
		} else if (changeValue === 'prev') {
			if (index !== 0 && index > 0) {
				const newIndex = index - 1;
				setIndex(newIndex);
			} else {
				setIndex(playlist.length - 1);
			}
		}

		console.log('new index ' + index);
		handleNowPlaying();
	};

	return (
		<>
			<CustomPlayer song={nowPlaying} handleChange={handleChange}></CustomPlayer>
		</>
	);
}

export default Player;
