import axios from 'axios';
import React, { useState } from 'react';
import { BASE_URL, POST } from '../../store/utility.js';

import { getUserDetails } from '../../store/actions/user.js';

function SongForm(props) {
	const [audioFile, setAudioFile] = useState();
	const [imageFile, setImageFile] = useState();

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
							// console.log(res);
							window.location.replace('http://localhost:3000/allSongs');
						})
						.catch((err) => console.log(err));
				}
		}
	};

	const handleAudioFile = (e) => {
		let audio = e.target.files[0];
		setAudioFile(audio);
	};
	const handleImageFile = (e) => {
		let image = e.target.files[0];
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
						/>
					</div>

					<div className='form-group'>
						<label htmlFor='image'> Song Image </label> <br />
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
