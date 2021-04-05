import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
export default function PlaylistMain(props) {
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

			<button>
				<Link to='/playlistCreate'>CreatePlaylist</Link>
			</button>
		</>
	);
}
