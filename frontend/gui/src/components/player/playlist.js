import React, { useEffect, useState } from 'react';

function Playlist(props) {
	// const [currentList, setCurrentList] = useState(props.list);
	// console.log(currentList);

	// useEffect(() => {
	// 	setCurrentList(props.list);
	// }, [props.list]);

	return (
		<>Playlist</>
		// <div className='playlist-container left'>
		// 	<h2 className='playlist-header'>Current Playlist</h2>
		// 	<ul>
		// 		{currentList.map((song) => (
		// 			<>
		// 				<li className='d-flex'>
		// 					<img src={song.song_photo} className='playlist-songImg' alt='Song' />

		// 					<div className='playlist-songDetail'>
		// 						<div className='text-capitalize'>{song.song_name}</div>
		// 						<div>{song.getUsername}</div>
		// 					</div>

		// 					<div className='playlist-icon ml-auto'>Icon</div>
		// 				</li>
		// 			</>
		// 		))}
		// 	</ul>
		// </div>
	);
}

export default Playlist;

// import React, { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';

// function Playlist(props) {
// 	// const [currentList, setCurrentList] = useState(props.list);
// 	const currentList = useSelector((state) => state.player.playlist_details);
// 	const loading = useSelector((state) => state.player.loading);
// 	console.log(currentList);
// 	return (
// 		<>
// 			{loading ? (
// 				<div className='spinner-border text-primary' role='status'>
// 					<span className='sr-only'>Loading...</span>
// 				</div>
// 			) : (
// 				<div className='playlist-container left'>
// 					<h2 className='playlist-header'>Current Playlist</h2>
// 					<ul>
// 						{currentList.map((song) => (
// 							<>
// 								<li className='d-flex'>
// 									<img src={song.song_photo} className='playlist-songImg' alt='Song' />

// 									<div className='playlist-songDetail'>
// 										<div className='text-capitalize'>{song.song_name}</div>
// 										<div>{song.getUsername}</div>
// 									</div>

// 									<div className='playlist-icon ml-auto'>Icon</div>
// 								</li>
// 							</>
// 						))}
// 					</ul>
// 				</div>
// 			)}
// 		</>
// 	);
// }

// export default Playlist;
