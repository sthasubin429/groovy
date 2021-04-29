import React from 'react';

export const DangerError = (props) => {
	return (
		<div class='alert alert-danger' role='alert'>
			{props.message}
		</div>
	);
};

export const UserPassNotMatch = () => {
	return <DangerError message='Username or Password did not Match' />;
};
