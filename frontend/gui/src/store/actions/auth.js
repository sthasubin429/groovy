import axios from 'axios';
import * as actionTypes from './actionTypes';
import { profileLogout, getUserDetails } from './profile';

import { BASE_URL } from '../utility.js';
//action types are events
export const authStart = () => {
	return {
		type: actionTypes.AUTH_START,
	};
};

export const authSuccess = (token) => {
	return {
		type: actionTypes.AUTH_SUCCESS,
		token: token,
	};
};

export const authFail = (error) => {
	return {
		type: actionTypes.AUTH_FAIL,
		error: error,
	};
};

export const logout = () => {
	localStorage.removeItem('token');
	localStorage.removeItem('expirationDate');
	localStorage.removeItem('current_playlist');
	axios
		.get(`${BASE_URL}/rest-auth/logout/`)
		.then((res) => {
			console.log(res.data);
		})
		.catch((err) => {
			console.log(err);
		});

	return {
		type: actionTypes.AUTH_LOGOUT,
	};
};

export const checkAuthTimeout = (expirationTime) => {
	return (dispatch) => {
		setTimeout(() => {
			dispatch(logout());
		}, expirationTime * 1000);
	};
};

export const authLogin = (username, password) => {
	return (dispatch) => {
		dispatch(authStart());
		axios
			.post(`${BASE_URL}/rest-auth/login/`, {
				username: username,
				password: password,
			})
			.then((res) => {
				console.log(res.data);
				const token = res.data.key;
				const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
				localStorage.setItem('token', token);
				localStorage.setItem('expirationDate', expirationDate);
				dispatch(authSuccess(token));
				dispatch(getUserDetails(token));
				window.location.replace('http://localhost:3000');
				dispatch(checkAuthTimeout(3600));
			})
			.catch((err) => {
				dispatch(authFail(err));
			});
	};
};

export const authRegister = (username, email, password1, password2) => {
	return (dispatch) => {
		dispatch(authStart());
		axios
			.post(`${BASE_URL}/rest-auth/registration/`, {
				username: username,
				email: email,
				password1: password1,
				password2: password2,
			})
			.then((res) => {
				const token = res.data.key;
				const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
				localStorage.setItem('token', token);
				localStorage.setItem('expirationDate', expirationDate);
				dispatch(authSuccess(token));
				dispatch(getUserDetails(token));
				dispatch(checkAuthTimeout(3600));
				window.location.replace('http://localhost:3000/registerDetails/');
			})
			.catch((err) => {
				dispatch(authFail(err));
			});
	};
};

export const authCheckState = () => {
	return (dispatch) => {
		const token = localStorage.getItem('token');
		if (token === undefined) {
			dispatch(logout());
			dispatch(profileLogout());
		} else {
			const expirationDate = new Date(localStorage.getItem('expirationDate'));
			if (expirationDate <= new Date()) {
				dispatch(logout());
			} else {
				dispatch(authSuccess(token));
				dispatch(getUserDetails(token));
				dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
			}
		}
	};
};
