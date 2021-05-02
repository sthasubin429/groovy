import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { changePlaylist } from '../../store/actions/player';
import { useDispatch } from 'react-redux';

export default function PlaylistMain(props) {
	const [playlist, setPlaylist] = useState(props.playlist);
	const dispatch = useDispatch();
	console.log(playlist);

	useEffect(() => {
		setPlaylist(props.playlist);
	}, [props.playlist]);

	return (
		<>
			{playlist.map((list) => (
				<>
					<h3>
						<Link
							to='/player'
							onClick={() => {
								dispatch(changePlaylist(list.id));
							}}
						>
							{list.playlist_name}
						</Link>
					</h3>
					<h4> {list.getUsername}</h4>
					<hr />
				</>
			))}
		</>
	);
}
