import React, { useEffect, useDeepCompareEffect, useState } from 'react';

function Playlist(props) {
	console.log(props.list);
	const [currentList, setCurrentList] = useState(props.list);

	useEffect(() => {
		setCurrentList(props.list);
	}, [props.list]);
	return (
		<>
			<h2>Current Playlist</h2>
			{currentList.map((song) => (
				<>
					<li>{song.song_name}</li>
					{/* <img src={song.song_photo} className='customPlayer-songImg' alt='Song' /> */}
				</>
			))}
		</>
	);
}

export default Playlist;
