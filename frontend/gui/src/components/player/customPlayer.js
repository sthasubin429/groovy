import React, { useState, useRef, useEffect } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faVolumeUp, faBars, faStepBackward, faStepForward, faRedo, faRandom } from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from 'react-redux';
import * as playerActions from '../../store/actions/player.js';

function CustomPlayer() {
	const [isPlaying, setIsPlaying] = useState(true);
	const [playlistCount, setPlaylistCount] = useState(0);
	const playerRef = useRef();
	const dispatch = useDispatch();

	const handlePausePlay = () => {
		if (isPlaying) {
			setIsPlaying(false);
			playerRef.current.pause();
		} else {
			setIsPlaying(true);
			playerRef.current.play();
		}
	};

	const song = useSelector((state) => state.player.current_song);
	const loading = useSelector((state) => state.player.loading);
	const playlist = useSelector((state) => state.player.playlist_details);
	const index = useSelector((state) => state.player.index);

	useEffect(() => {
		if (playlist) {
			setPlaylistCount(playlist.length);
		}
	}, [loading]);

	const resetIsPlaying = () => {
		setIsPlaying(true);
		playerRef.current.play();
	};

	const handleChange = (changeValue) => {
		// console.log('old index ' + index);
		if (changeValue === 'next') {
			if (index + 1 < playlistCount) {
				dispatch(playerActions.changeSong(index + 1));
				// console.log('inside if 1 ' + index);
			} else {
				dispatch(playerActions.changeSong(0));
				// console.log('inside else 1 ' + index);
			}
		} else if (changeValue === 'prev') {
			if (index > 0) {
				dispatch(playerActions.changeSong(index - 1));
				// console.log('inside if 2 ' + index);
			} else {
				dispatch(playerActions.changeSong(playlistCount - 1));
				// console.log('inside else 2 ' + index);
			}
		}
		// console.log('new index ' + index);
	};
	return (
		<>
			{loading ? (
				<div className='spinner-border text-primary' role='status'>
					<span className='sr-only'>Loading...</span>
				</div>
			) : (
				<>
					<audio autoPlay src={song.song_audio} ref={playerRef} />
					<div className='customPlayer-container left'>
						<div className='flex-container jc-center customPlayer-header'>
							<FontAwesomeIcon icon={faVolumeUp} size='2x' />
							<h2>Now Playing</h2>
							<FontAwesomeIcon icon={faBars} size='2x' />
						</div>

						<div className='flex-container jc-center'>
							<img src={song.song_photo} className='customPlayer-songImg' alt='Song' />
						</div>

						<div className='flex-container jc-center'>
							<h2> {song.song_name} </h2>
						</div>
						<div className='flex-container jc-center'>
							<h4> {song.getUsername} </h4>
						</div>

						<div className='flex-container jc-center ai-center customPlayer-controls'>
							<FontAwesomeIcon icon={faRedo} size='3x' />

							<div className='main-controls'>
								<FontAwesomeIcon
									icon={faStepBackward}
									size='3x'
									onClick={() => {
										handleChange('prev');
										resetIsPlaying();
									}}
								/>

								<FontAwesomeIcon icon={isPlaying ? faPause : faPlay} size='3x' onClick={handlePausePlay} />

								<FontAwesomeIcon
									icon={faStepForward}
									size='3x'
									onClick={() => {
										handleChange('next');
										resetIsPlaying();
									}}
								/>
							</div>

							<FontAwesomeIcon icon={faRandom} size='3x' />
						</div>
					</div>
				</>
			)}
		</>
	);
}

export default CustomPlayer;
