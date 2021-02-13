import React from 'react';

function CustomPlayer(props) {
	return (
		<>
			Custom Player
			<button onClick={() => props.handleChange('prev')}> Previous</button>
			<audio autoPlay controls src={props.song.song_audio} />
			<button onClick={() => props.handleChange('next')}> Next</button>
			<h2> {props.song.song_name} </h2>
		</>
	);
}

export default CustomPlayer;
