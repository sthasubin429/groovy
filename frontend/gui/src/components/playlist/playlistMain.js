import React, { useEffect, useState } from 'react';

export default function PlaylistMain(props) {
	console.log(props.playlist);
	const [playlist, setPlaylist] = useState(props.playlist);

	useEffect(() => {
		setPlaylist(props.playlist);
	}, [props.playlist]);
	return (
		<>
			{playlist.map((list) => (
				<>
					<h3> {list.playlist_name}</h3>
					<h4> {list.getUsername}</h4>
					<hr />
				</>
			))}
		</>
	);
}
