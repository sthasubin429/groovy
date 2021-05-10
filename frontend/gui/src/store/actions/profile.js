import axios from 'axios';
import { changeSong } from './player';

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

export const profileSucess = () => {
	window.location.replace('http://localhost:3000/profile');
	return {
		type: actionTypes.PROFILE_SUCESS,
	};
};

export const profileSucessReset = () => {
	return {
		type: actionTypes.PROFILE_SUCESS_RESET,
	};
};

export const profileSucessTimeout = () => {
	return (dispatch) => {
		setTimeout(() => {
			dispatch(profileSucessReset());
		}, 1000);
	};
};

export const profileLogout = () => {
	return {
		type: actionTypes.PROFILE_LOGOUT,
		user_details: null,
		user_info: null,
		song_list: null,
		playlist_list: null,
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

export const profileUpdateSongs = (song_list) => {
	return {
		type: actionTypes.PROFILE_USER_SONGS,
		song_list: song_list,
	};
};

export const profleUpdatePlaylist = (playlist_list) => {
	return {
		type: actionTypes.PROFILE_USER_PLAYLIST,
		playlist_list: playlist_list,
	};
};

// export const profileUpdateProfileView = (id) => {
// 	return {
// 		type: actionTypes.PROFILE_VIEW,
// 		profileView: id,
// 	};
// };

export const getUserDetails = (token) => {
	return (dispatch) => {
		dispatch(profileStart());

		if (token === undefined) {
			dispatch(profileFail('Token Not Found'));
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
							dispatch(getUserSongs(token, user_details.pk));
							dispatch(getUserPlaylist(token, user_details.pk));
						})
						.catch((err) => {
							dispatch(profileFail(err));
						});
				})
				.catch((err) => {
					dispatch(profileFail(err));
				});
		}
	};
};

export const getUserSongs = (token, userId) => {
	return (dispatch) => {
		dispatch(profileStart());

		if (token === undefined) {
			dispatch(profileFail('Token Not Found'));
		} else {
			axios
				.get(`${BASE_URL}/songs/api/userSongs/${userId}/`, {
					headers: {
						authorization: 'Token ' + token,
					},
				})
				.then((res) => {
					// console.log(res.data);
					dispatch(profileUpdateSongs(res.data));
					dispatch(changeSong(0));
					dispatch(profileSucessTimeout());
				})
				.catch((err) => {
					// console.log(err);
					dispatch(profileFail(err));
				});
		}
	};
};

export const getUserPlaylist = (token, userId) => {
	return (dispatch) => {
		dispatch(profileStart());

		if (token === undefined) {
			dispatch(profileFail('Token Not Found'));
		} else {
			axios
				.get(`${BASE_URL}/songs/playlist/api/userPlaylist/${userId}/`, {
					headers: {
						authorization: 'Token ' + token,
					},
				})
				.then((res) => {
					// console.log(res.data);
					dispatch(profleUpdatePlaylist(res.data));
					dispatch(profileSucessTimeout());
				})
				.catch((err) => {
					// console.log(err);
					dispatch(profileFail(err));
				});
		}
	};
};

export const updateUserProfile = (token, id, formData) => {
	return (dispatch) => {
		dispatch(profileStart());
		if (token === undefined) {
			dispatch(profileFail('Token Not Found'));
		} else {
			axios
				.put(`${BASE_URL}/userProfile/api/${id}/update/`, formData, {
					headers: {
						authorization: 'Token ' + token,
					},
				})
				.then((res) => {
					dispatch(profileSucess());
					dispatch(profileSucessTimeout());
				})
				.catch((err) => {
					dispatch(profileFail(err));
				});
		}
	};
};
