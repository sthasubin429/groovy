import React from 'react';
import UserDetailForm from '../components/forms/userDetailForm.js';
import { POST } from '../store/utility.js';

export default function registerDetails() {
	return (
		<>
			<UserDetailForm requestType={POST} />
		</>
	);
}
