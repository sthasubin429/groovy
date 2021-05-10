import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { BASE_URL, TOKEN } from '../store/utility';
import PlaylistEditForm from '../components/forms/playlistEditForm';
import { checkPlaylist } from '../store/actions/player';

export default function PlaylistEdit() {
	const dispatch = useDispatch();
	let playlist_id = localStorage.getItem('current_playlist');
	const playlist = useSelector((state) => state.player.playlist_song_details);
	const user = useSelector((state) => state.profile.user_info);
	const [playlistInfo, setPlaylistInfo] = useState();
	const [accessError, setAccessError] = useState(false);

	useEffect(() => {
		if (playlist_id) {
			dispatch(checkPlaylist());
			axios
				.get(`${BASE_URL}/songs/playlist/api/${playlist_id}`, {
					headers: {
						authorization: 'Token ' + TOKEN,
					},
				})
				.then((res) => {
					setPlaylistInfo(res.data);
				})
				.catch((err) => {
					console.log(err);
				});
		}
	}, [playlist_id]);

	useEffect(() => {
		if (playlistInfo && user) {
			if (playlistInfo.created_by !== user.user) {
				setAccessError(true);
			} else {
				setAccessError(false);
			}
		}
	}, [playlistInfo, user]);

	// console.log(playlistInfo, user);

	return (
		<>
			{accessError ? (
				<>
					<h1> You Do not have access to edit this Playlist</h1>
				</>
			) : (
				<>
					<PlaylistEditForm playlist={playlist} playlistInfo={playlistInfo} user={user} />
				</>
			)}
		</>
	);
}
