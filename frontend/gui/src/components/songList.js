import React, { useState, useEffect } from 'react';

const SongCard = (props) => {
	return (
		<>
			<div className='song-card'>
				<img src={props.song.song_photo} className='songList-songImg text-center' alt='Song' />

				<div className='songList-songDetail'>
					<div className='text-capitalize text-center'>{props.song.song_name}</div>
					<div className='text-center'>{props.song.getUsername}</div>
				</div>
			</div>
		</>
	);
};

function SongList(props) {
	// console.log(props.songs);
	const [songs, setSongs] = useState(props.songs);
	console.log(songs);

	useEffect(() => {
		setSongs(props.songs);
	}, [props.songs]);

	return (
		<>
			<div className='d-flex flex-wrap'>
				{songs.map((song) => (
					<SongCard key={song.id} song={song} />
				))}
			</div>
		</>
	);
}

export default SongList;
