import axios from 'axios';
import { BASE_URL } from '../utility';
import * as actionTypes from './actionTypes';

export const profileStart = () => {
	return {
		type: actionTypes.PROFILE_START,
	};
};

export const profileFail = (error) => {
	return {
		type: actionTypes.PROFILE_START,
		error: error,
	};
};

export const profileLogout = () => {
	return {
		type: actionTypes.PROFILE_LOGOUT,
		user_details: null,
		user_info: null,
		error: null,
		loading: false,
	};
};

export const profileUpdateDetails = (user_details, user_info) => {
	return {
		type: actionTypes.PROFILE_UPDATE_DETAILS,
		user_details: user_details,
		user_info: user_info,
	};
};

export const getUserDetails = (token) => {
	return (dispatch) => {
		dispatch(profileStart());

		if (token === undefined) {
			dispatch(profileFail('Token Not found'));
		} else {
			axios
				.get(`${BASE_URL}/rest-auth/user/`, {
					headers: {
						authorization: 'Token ' + token,
					},
				})
				.then((res) => {
					let user_details = { ...res.data };
					axios
						.get(`${BASE_URL}/userProfile/api/${user_details.pk}`, {
							headers: {
								authorization: 'Token ' + token,
							},
						})
						.then((res) => {
							let user_info = { ...res.data[0] };
							dispatch(profileUpdateDetails(user_details, user_info));
						})
						.catch((err) => {
							dispatch(profileFail(err));
						});
				})
				.catch((err) => {
					console.log(err);
				});
		}
	};
};
