import React, { useState } from 'react';
import { getUserDetails } from '../../store/actions/user.js';

export default function UserDetails() {
	// const [userData, setUserData] = useState(getUserDetails());
	const userData = getUserDetails();
	console.log(userData);
	console.log(userData.userInfo);

	return (
		<>
			<h3> User Details</h3>
			{/* <img src={userData.userDetails.profile_picture} className='playlist-songImg' alt='Song' /> */}
		</>
	);
}
