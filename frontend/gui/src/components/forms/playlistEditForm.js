import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Loading from '../other/loading';

export default function PlaylistEditForm(props) {
	// let playlist_id = localStorage.getItem('current_playlist');

	// const playlist = useSelector((state) => state.player.playlist_song_details);
	// const user = useSelector((state) => state.profile.user_info);

	const [playlist, setPlaylist] = useState(props.playlist);
	const [playlistInfo, setPlaylistInfo] = useState(props.playlistInfo);
	const [user, setUser] = useState(props.user);

	const [loading, setLoading] = useState(true);

	useEffect(() => {
		setPlaylist(props.playlist);
		setPlaylistInfo(props.playlistInfo);
		setUser(props.user);
	}, [props.playlistInfo, props.playlist, props.user]);

	useEffect(() => {
		if (playlist && user && playlistInfo) {
			setLoading(false);
		}
	}, [playlist, user, playlistInfo]);

	console.log(playlist, user, playlistInfo);

	return (
		<>
			{loading ? (
				<Loading />
			) : (
				<>
					<h3> Playlist Edit Form</h3>
				</>
			)}
		</>
	);
}
