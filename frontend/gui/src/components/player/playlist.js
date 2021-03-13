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
			<ul>
				{currentList.map((song) => (
					<>
						<li className='d-flex'>
							<img src={song.song_photo} className='playlist-songImg' alt='Song' />

							<div className='playlist-songDetail'>
								<div className='text-capitalize'>{song.song_name}</div>
								<div>{song.getUsername}</div>
							</div>

							<div className='playlist-icon ml-auto'>Icon</div>
						</li>
					</>
				))}
			</ul>
		</div>
	);
}

export default Playlist;
