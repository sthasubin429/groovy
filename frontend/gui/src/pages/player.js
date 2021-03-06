import axios from 'axios';

import React, { useEffect, useState } from 'react';
import { BASE_URL } from '../store/utility.js';

import CustomPlayer from '../components/player/customPlayer';
import Playlist from '../components/player/playlist';

function Player() {
	const [playlist, setPlaylist] = useState([]);
	const [currentPlaylist, setCurrentPlaylist] = useState([]);

	const [index, setIndex] = useState(0);
	const [nowPlaying, setNowPlaying] = useState([]);
	const [loading, setLoading] = useState(true);

	const handleChange = (changeValue) => {
		console.log(changeValue);
		console.log('old index ' + index);
		if (changeValue === 'next') {
			if (index + 1 < playlist.length) {
				console.log('inside if ' + index);
				setIndex(index + 1);
			} else {
				setIndex(0);
				console.log('inside else ' + index);
			}
		} else if (changeValue === 'prev') {
			if (index > 0) {
				setIndex(index - 1);
				console.log('inside if ' + index);
			} else {
				setIndex(playlist.length - 1);
			}
		}

		console.log('new index ' + index);
		// handleNowPlaying();
	};

	useEffect(() => {
		setIndex(0);
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
			const song_id = playlist[index].playlist_songs;
			axios
				.get(`${BASE_URL}/songs/api/${song_id}/`)
				.then((res) => {
					setNowPlaying(res.data);
				})
				.catch((err) => {
					console.log(err);
				});
		}
	}, [index, loading]);

	useEffect(() => {
		console.log(playlist);
		var tempList = [];
		playlist.forEach((element) => {
			console.log(element);
			console.log(element.playlist_songs);
			axios
				.get(`${BASE_URL}/songs/api/${element.playlist_songs}/`)
				.then((res) => {
					tempList.push(res.data);
				})
				.catch((err) => {
					console.log(err);
				});
		});
		setCurrentPlaylist(tempList);
	}, [playlist]);

	return (
		<>
			Player
			<CustomPlayer song={nowPlaying} handleChange={handleChange}></CustomPlayer>
			<Playlist list={currentPlaylist}></Playlist>
		</>
	);
}

export default Player;

// import axios from 'axios';
// import React, { useEffect, useState } from 'react';

// import { BASE_URL } from '../store/utility.js';

// import CustomPlayer from '../components/player/customPlayer';
// import Playlist from '../components/player/playlist';

// function Player() {
// 	const [playlist, setPlaylist] = useState([]);
// 	const [currentPlaylist, setCurrentPlaylist] = useState([]);

// 	const [index, setIndex] = useState(0);
// 	const [nowPlaying, setNowPlaying] = useState([]);
// 	const [loading, setLoading] = useState(true);

// 	const handleNowPlaying = () => {
// 		const song_id = playlist[index].playlist_songs;
// 		axios
// 			.get(`${BASE_URL}/songs/api/${song_id}/`)
// 			.then((res) => {
// 				setNowPlaying(res.data);
// 			})
// 			.catch((err) => {
// 				console.log(err);
// 			});
// 	};

// 	const handleChange = (changeValue) => {
// 		console.log(changeValue);
// 		console.log('old index ' + index);
// 		if (changeValue === 'next') {
// 			if (index + 1 < playlist.length) {
// 				console.log('inside if ' + index);
// 				setIndex(index + 1);
// 			} else {
// 				setIndex(0);
// 				console.log('inside else ' + index);
// 			}
// 		} else if (changeValue === 'prev') {
// 			if (index > 0) {
// 				setIndex(index - 1);
// 				console.log('inside if ' + index);
// 			} else {
// 				setIndex(playlist.length - 1);
// 			}
// 		}

// 		console.log('new index ' + index);
// 		handleNowPlaying();
// 	};

// 	const getPlaylistItems = () => {
// 		console.log('hello');
// 		console.log(playlist);
// 		var tempList = [];
// 		playlist.forEach((element) => {
// 			console.log(element);
// 			console.log(element.playlist_songs);
// 			axios
// 				.get(`${BASE_URL}/songs/api/${element.playlist_songs}/`)
// 				.then((res) => {
// 					tempList.push(res.data);
// 				})
// 				.catch((err) => {
// 					console.log(err);
// 				});
// 		});
// 		setCurrentPlaylist(tempList);
// 	};

// 	useEffect(() => {
// 		setIndex(0);
// 		setLoading(true);
// 		axios
// 			.get(`${BASE_URL}/songs/playlistDetail/api/1/`)
// 			.then((res) => {
// 				setPlaylist(res.data);
// 				setLoading(false);
// 			})
// 			.catch((err) => {
// 				console.log(err);
// 			});
// 	}, []);

// 	useEffect(() => {
// 		if (!loading) {
// 			handleNowPlaying();
// 			handleChange('next');
// 			getPlaylistItems();
// 		}
// 	}, [loading]);

// 	return (
// 		<>
// 			<CustomPlayer song={nowPlaying} handleChange={handleChange}></CustomPlayer>

// 			<Playlist list={currentPlaylist}></Playlist>
// 		</>
// 	);
// }

// export default Player;
