import axios from 'axios';
import React, { useState } from 'react';
import { BASE_URL, POST, PUT } from '../../store/utility.js';

function SongForm(props) {
	const [audioFile, setAudioFile] = useState();
	const [imageFile, setImageFile] = useState();

	const handleSubmit = (event, requestType) => {
		event.preventDefault();

		let formData = new FormData();

		formData.append('song_name', event.target.elements.songTitle.value);
		formData.append('song_audio', audioFile);
		formData.append('song_photo', imageFile);
		formData.append('username', '6');

		switch (requestType) {
			case POST:
				axios
					.post(`${BASE_URL}/songs/api/create/`, formData)
					.then((res) => console.log(res))
					.catch((err) => console.log(err));
		}
		// switch (requestType) {
		// 	case POST:
		// 		axios
		// 			.post(`${BASE_URL}/songs/api/create/`, {
		// 				song_name: title,
		// 				song_date: null,
		// 				song_audio: audio,
		// 				song_photo: songImage,
		// 				// username: null,
		// 			})
		// 			.then((res) => console.log(res))
		// 			.catch((err) => console.log(err));
		// }
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
			<h2> Upload A Song</h2>
			<form onSubmit={(event) => handleSubmit(event, props.requestType)}>
				<label for='songTitle'>Song Title</label> <br />
				<input type='text' id='title' name='songTitle' required /> <br />
				<label for='audio'> Upload Audio </label> <br />
				<input
					type='file'
					id='audio'
					name='audio'
					required
					onChange={(e) => {
						handleAudioFile(e);
					}}
				/>{' '}
				<br />
				<label for='image'> Song Image </label> <br />
				<input
					type='file'
					id='image'
					name='image'
					accept='image/png, image/jpeg'
					required
					onChange={(e) => {
						handleImageFile(e);
					}}
				/>{' '}
				<br />
				<input type='Submit' name='submit' />
			</form>
		</>
	);
}

export default SongForm;
