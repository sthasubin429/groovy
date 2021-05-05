import React, { useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import Loading from '../components/other/loading';
import { logout } from '../store/actions/auth';

import { DangerMessage } from '../components/other/message';
import { BASE_URL, TOKEN } from '../store/utility';
import { useDispatch } from 'react-redux';

export default function ChangePassword() {
	const [loading, setLoading] = useState(false);
	const dispatch = useDispatch();
	// const error = useSelector((state) => state.auth.error);

	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm();

	const [passwordMatch, setPasswordMatch] = useState(null);

	const onSubmit = (data) => {
		setLoading(true);
		if (data.new_password1 === data.new_password2) {
			setPasswordMatch(true);
			axios
				.post(`${BASE_URL}/rest-auth/password/change/`, data, {
					headers: {
						authorization: 'Token ' + TOKEN,
					},
				})
				.then((res) => {
					console.log(res.data);
					setLoading(false);
					dispatch(logout());
					window.location.replace('http://localhost:3000/login');
				})
				.catch((err) => {
					console.log(err);
					setLoading(false);
				});
		} else {
			setPasswordMatch(false);
			setLoading(false);
		}
	};
	return (
		<>
			<div className='changePassword-container'>
				<h2> Change Password</h2>

				{passwordMatch === false ? (
					<>
						<DangerMessage message='Password did not Match' />
					</>
				) : (
					<></>
				)}
				<form onSubmit={handleSubmit(onSubmit)}>
					<div class='form-group col-12 col-sm-7'>
						<label for='old_password'>Password</label>
						<input
							{...register('old_password', {
								required: true,
								pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/,
								minLength: 8,
							})}
							type='password'
							class='form-control'
							id='old_password'
							name='old_password'
							placeholder='Password'
						/>
						{errors?.old_password?.type === 'required' && <DangerMessage message='Password is required' />}
						{errors?.old_password?.type === 'minLength' && <DangerMessage message='Password Requires at Least 8 Characters' />}
						{errors?.old_password?.type === 'pattern' && (
							<DangerMessage message='Password must contain atleast one Uppercase, Lowercase letter and Number' />
						)}
					</div>
					<div class='form-group col-12 col-sm-7'>
						<label for='new_password1'>New Password</label>
						<input
							type='password'
							class='form-control'
							id='new_password1'
							name='new_password1'
							placeholder='New Password'
							{...register('new_password1', {
								required: true,
								pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/,
								minLength: 8,
							})}
						/>

						{errors?.new_password1?.type === 'required' && <DangerMessage message='Password is required' />}
						{errors?.new_password1?.type === 'minLength' && <DangerMessage message='Password Requires at Least 8 Characters' />}
						{errors?.new_password1?.type === 'pattern' && (
							<DangerMessage message='Password must contain atleast one Uppercase, Lowercase letter and Number' />
						)}
					</div>
					<div class='form-group col-12 col-sm-7'>
						<label for='new_password2'>Confirm Password</label>
						<input
							{...register('new_password2', {
								required: true,
								pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/,
								minLength: 8,
							})}
							type='password'
							class='form-control'
							id='new_password2'
							name='new_password2'
							placeholder='Confirm Password'
						/>

						{errors?.new_password2?.type === 'required' && <DangerMessage message='Password is required' />}
						{errors?.new_password2?.type === 'minLength' && <DangerMessage message='Password Requires at Least 8 Characters' />}
						{errors?.new_password2?.type === 'pattern' && (
							<DangerMessage message='Password must contain atleast one Uppercase, Lowercase letter and Number' />
						)}
					</div>

					{loading ? (
						<Loading />
					) : (
						<div className='form-group col-12'>
							<input type='submit' className='btn btn-primary' />
						</div>
					)}
				</form>
			</div>
		</>
	);
}
