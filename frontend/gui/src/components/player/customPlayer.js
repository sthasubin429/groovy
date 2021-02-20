import React, { useState, useRef, useCallback, useEffect } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faVolumeUp, faBars, faStepBackward, faStepForward, faRedo, faRandom } from '@fortawesome/free-solid-svg-icons';

function CustomPlayer(props) {
	const [isPlaying, setIsPlaying] = useState(true);

	const playerRef = useRef();

	// const handlePlay = useCallback(() => {
	// 	setIsPlaying(true);
	// 	playerRef.current.play();
	// }, []);

	// const handlePause = useCallback(() => {
	// 	setIsPlaying(false);
	// 	playerRef.current.pause();
	// }, []);

	const handlePausePlay = () => {
		if (isPlaying) {
			setIsPlaying(false);
		} else {
			setIsPlaying(true);
		}
	};

	useEffect(() => {
		if (isPlaying) {
			playerRef.current.play();
		} else {
			playerRef.current.pause();
		}
	}, [isPlaying]);

	const resetIsPlaying = () => {
		setIsPlaying(true);
		playerRef.current.play();
	};

	return (
		<>
			<audio autoplay src={props.song.song_audio} ref={playerRef} />

			<div className='customPlayer-container'>
				<div className='flex-container jc-center customPlayer-header'>
					<FontAwesomeIcon icon={faVolumeUp} size='2x' />
					<h2>Now Playing</h2>
					<FontAwesomeIcon icon={faBars} size='2x' />
				</div>

				<div className='flex-container jc-center'>
					<img src={props.song.song_photo} className='customPlayer-songImg' alt='Song' />
				</div>

				<div className='flex-container jc-center'>
					<h2> {props.song.song_name} </h2>
				</div>
				<div className='flex-container jc-center'>
					<h4> {props.song.username} </h4>
				</div>

				<div className='flex-container jc-center ai-center customPlayer-controls'>
					<FontAwesomeIcon icon={faRedo} size='4x' />

					<div className='main-controls'>
						<FontAwesomeIcon
							icon={faStepBackward}
							size='4x'
							onClick={() => {
								props.handleChange('prev');
								resetIsPlaying();
							}}
						/>

						<FontAwesomeIcon icon={isPlaying ? faPause : faPlay} size='4x' onClick={handlePausePlay} />

						<FontAwesomeIcon
							icon={faStepForward}
							size='4x'
							onClick={() => {
								props.handleChange('next');
								resetIsPlaying();
							}}
						/>
					</div>

					<FontAwesomeIcon icon={faRandom} size='4x' />
				</div>
			</div>
		</>
	);
}

export default CustomPlayer;
