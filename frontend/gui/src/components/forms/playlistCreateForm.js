import axios from 'axios';

import { DangerMessage } from '../other/message';
import React, { useState, useEffect, useRef } from 'react';

import { getUserDetails } from '../../store/actions/user.js';
import { BASE_URL, POST, TOKEN } from '../../store/utility.js';

export default function PlaylistCreateForm(props) {
	const [options, setOptions] = useState([]);
	const choiceRef = useRef();
	const [loading, setLoading] = useState(false);
	let userData = getUserDetails();

	const songCover = useRef();
	const [imageFile, setImageFile] = useState();

	const [error, setError] = useState(false);

	const handleImageFile = (e) => {
		let image = e.target.files[0];
		songCover.current.src = URL.createObjectURL(image);
		setImageFile(image);
	};

	useEffect(() => {
		// console.log(typeof props.songs);
		const songs = [...props.songs];
		let optionList = [];
		if (songs.length > 0) {
			songs.forEach((song) => {
				// console.log(song.song_name);
				// console.log(song.id);
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
	}, [props.songs]);

	const handleSubmit = (event, requestType) => {
		event.preventDefault();
		setLoading(true);
		let formData = new FormData();
		formData.append('playlist_name', event.target.elements.playlistName.value);
		formData.append('created_by', userData.userInfo.pk);

		if (imageFile) {
			formData.append('playlist_cover', imageFile);
		}

		let songChoice = event.target.elements.songChoice;
		// console.log(songChoice);
		let songIdArr = [];
		const songs = [...props.songs];

		songs.forEach((song) => {
			songChoice.forEach((choice) => {
				if (song['song_name'] === choice.value) {
					songIdArr.push(song.id);
				}
			});
		});

		let songIdUnique = [...new Set(songIdArr)];
		// console.log(songIdUnique);
		// console.log(songIdUnique.length);
		if (songIdUnique.length >= 2) {
			console.log('hello');
			switch (requestType) {
				case POST:
					if (TOKEN) {
						axios
							.post(`${BASE_URL}/songs/playlist/api/create/`, formData, {
								headers: {
									authorization: 'Token ' + TOKEN,
								},
							})
							.then((res) => {
								let playlistDetail = res.data;

								songIdUnique.forEach((songId) => {
									addSongs(songId, playlistDetail, POST);
								});
							})
							.catch((err) => {
								console.log(err);
								setError(true);
								setLoading(false);
							});
					}
			}
		} else {
			console.log('hi');
			setError(true);
			setLoading(false);
		}
	};

	console.log(error, loading);

	const addSongs = (songChoice, playlistDetail, requestType) => {
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
							setLoading(true);
							window.location.replace('http://localhost:3000/playlist');
						})
						.catch((err) => {
							console.log(err);
							setError(true);
							setLoading(false);
						});
				}
		}
	};
	const [choiceKeys, setChoiceKeys] = useState([0, 1]);

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
								if (choiceKeys.length > 2) {
									let tempChoice = [...choiceKeys];
									tempChoice.splice(tempChoice.indexOf(keys), 1);
									setChoiceKeys(tempChoice);
								}
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

	return (
		<>
			<div className='col-12'>
				<h2 className='col-12 m-4'>Create Playlist</h2>
				<form className='col-12 m-4' onSubmit={(event) => handleSubmit(event, props.requestType)}>
					{error ? <DangerMessage message={'Songs Not Found'} /> : <></>}
					<div className='form-group row'>
						<label htmlFor='playlistName' className='col-12 col-md-2 col-form-label'>
							Name
						</label>

						<div className='col-12 col-md-10'>
							<input type='text' className='form-control' id='playlistName' placeholder='MyPlaylist1' required />
						</div>
					</div>

					<div className='form-group row col-12'>
						<h3> Add Songs</h3>
					</div>

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

					<div className='form-group row col-12'>
						<div className='d-flex justify-content-start aligin-items-center flex-column flex-lg-row'>
							<img
								src='http://127.0.0.1:8000/media/playlistCover/default.jpg'
								className='rounded mx-auto d-block'
								alt='Playlist Cover'
								width='240px'
								className='m-4'
								ref={songCover}
							/>
							<div className='custom-file m-4'>
								<input
									type='file'
									className='custom-file-input'
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
								<div className='invalid-feedback'>Example invalid custom file feedback</div>
							</div>
						</div>
					</div>

					{loading ? (
						<div className='spinner-border text-primary' role='status'>
							<span className='sr-only'>Loading...</span>
						</div>
					) : (
						<input type='Submit' name='submit' className='btn btn-primary' />
					)}
				</form>
			</div>
		</>
	);
}
