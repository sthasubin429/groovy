import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Playlist from '../components/player/playlist';
import { checkPlaylist } from '../store/actions/player';
import CustomPlayer from '../components/player/customPlayer';

function Player() {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(checkPlaylist());
	}, []);

	return (
		<>
			<CustomPlayer></CustomPlayer>
			<Playlist></Playlist>
		</>
	);
}

export default Player;
