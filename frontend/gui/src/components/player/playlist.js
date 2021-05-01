import { useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';

function Playlist() {
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
						{playlist.map((song) => (
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
			)}
		</>
	);
}

export default Playlist;
