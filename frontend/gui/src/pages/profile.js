import React, { useState, useEffect } from 'react';
import UserDetails from '../components/profile/userdetails.js';
import PlaylistMain from '../components/playlist/playlistMain.js';
import SongList, { SongCard } from '../components/songList.js';
import { useSelector } from 'react-redux';

export default function Profile() {
	const [loading, setLoading] = useState(true);
	const playlist = useSelector((state) => state.profile.playlist_list);
	const songs = useSelector((state) => state.profile.song_list);
	useEffect(() => {
		if (playlist && songs) {
			// console.log(playlist);
			setLoading(false);
		}
	}, [playlist, songs]);
	return (
		<>
			<div className='continer-fluid'>
				<div className='row'>
					<UserDetails />
				</div>

				<div className='row'>
					<div className='col-12'>
						{loading ? (
							<div className='spinner-border text-primary' role='status'>
								<span className='sr-only'>Loading...</span>
							</div>
						) : (
							<>
								<h3> Playlist </h3>
								<div className='d-flex'>
									<PlaylistMain playlist={playlist} />
								</div>
							</>
						)}
					</div>
				</div>

				<div className='row'>
					<div className='col-12'>
						{loading ? (
							<div className='spinner-border text-primary' role='status'>
								<span className='sr-only'>Loading...</span>
							</div>
						) : (
							<>
								<h3> Songs </h3>
								<div className='d-flex flex-wrap'>
									{songs.map((song) => (
										<SongCard key={song.id} song={song} />
									))}
								</div>
							</>
						)}
					</div>
				</div>
			</div>
		</>
	);
}
