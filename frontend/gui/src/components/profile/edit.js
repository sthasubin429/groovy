import axios from 'axios';
import React, { useState, useRef } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { POST, TOKEN, BASE_URL } from '../../store/utility';

import { updateUserProfile } from '../../store/actions/profile';

import { logout } from '../../store/actions/auth';

export default function Edit(props) {
	const userDetails = useSelector((state) => state.profile.user_details);
	const userInfo = useSelector((state) => state.profile.user_info);
	const loading = useSelector((state) => state.profile.loading);
	const sucess = useSelector((state) => state.profile.sucess);

	const profilePicture = useRef();
	const [imageFile, setImageFile] = useState();
	const dispatch = useDispatch();

	const handleImageFile = (e) => {
		let image = e.target.files[0];
		profilePicture.current.src = URL.createObjectURL(image);
		setImageFile(image);
	};

	const handleSubmit = (event, requestType) => {
		event.preventDefault();
		console.log('submittedd');
		let formData = new FormData();
		formData.append('first_name', event.target.editFirstName.value);
		formData.append('last_name', event.target.editLastName.value);
		formData.append('user', userDetails.pk);

		if (imageFile) {
			formData.append('profile_picture', imageFile);
		}

		formData.append('bio', event.target.editBio.value);
		for (var value of formData.values()) {
			console.log(value);
		}
		console.log(userDetails);
		console.log(userInfo);

		const token = localStorage.getItem('token');

		switch (requestType) {
			case POST:
				if (token) {
					dispatch(updateUserProfile(token, userInfo.id, formData));
				}
		}
	};

	return (
		<>
			{loading ? (
				<div className='pt-5 spinner-border text-primary' role='status'>
					<span className='sr-only'>Loading...</span>
				</div>
			) : (
				<>
					{sucess ? (
						<div>
							<div className='pt-5 spinner-border text-primary' role='status'>
								<span className='sr-only'>Loading...</span>
							</div>
							<h2>Sucess</h2>
						</div>
					) : (
						<div className='container-fluid pt-5'>
							<form onSubmit={(event) => handleSubmit(event, props.requestType)}>
								<div className='row form-group'>
									<div className='col-12 my-4'>
										<img
											src={userInfo.profile_picture}
											className='rounded mx-auto d-block'
											alt='Profile Picture'
											width='240px'
											ref={profilePicture}
										/>
									</div>
								</div>

								<div className='row form-group'>
									<div className='col-8'>
										<label htmlFor='profile-picture' className='form-row col'>
											Upload Your Profile Picture
										</label>

										<div className='custom-file'>
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

								<div className='row form-group'>
									<div className='col-6'>
										<label htmlFor='registerFirstName'>First Name</label>
										<input type='text' className='form-control' placeholder='First Name' name='editFirstName' defaultValue={userInfo.first_name} />
									</div>
									<div className='col-6'>
										<label htmlFor='registerLastName'>Last Name</label>
										<input type='text' className='form-control' placeholder='Last name' name='editLastName' defaultValue={userInfo.last_name} />
									</div>
								</div>

								<div className='row form-group'>
									<div className='col-6'>
										<label htmlFor='editEmail'>Email Address</label>
										<input
											type='text'
											className='form-control'
											name='editEmail'
											placeholder='Enter Your Email Address here'
											disabled
											defaultValue={userDetails.email}
										/>
									</div>
									<div className='col-6'>
										<label htmlFor='editUsername'>Username</label>
										<input
											type='text'
											className='form-control'
											name='editUsername'
											placeholder='Enter Your Username Here'
											disabled
											defaultValue={userDetails.username}
										/>
									</div>
								</div>

								<div className='row form-group'>
									<div className='col-7'>
										<label htmlFor='editBio'>Bio</label>
										<textarea className='form-control' rows='2' id='bio' name='editBio' defaultValue={userInfo.bio}></textarea>
									</div>
								</div>

								<div className='row form-group my-4'>
									<div className='col d-flex justify-content-around'>
										<button type='submit' className='btn btn-primary'>
											Update
										</button>

										<button
											className='btn btn-danger'
											onClick={(event) => {
												event.preventDefault();
												if (window.confirm('Are you sure you wish to delete Your Profile? \nYou cannot undo this action.')) {
													if (TOKEN) {
														axios
															.delete(`${BASE_URL}/userProfile/api/${userDetails.pk}/delete/`, {
																headers: {
																	authorization: 'Token ' + TOKEN,
																},
															})
															.then((res) => {
																// console.log(res.data);
																dispatch(logout());
															})
															.catch((err) => {
																console.log(err);
															});
													}
												}
											}}
										>
											Delete
										</button>
									</div>
								</div>
							</form>
						</div>
					)}
				</>
			)}
		</>
	);
}
