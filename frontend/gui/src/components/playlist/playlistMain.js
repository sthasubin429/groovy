import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { changePlaylist, playerUpdateLikeCount } from '../../store/actions/player';
import { useDispatch } from 'react-redux';

const PlaylistCard = (props) => {
	const dispatch = useDispatch();
	return (
		<>
			{props.playlist.map((list) => (
				<>
					<div className='playlist-card'>
						<img src={list.playlist_cover} width='155' height='140' />

						<Link
							to='/player'
							onClick={() => {
								dispatch(changePlaylist(list.id));
							}}
						>
							<h4 className='text-center'>{list.playlist_name}</h4>
						</Link>

						<h6 className='text-center'> {list.getUsername}</h6>
					</div>
				</>
			))}
		</>
	);
};
export default function PlaylistMain(props) {
	const [playlist, setPlaylist] = useState(props.playlist);
	// const dispatch = useDispatch();
	console.log(playlist);

	useEffect(() => {
		setPlaylist(props.playlist);
	}, [props.playlist]);

	return (
		<>
			<div className='playlist-main-container d-flex align-content-between justify-content-start flex-wrap'>
				<PlaylistCard playlist={playlist} />
			</div>
		</>
	);
}
