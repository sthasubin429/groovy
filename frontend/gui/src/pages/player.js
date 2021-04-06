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
			<div className='container-fluid'>
				<div className='row'>
					<div className='col-12 col-md-8'>
						<CustomPlayer></CustomPlayer>
					</div>
					<div className='col-12 col-md-4'>
						<Playlist></Playlist>
					</div>
				</div>
			</div>
		</>
	);
}

export default Player;
