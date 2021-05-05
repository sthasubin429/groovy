import axios from 'axios';

import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

import { BASE_URL, TOKEN } from '../store/utility';
import { useDispatch, useSelector } from 'react-redux';

import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { changePlaylist, checkPlaylist } from '../store/actions/player';

export default function PlaylistDetail() {
	const dispatch = useDispatch();

	let playlist_id = localStorage.getItem('current_playlist');

	const playlist = useSelector((state) => state.player.playlist_song_details);
	const user = useSelector((state) => state.profile.user_info);

	const [loading, setLoading] = useState(true);
	const [playlistInfo, setplaylistInfo] = useState(null);

	const [allowChange, setAllowChange] = useState(false);

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
	useEffect(() => {
		if (playlistInfo && user) {
			if (playlistInfo.created_by === user.user) {
				setAllowChange(true);
			} else {
				setAllowChange(false);
			}
		} else {
			setAllowChange(false);
		}
	}, [user, playlistInfo]);

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
					<div className='playlistDetail-table'>
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
						{allowChange ? (
							<>
								<div className='playlist-table-btn d-flex justify-content-around'>
									<button className='btn btn-secondary'> Edit</button>
									<button type='button' className='btn btn-danger' data-toggle='modal' data-target='#exampleModalCenter'>
										Delete
									</button>
								</div>
								<div
									className='modal fade'
									id='exampleModalCenter'
									tabindex='-1'
									role='dialog'
									aria-labelledby='exampleModalCenterTitle'
									aria-hidden='true'
								>
									<div className='modal-dialog modal-dialog-centered' role='document'>
										<div className='modal-content'>
											<div className='modal-header'>
												<h5 className='modal-title' id='exampleModalLongTitle'>
													Are you sure you want to Delete your Playlist?
												</h5>
												<button type='button' className='close' data-dismiss='modal' aria-label='Close'>
													<span aria-hidden='true'>&times;</span>
												</button>
											</div>
											<div className='modal-body'> You cannot Undo Your Action</div>
											<div className='modal-footer'>
												<button type='button' className='btn btn-secondary' data-dismiss='modal'>
													Close
												</button>
												<button
													type='button'
													className='btn btn-danger'
													onClick={(event) => {
														event.preventDefault();
														if (TOKEN) {
															axios
																.delete(`${BASE_URL}/songs/playlist/api/${playlistInfo.id}/delete/`, {
																	headers: {
																		authorization: 'Token ' + TOKEN,
																	},
																})
																.then((res) => {
																	// console.log(res.data);
																	window.location.replace('http://localhost:3000/playlist');
																})
																.catch((err) => {
																	console.log(err);
																});
														}
													}}
												>
													Delete
												</button>
											</div>
										</div>
									</div>
								</div>
							</>
						) : (
							<></>
						)}
					</div>
				</div>
			)}
		</>
	);
}

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
