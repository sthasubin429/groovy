import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';

import { changeSong } from '../../store/actions/player';

export const PlaylistDetails = (props) => {
	// console.log(props.index);

	const dispatch = useDispatch();
	return (
		<>
			<li
				className='d-flex'
				onClick={(e) => {
					console.log(dispatch(changeSong(props.index)));
				}}
			>
				<img src={props.song.song_photo} className='playlist-songImg' alt='Song' />

				<div className='playlist-songDetail'>
					<div className='text-capitalize'>{props.song.song_name}</div>
					<div>{props.song.getUsername}</div>
				</div>

				<div className='playlist-icon ml-auto'>Icon</div>
			</li>
		</>
	);
};

export default function Playlist() {
	const [loading, setLoading] = useState(true);
	const playlist = useSelector((state) => state.player.playlist_song_details);

	useEffect(() => {
		if (playlist) {
			// console.log(playlist);
			setLoading(false);
		}
	}, [playlist]);

	return (
		<>
			{loading ? (
				<div className='spinner-border text-primary' role='status'>
					<span className='sr-only'>Loading...</span>
				</div>
			) : (
				<div className='playlist-container'>
					<h4 className='playlist-header'>Current Playlist</h4>
					<ul>
						{playlist.map((song, index) => (
							<PlaylistDetails song={song} index={index} key={index} />
						))}
					</ul>
				</div>
			)}
		</>
	);
}
