import React, { useState, useEffect } from 'react';

function SongList(props) {
	console.log(props.songs);
	const [songs, setSongs] = useState(props.songs);

	useEffect(() => {
		setSongs(props.songs);
	}, [props.songs]);
	return (
		<>
			{songs.map((song) => (
				<>
					<div className='song-card d-flex'>
						<img src={song.song_photo} className='songList-songImg' alt='Song' />

						<div className='songList-songDetail'>
							<div className='text-capitalize'>{song.song_name}</div>
							<div>{song.getUsername}</div>
						</div>

						<div className='songList-icon ml-auto'>Icon</div>
					</div>
				</>
			))}
		</>
	);
}

export default SongList;
