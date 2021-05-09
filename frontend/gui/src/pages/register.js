import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import * as actions from '../store/actions/auth';
import Loading from '../components/other/loading';

import { useDispatch, useSelector } from 'react-redux';
import { DangerMessage } from '../components/other/message';

export default function Register() {
	const loading = useSelector((state) => state.auth.loading);
	const error = useSelector((state) => state.auth.error);
	const dispatch = useDispatch();

	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm();

	const [passwordMatch, setPasswordMatch] = useState(null);

	const onSubmit = (data) => {
		// event.preventDefault();

		let email = data.registerEmail;
		let username = data.registerUsername;
		let password1 = data.registerPassword1;
		let password2 = data.registerPassword2;

		console.log(email, username, password1, password2);
		if (password1 === password2) {
			setPasswordMatch(true);
			dispatch(actions.authRegister(username, email, password1, password2));
		} else {
			setPasswordMatch(false);
		}
	};

	// console.log(watch('example'));
	return (
		<>
			<div className='container d-flex flex-column align-items-center'>
				<div className='col-12 col-sm-7'>
					<h4 class='text-center text-gray-soft my-3 text-primary-colour'> Register </h4>
				</div>

				<div className='col-12 col-sm-7'>
					{error ? (
						<>
							<DangerMessage message='Username or Email Already Exists' />
						</>
					) : (
						<></>
					)}
					{passwordMatch === false ? (
						<>
							<DangerMessage message='Password did not Match' />
						</>
					) : (
						<></>
					)}
				</div>

				<form onSubmit={handleSubmit(onSubmit)} className='col-12 col-sm-7'>
					<div className='form-group'>
						<label htmlFor='registerEmail'>Email Address</label>
						<input
							{...register('registerEmail', {
								required: true,
								pattern: /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
								maxLength: 50,
							})}
							type='text'
							className='form-control'
							name='registerEmail'
							placeholder='Enter Your Email Address here'
						/>

						{errors?.registerEmail?.type === 'required' && <DangerMessage message='Email is required' />}
						{errors?.registerEmail?.type === 'pattern' && <DangerMessage message='Please Enter A a Valid Email' />}
						{errors?.registerEmail?.type === 'maxLength' && <DangerMessage message='Email cannot exceed 50 characters' />}
					</div>

					<div className='form-group'>
						<label htmlFor='registerUsername'>Username</label>
						<input
							{...register('registerUsername', {
								required: true,
								pattern: /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
								minLength: 8,
								maxLength: 20,
							})}
							type='text'
							className='form-control'
							name='registerUsername'
							placeholder='Enter Your Username Here'
						/>

						{errors?.registerUsername?.type === 'required' && <DangerMessage message='Username is required' />}
						{errors?.registerUsername?.type === 'pattern' && <DangerMessage message='Username is Invalid' />}
						{errors?.registerUsername?.type === 'minLength' && <DangerMessage message='Username Requires at Least 8 Characters' />}
						{errors?.registerUsername?.type === 'maxLength' && <DangerMessage message='Username cannot exceed 20 characters' />}
					</div>

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
							<input type='submit' value='Sign Up' className='btn btn-primary  float-right  px-5 rounded-pill' />
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

				<div className='mb-5'></div>
			</div>
		</>
	);
}
