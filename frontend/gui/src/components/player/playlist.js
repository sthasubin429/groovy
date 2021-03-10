import React, { useEffect, useState } from 'react';

function Playlist(props) {
	// console.log(props.list);
	const [currentList, setCurrentList] = useState(props.list);

	useEffect(() => {
		setCurrentList(props.list);
	}, [props.list]);

	return (
		<div className='playlist-container left'>
			<h2 className='playlist-header'>Current Playlist</h2>

			{currentList.map((song) => (
				<>
					<li>{song.song_name}</li>
					{/* <img src={song.song_photo} className='customPlayer-songImg' alt='Song' /> */}
				</>
			))}
		</div>
	);
}

export default Playlist;
