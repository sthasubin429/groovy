import axios from 'axios';

import React, { useEffect, useState } from 'react';
import { BASE_URL } from '../store/utility.js';
import { useDispatch, useSelector } from 'react-redux';

import CustomPlayer from '../components/player/customPlayer';
import Playlist from '../components/player/playlist';
import { checkPlaylist } from '../store/actions/player';

function Player() {
	const [playlist, setPlaylist] = useState([]);
	const [currentPlaylist, setCurrentPlaylist] = useState([]);

	const [index, setIndex] = useState(0);
	const [nowPlaying, setNowPlaying] = useState([]);
	const [loading, setLoading] = useState(true);

	const token = localStorage.getItem('token');

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(checkPlaylist());
	}, []);

	useEffect(() => {
		setIndex(0);
		setLoading(true);

		axios
			.get(`${BASE_URL}/songs/playlistDetail/api/1/`, {
				headers: {
					authorization: 'Token ' + token,
				},
			})
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
				.get(`${BASE_URL}/songs/api/${song_id}/`, {
					headers: {
						authorization: 'Token ' + token,
					},
				})
				.then((res) => {
					setNowPlaying(res.data);
				})
				.catch((err) => {
					console.log(err);
				});
		}
	}, [index, loading]);

	useEffect(() => {
		// console.log(playlist);
		var tempList = [];
		playlist.forEach((element) => {
			// console.log(element);
			// console.log(element.playlist_songs);
			axios
				.get(`${BASE_URL}/songs/api/${element.playlist_songs}/`, {
					headers: {
						authorization: 'Token ' + token,
					},
				})
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
			<CustomPlayer></CustomPlayer>
			<Playlist list={currentPlaylist}></Playlist>
		</>
	);
}

export default Player;
