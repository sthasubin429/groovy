import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import Loading from '../components/other/loading';
import { DangerMessage, SucessMessage } from '../components/other/message';
import axios from 'axios';
import { BASE_URL } from '../store/utility';
export default function PasswordResetConfirm() {
	const location = useLocation();
	let path = location.pathname;
	let token = path.slice(22);

	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm();

	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState(false);
	const [error, setError] = useState(false);

	const [passwordMatch, setPasswordMatch] = useState(null);

	const onSubmit = (data) => {
		let password1 = data.registerPassword1;
		let password2 = data.registerPassword2;

		console.log(data);

		if (password1 === password2) {
			let formData = new FormData();

			formData.append('password', password1);
			formData.append('token', token);

			setPasswordMatch(true);
			setSuccess(false);
			setError(false);

			axios
				.post(`${BASE_URL}/userProfile/api/password_reset/confirm/`, formData)
				.then((res) => {
					console.log(res.data);
					if (res.data.status === 'OK') {
						setSuccess(true);
						setError(false);
					} else {
						setError(true);
					}
					setLoading(false);
					document.getElementById('restPasswordForm').reset();
				})
				.catch((err) => {
					console.log(err);
					setError(true);
					setLoading(false);
					document.getElementById('restPasswordForm').reset();
				});
		} else {
			setPasswordMatch(false);
		}
	};

	return (
		<>
			<>
				<div className='container d-flex flex-column align-items-center'>
					<div className='col-12 col-sm-7'>
						{error ? (
							<>
								<DangerMessage message='Invalid Token or Password Similar to Username' />
							</>
						) : (
							<></>
						)}
					</div>

					<div className='col-12 col-sm-7'>
						{success ? (
							<>
								<SucessMessage message='Password Reset Successful' />

								<p class='text-gray-soft text-center small my-2'>
									Click{' '}
									<a href='/login' className='link'>
										here
									</a>{' '}
									to login.
								</p>
							</>
						) : (
							<>
								<h4 class='text-center text-gray-soft my-3 text-primary-colour'> Reset Your Password</h4>
							</>
						)}
					</div>

					<form onSubmit={handleSubmit(onSubmit)} className='col-12 col-sm-7' id='restPasswordForm'>
						{passwordMatch === false ? (
							<>
								<DangerMessage message='Password did not Match' />
							</>
						) : (
							<></>
						)}
						<div className='form-group'>
							<label htmlFor='registerPassword1'>Password</label>
							<input
								type='password'
								className='form-control'
								name='registerPassword1'
								placeholder='Enter your Password here'
								{...register('registerPassword1', {
									required: true,
									pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/,
									minLength: 8,
								})}
							/>
							{errors?.registerPassword1?.type === 'required' && <DangerMessage message='Password is required' />}
							{errors?.registerPassword1?.type === 'minLength' && <DangerMessage message='Password Requires at Least 8 Characters' />}
							{errors?.registerPassword1?.type === 'pattern' && (
								<DangerMessage message='Password must contain atleast one Uppercase, Lowercase letter and Number' />
							)}
						</div>

						<div className='form-group'>
							<label htmlFor='registerPassword2'>Confirm Password</label>
							<input
								type='password'
								className='form-control'
								name='registerPassword2'
								placeholder='Confirm your Password'
								{...register('registerPassword2', {
									required: true,
									pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/,
									minLength: 8,
								})}
							/>

							{errors?.registerPassword2?.type === 'required' && <DangerMessage message='Password is required' />}
							{errors?.registerPassword2?.type === 'minLength' && <DangerMessage message='Password Requires at Least 8 Characters' />}
							{errors?.registerPassword2?.type === 'pattern' && (
								<DangerMessage message='Password must contain atleast one Uppercase, Lowercase letter and Number' />
							)}
						</div>

						{loading ? (
							<Loading />
						) : (
							<div className='form-group'>
								<input type='submit' value='Reset' className='btn btn-primary  float-right  px-5 rounded-pill' />
							</div>
						)}
					</form>

					<p class='text-gray-soft text-center small my-2'>
						By clicking "Sign up" you agree to our{' '}
						<a href='/' className='link'>
							Terms of Service
						</a>
						.
					</p>

					<p class='text-gray-soft text-center small my-2'>
						Already have an account?{' '}
						<a href='/login' className='link'>
							Login
						</a>
					</p>
				</div>
			</>
		</>
	);
}
