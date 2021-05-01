import { useSelector, useDispatch } from 'react-redux';
import React, { useState, useRef, useEffect } from 'react';

import * as playerActions from '../../store/actions/player.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Playlist from './playlist';

import { faPlay, faPause, faVolumeUp, faBars, faStepBackward, faStepForward, faRedo, faRandom } from '@fortawesome/free-solid-svg-icons';

import AudioPlayer, { RHAP_UI } from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

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

	const [displayPlaylist, setDisplayPlaylist] = useState(true);

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
					{/* <audio autoPlay src={song.song_audio} ref={playerRef} /> */}

					<div className='container-fluid customPlayer-container d-flex flex-column flex-lg-row justify-content-evenly'>
						<div className='flex-fill'>
							<div className='customPlayer-header'>
								{/* <FontAwesomeIcon
									icon={faBars}
									size='2x'
									className='col-2'
									onClick={() => {
										setDisplayPlaylist(!displayPlaylist);
									}}
								/> */}
								<h2 className='d-flex justify-content-center'>Now Playing</h2>
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
							<AudioPlayer
								autoPlay
								src={song.song_audio}
								showSkipControls={true}
								showJumpControls={false}
								customAdditionalControls={[
									RHAP_UI.LOOP,
									<FontAwesomeIcon
										icon={faBars}
										size='1x'
										className='mx-2'
										onClick={() => {
											setDisplayPlaylist(!displayPlaylist);
										}}
									/>,
								]}
								onClickPrevious={(e) => {
									handleChange('prev');
								}}
								onClickNext={(e) => {
									handleChange('next');
								}}
								onEnded={(e) => {
									handleChange('next');
								}}
								// other props here
							/>
							{/* <div className='flex-container jc-center ai-center customPlayer-controls'>
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
							</div> */}
						</div>
						{displayPlaylist ? (
							<>
								<div className=''>
									<Playlist />
								</div>
							</>
						) : (
							<></>
						)}
					</div>
				</>
			)}
		</>
	);
}

export default CustomPlayer;
