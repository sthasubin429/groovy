import React from 'react';
import { POST } from '../store/utility.js';
import UserDetailForm from '../components/forms/userDetailForm.js';

export default function registerDetails() {
	return (
		<>
			<UserDetailForm requestType={POST} />
		</>
	);
}
