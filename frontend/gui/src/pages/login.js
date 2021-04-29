import { useDispatch, useSelector } from 'react-redux';
import React from 'react';
import * as actions from '../store/actions/auth';

import Loading from '../components/other/loading';
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
		<div className='container'>
			<>
				{error ? (
					<>
						<UserPassNotMatch />
					</>
				) : (
					<></>
				)}
				<form onSubmit={(event) => handleSubmit(event)}>
					<div className='form-group'>
						<label for='loginUsername'>Username</label>
						<input type='text' className='form-control' name='loginUsername' placeholder='Username' />
					</div>
					<div className='form-group'>
						<label for='loginPassword'>Password</label>
						<input type='password' className='form-control' name='loginPassword' placeholder='Password' />
					</div>
					{loading ? (
						<Loading />
					) : (
						<button type='submit' className='btn btn-primary'>
							Submit
						</button>
					)}
				</form>
			</>
		</div>
	);
}
