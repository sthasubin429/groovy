import { useDispatch, useSelector } from 'react-redux';
import React, { Component } from 'react';
import * as actions from '../store/actions/auth';
import Loading from '../components/other/loading';
import { DangerError } from '../components/other/message';

export default function Register() {
	const loading = useSelector((state) => state.auth.loading);
	const error = useSelector((state) => state.auth.error);

	const dispatch = useDispatch();
	const handleSubmit = (event) => {
		event.preventDefault();

		let email = event.target.registerEmail.value;
		let username = event.target.registerUsername.value;
		let password1 = event.target.registerPassword1.value;
		let password2 = event.target.registerPassword2.value;

		// console.log(email, username, password1, password2);
		dispatch(actions.authRegister(username, email, password1, password2));
	};

	return (
		<>
			<div className='container'>
				{error ? (
					<>
						<DangerError message='Username or Email Already Exists or Passwords did not Match' />
					</>
				) : (
					<></>
				)}
				<form onSubmit={(event) => handleSubmit(event)}>
					<div className='form-group'>
						<label htmlFor='registerEmail'>Email Address</label>
						<input type='text' className='form-control' name='registerEmail' placeholder='Enter Your Email Address here' />
					</div>

					<div className='form-group'>
						<label htmlFor='registerUsername'>Username</label>
						<input type='text' className='form-control' name='registerUsername' placeholder='Enter Your Username Here' />
					</div>

					<div className='form-group'>
						<label htmlFor='registerPassword1'>Password</label>
						<input type='password' className='form-control' name='registerPassword1' placeholder='Enter your Passowrd here' />
					</div>

					<div className='form-group'>
						<label htmlFor='registerPassword2'>Confirm Password</label>
						<input type='password' className='form-control' name='registerPassword2' placeholder='Confirm your Passowrd' />
					</div>

					{loading ? (
						<Loading />
					) : (
						<button type='submit' className='btn btn-primary'>
							Submit
						</button>
					)}
				</form>
			</div>
		</>
	);
}
