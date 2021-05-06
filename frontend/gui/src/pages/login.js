import React from 'react';

import * as actions from '../store/actions/auth';
import Loading from '../components/other/loading';

import { useDispatch, useSelector } from 'react-redux';
import { UserPassNotMatch } from '../components/other/message';

export default function Login() {
	const loading = useSelector((state) => state.auth.loading);
	const error = useSelector((state) => state.auth.error);

	// console.log(error, loading);

	const dispatch = useDispatch();

	const handleSubmit = (event) => {
		event.preventDefault();
		let username = event.target.elements.loginUsername.value;
		let password = event.target.elements.loginPassword.value;

		console.log(username, password);
		dispatch(actions.authLogin(username, password));
	};

	return (
		<div className='container d-flex flex-column align-items-center'>
			<div className='col-12 col-sm-7'>
				<h4 class='text-center text-gray-soft my-3 text-primary-colour'> Login </h4>
			</div>

			<div className='col-12 col-sm-7'>
				{error ? (
					<>
						<UserPassNotMatch />
					</>
				) : (
					<></>
				)}
			</div>

			<form onSubmit={(event) => handleSubmit(event)} className='col-12 col-sm-7'>
				<div className='form-group '>
					<label for='loginUsername'>Username</label>
					<input type='text' className='form-control' name='loginUsername' placeholder='Username' />
				</div>
				<div className='form-group'>
					<label for='loginPassword'>Password</label>
					<a className='form-sublink link float-right' href='/forgotPassword'>
						Forgot password?
					</a>
					<input type='password' className='form-control' name='loginPassword' placeholder='Password' />
				</div>
				{loading ? (
					<Loading />
				) : (
					<div className='form-group'>
						<input type='submit' className='btn btn-primary float-right my-2 px-5 rounded-pill' />
					</div>
				)}
			</form>

			<p class='small text-center text-gray-soft my-3'>
				Don't have an account yet?{' '}
				<a href='/register' className='link'>
					Register
				</a>
			</p>
		</div>
	);
}
