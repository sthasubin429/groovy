import React from 'react';

export const DangerMessage = (props) => {
	return (
		<div className='alert alert-danger' role='alert'>
			{props.message}
		</div>
	);
};

export const SucessMessage = (props) => {
	return (
		<div class='alert alert-success' role='alert'>
			{props.message}
		</div>
	);
};

export const UserPassNotMatch = () => {
	return <DangerMessage message='Username or Password did not Match' />;
};
