import { useSelector } from 'react-redux';

import React, { useState, useEffect } from 'react';
import { SongCard } from '../components/songList.js';

import UserDetails from '../components/profile/userdetails.js';
import { PlaylistCard } from '../components/playlist/playlistMain.js';

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
			<div className='artistProfile-container'>
				<UserDetails />
				<div className='artistProfile-playlist'>
					{loading ? (
						<div className='spinner-border text-primary' role='status'>
							<span className='sr-only'>Loading...</span>
						</div>
					) : (
						<>
							<h3> Playlist </h3>
							<div className='playlist-main-container d-flex align-content-between justify-content-start flex-wrap'>
								{playlist.map((list) => (
									<PlaylistCard key={list.id} playlist={list} />
								))}
							</div>
						</>
					)}
				</div>

				<div className='artistProfile-songs'>
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
		</>
	);
}
