import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { checkPlaylist } from '../store/actions/player';
import CustomPlayer from '../components/player/customPlayer';
import InteractionBar from '../components/player/interactionBar';
import PostComment from '../components/player/postComment';
import SongComments from '../components/player/songComments';

function Player() {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(checkPlaylist());
	}, []);

	return (
		<>
			<div className='container-fluid'>
				<div className='row'>
					<CustomPlayer />
				</div>

				<div className='row'>
					<InteractionBar />
				</div>

				<div className='row'>
					<PostComment />
				</div>
				<div className='row'>
					<SongComments />
				</div>
			</div>
		</>
	);
}

export default Player;
