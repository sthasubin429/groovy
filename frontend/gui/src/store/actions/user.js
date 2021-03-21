import axios from 'axios';
import { BASE_URL } from '../utility.js';

export const getUserDetails = () => {
	const token = localStorage.getItem('token');
	let userData = {};

	if (token) {
		axios
			.get(`${BASE_URL}/rest-auth/user/`, {
				headers: {
					authorization: 'Token ' + token,
				},
			})
			.then((res) => {
				userData['userInfo'] = { ...res.data };
				// console.log(userData);
			})
			.catch((err) => {
				console.log(err);
			});

		// console.log(userData);
		return userData;
	}
};
