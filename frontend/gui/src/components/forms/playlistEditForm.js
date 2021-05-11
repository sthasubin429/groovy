import axios from 'axios';
import Loading from '../other/loading';

import React, { useEffect, useRef, useState } from 'react';
import { BASE_URL, DELETE, PUT, TOKEN, POST } from '../../store/utility';

export default function PlaylistEditForm(props) {
	let playlist_id = localStorage.getItem('current_playlist');

	const [playlist, setPlaylist] = useState(props.playlist);
	const [playlistInfo, setPlaylistInfo] = useState(props.playlistInfo);
	const [playlistDetail, setPlaylistDetail] = useState(props.playlistDetail);
	const [user, setUser] = useState(props.user);
	const [imageFile, setImageFile] = useState();

	const [loading, setLoading] = useState(true);
	const [loadingPlaylistDetail, setLoadingPlaylistDetail] = useState(false);
	const songCover = useRef();
	const [error, setError] = useState(false);

	useEffect(() => {
		setPlaylist(props.playlist);
		setPlaylistInfo(props.playlistInfo);
		setUser(props.user);
		setPlaylistDetail(props.playlistDetail);
	}, [props.playlistInfo, props.playlist, props.user, props.playlistDetail]);

	useEffect(() => {
		if (playlist && user && playlistInfo) {
			setLoading(false);
		}
	}, [playlist, user, playlistInfo]);

	const handleImageFile = (e) => {
		let image = e.target.files[0];
		songCover.current.src = URL.createObjectURL(image);
		setImageFile(image);
	};
	// console.log(playlist, user, playlistInfo, playlistDetail);
	// console.log(playlistDetail);

	const handleSubmit = (event, requestType) => {
		setLoadingPlaylistDetail(true);
		event.preventDefault();
		console.log(event.target.elements.playlistName.value);
		let formData = new FormData();
		formData.append('playlist_name', event.target.elements.playlistName.value);
		formData.append('created_by', user.user);
		setLoadingPlaylistDetail(false);
		if (imageFile) {
			formData.append('playlist_cover', imageFile);
		}

		switch (requestType) {
			case PUT:
				if (TOKEN) {
					axios
						.put(`${BASE_URL}/songs/playlist/api/${playlist_id}/update/`, formData, {
							headers: {
								authorization: 'Token ' + TOKEN,
							},
						})
						.then((res) => {
							console.log(res.data);
							window.location.reload();
						})
						.catch((err) => {
							console.log(err);
						});
				}
		}
	};

	const [options, setOptions] = useState([]);
	const choiceRef = useRef();

	useEffect(() => {
		if (props.songs) {
			const songs = [...props.songs];
			let optionList = [];
			if (songs.length > 0) {
				songs.forEach((song) => {
					optionList.push(
						<option
							className='text-capitalize'
							value={song.song_name}
							key={song.id}
							onClick={() => {
								choiceRef.value = this.value;
							}}
						/>
					);
				});
			}
			// console.log(optionList);
			setOptions(optionList);
		}
	}, [props.songs]);

	const [choiceKeys, setChoiceKeys] = useState([]);

	const [songChoiceArray, setSongChoiceArray] = useState([]);
	useEffect(() => {
		let temp = [];

		choiceKeys.forEach((keys) =>
			temp.push(
				<div className='form-group row' key={keys}>
					<div className='col-12 col-sm-8'>
						<input className='form-control' list='songList' id='songChoice' placeholder='Type to search...' ref={choiceRef} />
						<datalist id='songList'> {options} </datalist>
					</div>

					<div className='col-12 col-sm-4'>
						<button
							onClick={(event) => {
								event.preventDefault();
								let tempChoice = [...choiceKeys];
								tempChoice.splice(tempChoice.indexOf(keys), 1);
								setChoiceKeys(tempChoice);
							}}
							className='btn btn-danger'
						>
							Remove
						</button>
					</div>
				</div>
			)
		);
		setSongChoiceArray(temp);
	}, [choiceKeys, options]);

	const handleAddSongs = (songChoice, playlistDetail, requestType) => {
		let formData = new FormData();
		formData.append('playlist_id', playlistDetail.id);
		formData.append('playlist_songs', songChoice);

		switch (requestType) {
			case POST:
				if (TOKEN) {
					axios
						.post(`${BASE_URL}/songs/playlistDetail/api/create/`, formData, {
							headers: {
								authorization: 'Token ' + TOKEN,
							},
						})
						.then((res) => {
							// console.log(res.data);
							window.location.replace('http://localhost:3000/playlistDetail');
						})
						.catch((err) => {
							// console.log(err);
							setError(true);
							setLoading(false);
						});
				}
		}
	};

	const handleAddSongsSubmit = (event) => {
		event.preventDefault();
		// handleAddSongs()
		let songChoice = event.target.elements.songChoice;
		// console.log(songChoice.length > 1);
		// console.log(typeof songChoice);
		let songIdArr = [];
		const songs = [...props.songs];
		if (songChoice) {
			songs.forEach((song) => {
				if (songChoice.length > 1) {
					songChoice.forEach((choice) => {
						if (song['song_name'] === choice.value) {
							songIdArr.push(song.id);
						}
					});
				} else {
					if (song['song_name'] === songChoice.value) {
						songIdArr.push(song.id);
					}
				}
			});

			let songIdUnique = [...new Set(songIdArr)];
			songIdUnique.forEach((songId) => {
				handleAddSongs(songId, playlistInfo, POST);
			});
		} else {
			window.location.reload();
		}
	};

	return (
		<>
			{loading ? (
				<Loading />
			) : (
				<>
					<h4> Edit Playlist</h4>
					<form className='col-12 m-4' onSubmit={(event) => handleSubmit(event, PUT)}>
						<div className='form-group row'>
							<label htmlFor='playlistName' className='col-12 col-md-2 col-form-label'>
								Name
							</label>

							<div className='col-12 col-md-10'>
								<input type='text' className='form-control' id='playlistName' defaultValue={playlistInfo.playlist_name} required />
							</div>

							<div className='form-group row col-12'>
								<div className='d-flex justify-content-start aligin-items-center flex-column flex-lg-row'>
									<img
										src={playlistInfo.playlist_cover}
										className='rounded mx-auto d-block'
										alt='Playlist Cover'
										width='240px'
										className='m-4'
										ref={songCover}
									/>
									<div className='custom-file m-4'>
										<input
											type='file'
											className=''
											name='profile-picture'
											id='profile-picture'
											accept='image/png, image/jpeg'
											onChange={(e) => {
												handleImageFile(e);
											}}
										/>

										<label className='custom-file-label' htmlFor='profile-picture'>
											Choose file...
										</label>
									</div>
								</div>
							</div>
						</div>

						{loadingPlaylistDetail ? <Loading /> : <input type='Submit' value='Save Changes' name='submit' className='btn btn-primary' />}
					</form>

					<div>
						{playlist.map((playlist, i) => (
							<EditPlaylistOldSongs key={i} playlist={playlist} playlistDetail={playlistDetail[i]} length={playlistDetail.length} />
						))}
					</div>

					<div>
						<form
							onSubmit={(event) => {
								handleAddSongsSubmit(event);
							}}
						>
							{songChoiceArray}
							<div className='form-group row col-12'>
								<button
									onClick={(event) => {
										event.preventDefault();
										setChoiceKeys(choiceKeys.concat(choiceKeys[choiceKeys.length - 1] + 1));
									}}
									className='btn btn-secondary'
								>
									Add Songs
								</button>
							</div>

							<input type='Submit' value='Submit' name='submit' className='btn btn-primary' />
						</form>
					</div>
				</>
			)}
		</>
	);
}

export function EditPlaylistOldSongs(props) {
	// console.log(props.playlist);
	// console.log(props.playlistDetail);

	const handleRemoveOldSong = (requestType, id) => {
		// event.preventDefault();
		switch (requestType) {
			case DELETE:
				if (TOKEN && props.length > 2) {
					axios
						.delete(`${BASE_URL}/songs/playlistDetail/api/${id}/delete/`, {
							headers: {
								authorization: 'Token ' + TOKEN,
							},
						})
						.then((res) => {
							console.log(res.data);
							window.location.reload();
						})
						.catch((err) => {
							console.log(err);
						});
				}
		}
	};

	return (
		<>
			<div className='form-group row'>
				<div className='col-12 col-sm-8'>
					<input className='form-control' defaultValue={props.playlist.song_name} disabled />
				</div>

				<div className='col-12 col-sm-4'>
					<button
						className='btn btn-danger'
						onClick={(event) => {
							event.preventDefault();
							// console.log(props.playlistDetail.id);
							if (window.confirm('Are you sure you wish to revoce Song From Playlist? \nYou cannot undo this action.')) {
								handleRemoveOldSong(DELETE, props.playlistDetail.id);
							}
						}}
					>
						Remove
					</button>
				</div>
			</div>
		</>
	);
}
