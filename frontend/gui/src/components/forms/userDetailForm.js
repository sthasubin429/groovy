import axios from 'axios';
import React, { useState } from 'react';
import { BASE_URL, POST } from '../../store/utility.js';
import { getUserDetails } from '../../store/actions/user.js';

export default function UserDetailForm(props) {
	const [imageFile, setImageFile] = useState();
	let userData = getUserDetails();

	const handleImageFile = (e) => {
		let image = e.target.files[0];
		setImageFile(image);
	};

	const handleSubmit = (event, requestType) => {
		event.preventDefault();

		let formData = new FormData();

		let firstName = event.target.elements.registerFirstName.value;
		let lastName = event.target.elements.registerLastName.value;

		firstName = firstName.replace(/[^a-zA-Z]/g, '');
		lastName = lastName.replace(/[^a-zA-Z]/g, '');

		formData.append('first_name', firstName);
		formData.append('last_name', lastName);

		formData.append('profile_picture', imageFile);
		formData.append('bio', event.target.elements.bio.value);

		formData.append('user', userData.userInfo.pk);

		// console.log(formData);
		// console.log(firstName, lastName, imageFile);

		switch (requestType) {
			case POST:
				const token = localStorage.getItem('token');

				if (token) {
					axios
						.post(`${BASE_URL}/userProfile/api/create/`, formData, {
							headers: {
								authorization: 'Token ' + token,
							},
						})
						.then((res) => {
							console.log(res);
							window.location.replace('http://localhost:3000/');
						})
						.catch((err) => console.log(err));
				}
		}
	};

	return (
		<>
			<div className='container'>
				<h2>Add User Details</h2>
				<form onSubmit={(event) => handleSubmit(event, props.requestType)}>
					<div className=' form-group form-row'>
						<div className='col'>
							<label htmlFor='registerFirstName'>First Name</label>
							<input type='text' className='form-control' placeholder='First Name' name='registerFirstName' />
						</div>
						<div className='col'>
							<label htmlFor='registerLastName'>Last Name</label>
							<input type='text' className='form-control' placeholder='Last name' name='registerLastName' />
						</div>
					</div>
					<div className='form-group'>
						<label for='profile-picture' className='form-row'>
							Upload Your Profile Picture
						</label>
						<div class='custom-file'>
							<input
								type='file'
								className='custom-file-input'
								name='profile-picture'
								id='profile-picture'
								accept='image/png, image/jpeg'
								onChange={(e) => {
									handleImageFile(e);
								}}
								required
							/>

							<label className='custom-file-label' htmlFor='profile-picture'>
								Choose file...
							</label>
							<div className='invalid-feedback'>Example invalid custom file feedback</div>
						</div>
					</div>

					<div className='form-group'>
						<label for='bio'>Bio</label>
						<textarea className='form-control' rows='2' id='bio' name='bio'></textarea>
					</div>

					<input type='Submit' name='submit' className='btn btn-primary' />
				</form>
			</div>
		</>
	);
}
