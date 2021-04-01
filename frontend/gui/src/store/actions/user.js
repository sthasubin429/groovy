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

				axios
					.get(`${BASE_URL}/userProfile/api/${userData.userInfo.pk}`, {
						headers: {
							authorization: 'Token ' + token,
						},
					})
					.then((res) => {
						userData['userDetails'] = { ...res.data[0] };
						// console.log(userData);
					})
					.catch((err) => {
						console.log(err);
					});
				// console.log(userData);
			})
			.catch((err) => {
				console.log(err);
			});

		// console.log(userData);
		return userData;
	}
};
