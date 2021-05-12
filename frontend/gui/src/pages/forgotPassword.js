import axios from 'axios';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import { BASE_URL } from '../store/utility';
import Loading from '../components/other/loading';

import { DangerMessage, SucessMessage } from '../components/other/message';

export default function ForgotPassword() {
	const [error, setError] = useState(false);
	const [loading, setLoading] = useState(false);
	const [passwordResetSucess, setPasswordRestSucess] = useState(false);

	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm();

	const onSubmit = (data) => {
		setError(false);
		setLoading(true);

		axios
			.post(`${BASE_URL}/userProfile/api/password_reset/`, data)
			.then((res) => {
				if (res.data.status === 'OK') {
					setPasswordRestSucess(true);
				} else {
					setError(true);
				}
				setLoading(false);
				document.getElementById('forgotPassowordForm').reset();
			})
			.catch((err) => {
				setError(true);
				setLoading(false);
				document.getElementById('forgotPassowordForm').reset();
			});
	};

	return (
		<>
			<div className='container d-flex flex-column align-items-center'>
				<div className='col-12 col-sm-7'>
					{error ? (
						<>
							<DangerMessage message='Email Address Doesnot Exist' />
						</>
					) : (
						<></>
					)}
				</div>
				<div className='col-12 col-sm-7'>
					{passwordResetSucess ? (
						<>
							<SucessMessage message='Password Reset Successful' />
							<h4 class='text-center text-gray-soft my-3'>Check Your Email</h4>
							<p class='small text-center text-gray-soft my-3'> We have sent link to recover your password</p>
							<p class='small text-center text-gray-soft my-4'> Did not recieve the email? Check your spam filter. </p>
							<p class='small text-center text-gray-soft my-4'> Or, Resend the link. </p>
						</>
					) : (
						<>
							<h4 class='text-center text-gray-soft my-3 text-primary-colour'> Reset Your Password</h4>
						</>
					)}
				</div>

				<form onSubmit={handleSubmit(onSubmit)} className='col-12 col-sm-7' id='forgotPassowordForm'>
					<div className='form-group'>
						<label htmlFor='email'>Email Address</label>
						<input
							{...register('email', {
								required: true,
								pattern: /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
							})}
							type='text'
							className='form-control'
							name='email'
							placeholder='Enter Your Email Address here'
						/>

						{errors?.email?.type === 'required' && <DangerMessage message='Email is required' />}
						{errors?.email?.type === 'pattern' && <DangerMessage message='Please Enter A a Valid Email' />}
					</div>

					{loading ? (
						<div className='float-right px-5'>
							<Loading />
						</div>
					) : (
						<div className='form-group'>
							<input type='submit' value='Reset Password' className='btn btn-primary float-right mb-4 px-5 rounded-pill' />
						</div>
					)}
				</form>

				<p class='text-gray-soft text-center small my-2'>
					Already have an account?{' '}
					<a href='/login' className='link'>
						Login
					</a>
				</p>
				<p class='small text-center text-gray-soft my-2'>
					Don't have an account yet?{' '}
					<a href='/register' className='link'>
						Register
					</a>
				</p>
			</div>
		</>
	);
}
