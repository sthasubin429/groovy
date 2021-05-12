import axios from 'axios';
import React, { useState, useRef } from 'react';

import { BASE_URL, POST } from '../../store/utility.js';
import { getUserDetails } from '../../store/actions/user.js';

function SongForm(props) {
	const [audioFile, setAudioFile] = useState();
	const [imageFile, setImageFile] = useState();
	const songCover = useRef();
	let userData = getUserDetails();

	const handleSubmit = (event, requestType) => {
		event.preventDefault();

		let formData = new FormData();

		formData.append('song_name', event.target.elements.songTitle.value);
		formData.append('song_audio', audioFile);
		formData.append('song_photo', imageFile);

		formData.append('username', userData.userInfo.pk);

		switch (requestType) {
			case POST:
				const token = localStorage.getItem('token');

				if (token) {
					axios
						.post(`${BASE_URL}/songs/api/create/`, formData, {
							headers: {
								authorization: 'Token ' + token,
							},
						})
						.then((res) => {
							window.location.replace('http://localhost:3000/allSongs');
						})
						.catch((err) => {
							window.location.replace('http://localhost:3000/500/');
						});
				}
		}
	};

	const handleAudioFile = (e) => {
		let audio = e.target.files[0];
		setAudioFile(audio);
	};
	const handleImageFile = (e) => {
		let image = e.target.files[0];
		songCover.current.src = URL.createObjectURL(image);
		setImageFile(image);
	};

	return (
		<>
			<div className='songForm-container'>
				<h2> Upload A Song</h2>
				<form onSubmit={(event) => handleSubmit(event, props.requestType)}>
					<div className='form-group songForm-name'>
						<label htmlFor='songTitle'>Song Name</label>
						<input type='text' className='form-control' id='title' name='songTitle' placeholder='Title' required /> <br />
					</div>

					<div className='form-group'>
						<label htmlFor='audio'> Upload Audio </label> <br />
						<input
							type='file'
							id='audio'
							name='audio'
							required
							onChange={(e) => {
								handleAudioFile(e);
							}}
							accept='audio/mp3'
						/>
					</div>

					<div className='form-group'>
						<label htmlFor='image'> Song Image </label> <br />
						<img
							src='http://127.0.0.1:8000/media/playlistCover/default.jpg'
							className='rounded mx-auto d-block'
							alt='Playlist Cover'
							width='240px'
							className='m-4'
							ref={songCover}
						/>
						<input
							type='file'
							id='image'
							name='image'
							accept='image/png, image/jpeg'
							required
							onChange={(e) => {
								handleImageFile(e);
							}}
						/>
					</div>
					<input type='Submit' name='submit' className='btn btn-primary' />
				</form>
			</div>
		</>
	);
}

export default SongForm;
