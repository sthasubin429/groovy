import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { changeSong } from '../../store/actions/player';

export const PlaylistDetails = (props) => {
	const dispatch = useDispatch();
	return (
		<>
			<li
				className='d-flex'
				onClick={(e) => {
					dispatch(changeSong(props.index));
				}}
			>
				<img src={props.song.song_photo} className='playlist-songImg' alt='Song' width='50' height='50' />

				<div className='playlist-songDetail'>
					<div className='text-capitalize'>{props.song.song_name}</div>
					<div>{props.song.getUsername}</div>
				</div>
			</li>
		</>
	);
};

export default function Playlist(props) {
	const [loading, setLoading] = useState(true);
	const playlist = useSelector((state) => state.player.playlist_song_details);

	useEffect(() => {
		if (playlist) {
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
