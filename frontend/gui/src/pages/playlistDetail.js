import axios from 'axios';

import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

import { BASE_URL, TOKEN } from '../store/utility';
import { useDispatch, useSelector } from 'react-redux';

import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { changePlaylist, checkPlaylist } from '../store/actions/player';

export function GenerateRows(props) {
	let date = new Date(props.song.song_date);
	const [likes, setLikes] = useState(0);
	useEffect(() => {
		axios
			.get(`${BASE_URL}/interaction/likes/api/song/${props.song.id}/`, {
				headers: {
					authorization: 'Token ' + TOKEN,
				},
			})
			.then((res) => {
				setLikes(res.data.length);
			})
			.catch((err) => {
				console.log(err);
			});
	}, [props.song]);
	return (
		<>
			<tr
				onClick={() => {
					window.location.replace('http://localhost:3000/listen');
					localStorage.setItem('listen', props.song.id);
				}}
			>
				<th scope='row'>
					<img src={props.song.song_photo} width='30' height='30'></img>
				</th>
				<td>{props.song.song_name}</td>
				<td>{props.song.getUsername}</td>
				<td>
					{date.getFullYear()}-{date.getMonth()}-{date.getDay()}
				</td>
				<td>{likes}</td>
			</tr>
		</>
	);
}
export default function PlaylistDetail() {
	const dispatch = useDispatch();

	let playlist_id = localStorage.getItem('current_playlist');
	const playlist = useSelector((state) => state.player.playlist_song_details);
	const [loading, setLoading] = useState(true);
	const [playlistInfo, setplaylistInfo] = useState(null);

	useEffect(() => {
		dispatch(checkPlaylist());
		axios
			.get(`${BASE_URL}/songs/playlist/api/${playlist_id}/`, {
				headers: {
					authorization: 'Token ' + TOKEN,
				},
			})
			.then((res) => {
				setplaylistInfo(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, [playlist_id]);

	useEffect(() => {
		if (playlist && playlistInfo) {
			setLoading(false);
		}
	}, [playlist, playlistInfo]);

	console.log(playlistInfo);

	return (
		<>
			{loading ? (
				<div className='spinner-border text-primary' role='status'>
					<span className='sr-only'>Loading...</span>
				</div>
			) : (
				<div className='playlistDetail-container'>
					<div className='playlistDetail-header clearfix'>
						<div className='header-img float-left'>
							<img src={playlistInfo.playlist_cover} width='200' />
						</div>
						<div className='header-info d-flex flex-column justify-content-end'>
							<Link to='/player' className='header-button'>
								<FontAwesomeIcon
									icon={faPlay}
									className='header-icon'
									onClick={() => {
										dispatch(changePlaylist(playlistInfo.id));
									}}
								/>{' '}
								Play
							</Link>
							<p className='header-title'>PLAYLIST</p>
							<h2 className='header-name'>{playlistInfo.playlist_name}</h2>
							<p className='header-username'>
								{' '}
								{playlistInfo.getUsername} &middot; {playlistInfo.getSongCount} Songs
							</p>
						</div>
					</div>
					<table class='table table-hover table-striped'>
						<thead>
							<tr>
								<th scope='col'></th>
								<th scope='col'>Title</th>
								<th scope='col'>Uploaded By</th>
								<th scope='col'>Date</th>
								<th scope='col'>Likes</th>
							</tr>
						</thead>
						<tbody>
							{playlist.map((song, index) => (
								<GenerateRows song={song} index={index} key={index} />
							))}
						</tbody>
					</table>
				</div>
			)}
		</>
	);
}
