import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';

import { BASE_URL, POST } from '../../store/utility.js';
import { getUserDetails } from '../../store/actions/user.js';

export default function PlaylistCreateForm(props) {
	const [options, setOptions] = useState([]);
	let userData = getUserDetails();
	const choiceRef = useRef();

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

		let formData = new FormData();
		formData.append('playlist_name', event.target.elements.playlistName.value);
		formData.append('created_by', userData.userInfo.pk);

		const token = localStorage.getItem('token');

		let songChoice = event.target.elements.songChoice.value;
		let songId = null;
		const songs = [...props.songs];

		songs.forEach((song) => {
			if (song['song_name'] === songChoice) {
				songId = song.id;
			}
		});

		switch (requestType) {
			case POST:
				if (token) {
					axios
						.post(`${BASE_URL}/songs/playlist/api/create/`, formData, {
							headers: {
								authorization: 'Token ' + token,
							},
						})
						.then((res) => {
							let playlistDetail = res.data;
							addSongs(songId, playlistDetail, POST);
						})
						.catch((err) => console.log(err));
				}
		}
	};

	const addSongs = (songChoice, playlistDetail, requestType) => {
		let formData = new FormData();
		formData.append('playlist_id', playlistDetail.id);
		formData.append('playlist_songs', songChoice);

		switch (requestType) {
			case POST:
				const token = localStorage.getItem('token');
				if (token) {
					axios
						.post(`${BASE_URL}/songs/playlistDetail/api/create/`, formData, {
							headers: {
								authorization: 'Token ' + token,
							},
						})
						.then((res) => {
							console.log(res.data);
							window.location.replace('http://localhost:3000/playlist');
						})
						.catch((err) => console.log(err));
				}
		}
	};

	return (
		<>
			<h2 className='col-12 m-4'>Create Playlist</h2>
			<form className='col-12 m-4' onSubmit={(event) => handleSubmit(event, props.requestType)}>
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

				<div className='form-group col-md-10'>
					{/* <select id='songChoice' class='form-control'>
						{options}
					</select> */}

					<input className='form-control' list='songList' id='songChoice' placeholder='Type to search...' ref={choiceRef} />
					<datalist id='songList'> {options} </datalist>
				</div>

				<input type='Submit' name='submit' className='btn btn-primary' />
			</form>
		</>
	);
}
