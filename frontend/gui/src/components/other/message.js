import React from 'react';

export const DangerMessage = (props) => {
	return (
		<div className='alert alert-danger' role='alert'>
			{props.message}
		</div>
	);
};

export const UserPassNotMatch = () => {
	return <DangerMessage message='Username or Password did not Match' />;
};

export const PasswordDidNotMatch = () => {
	return (
		<div>
			<p className='invalid-feedback'>Password Must Contain 8 Characters</p>
			<p className='invalid-feedback'>Password Must Contain 8 Characters</p>
			<p className='invalid-feedback'>Password Must Contain 8 Characters</p>
		</div>
	);
};
