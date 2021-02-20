import React, { useState, useRef, useCallback, useEffect } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons';

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

	return (
		<>
			<button onClick={() => props.handleChange('prev')}> Previous</button>
			<audio autoplay controls src={props.song.song_audio} ref={playerRef} />
			<button onClick={() => props.handleChange('next')}> Next</button>
			<h2> {props.song.song_name} </h2>
			<img src={props.song.song_photo} className='customPlayer-songImg' alt='Song' />

			<FontAwesomeIcon icon={isPlaying ? faPause : faPlay} size='5x' onClick={handlePausePlay} />
		</>
	);
}

export default CustomPlayer;
