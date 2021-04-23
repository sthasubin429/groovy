import axios from 'axios';
import store from '../configureStore';
import { BASE_URL, TOKEN } from '../utility';
import * as actionTypes from './actionTypes';

// const token = localStorage.getItem('token');

export const playerStart = () => {
	return {
		type: actionTypes.PLAYER_START,
	};
};

export const playerFail = (error) => {
	return {
		type: actionTypes.PLAYER_FAIL,
		error: error,
	};
};

export const playerChangePlaylist = (playlist_id, playlist_details) => {
	return {
		type: actionTypes.PLAYER_CHANGE_PLAYLIST,
		playlist_id: playlist_id,
		playlist_details: playlist_details,
		index: 0,
	};
};

export const playerChangeSong = (index, current_song) => {
	return {
		type: actionTypes.PLAYER_CHANGE_SONG,
		index: index,
		current_song: current_song,
	};
};

export const playerPlaylistSongDetails = (playlist_song_details) => {
	return {
		type: actionTypes.PLAYER_PLAYLIST_SONG_DETAILS,
		playlist_song_details: playlist_song_details,
	};
};

export const playerUpdateLikeCount = (like, likeCount, likeData) => {
	return {
		type: actionTypes.PLAYER_GET_LIKE,
		like: like,
		likeCount: likeCount,
		likeData: likeData,
	};
};

export const playerGetComments = (comments) => {
	return {
		type: actionTypes.PLAYER_GET_COMMENT,
		comments: comments,
	};
};

export const changeSong = (index) => {
	console.log('changesong');
	let song_id = store.getState().player.playlist_details[index].playlist_songs;
	return (dispatch) => {
		axios
			.get(`${BASE_URL}/songs/api/${song_id}/`, {
				headers: {
					authorization: 'Token ' + TOKEN,
				},
			})
			.then((res) => {
				dispatch(playerChangeSong(index, res.data));
				dispatch(getLikes(song_id));
				dispatch(getComments(song_id));
			})
			.catch((err) => {
				// console.log(err);
				dispatch(playerFail(err));
			});
	};
};

export const changePlaylist = (playlist_id) => {
	return (dispatch) => {
		dispatch(playerStart());
		// console.log(playlist_id);
		localStorage.setItem('current_playlist', playlist_id);
		axios
			.get(`${BASE_URL}/songs/playlistDetail/api/${playlist_id}/`, {
				headers: {
					authorization: 'Token ' + TOKEN,
				},
			})
			.then((res) => {
				dispatch(playerChangePlaylist(playlist_id, res.data));
				dispatch(changeSong(0));
				dispatch(getPlaylistSongDetails(playlist_id));
			})
			.catch((err) => {
				dispatch(playerFail(err));
			});
	};
};

export const checkPlaylist = () => {
	return (dispatch) => {
		dispatch(playerStart());
		let playlist_id = localStorage.getItem('current_playlist');
		if (playlist_id === null) {
			localStorage.setItem('current_playlist', 1);
			dispatch(changePlaylist(localStorage.getItem('current_playlist')));
		} else {
			dispatch(changePlaylist(playlist_id));
		}
	};
};

export const getPlaylistSongDetails = (playlist_id) => {
	return (dispatch) => {
		dispatch(playerStart());
		axios
			.get(`${BASE_URL}/songs/playlistDetail/api/songDetails/${playlist_id}/`, {
				headers: {
					authorization: 'Token ' + TOKEN,
				},
			})
			.then((res) => {
				dispatch(playerPlaylistSongDetails(res.data));
			})
			.catch((err) => {
				dispatch(playerFail(err));
			});
	};
};

export const getLikes = (song_id) => {
	let count = null;
	let like = null;
	let likeData = null;
	let user_id = store.getState().profile.user_details.pk;

	return (dispatch) => {
		axios
			.get(`${BASE_URL}/interaction/likes/api/song/${song_id}/`, {
				headers: {
					authorization: 'Token ' + TOKEN,
				},
			})
			.then((res) => {
				// console.log(res.data);
				count = res.data.length;

				axios
					.get(`${BASE_URL}/interaction/likes/api/checkLike/${song_id}/${user_id}/`, {
						headers: {
							authorization: 'Token ' + TOKEN,
						},
					})
					.then((res) => {
						// console.log(res.data);
						likeData = res.data;
						if (res.data.length !== 0) {
							like = true;
						} else {
							like = false;
						}
						// console.log(like, count);
						dispatch(playerUpdateLikeCount(like, count, likeData));
					})
					.catch((err) => {
						dispatch(playerFail(err));
					});
			})
			.catch((err) => {
				dispatch(playerFail(err));
			});
	};
};

export const toggleLike = () => {
	let likeData = store.getState().player.likeData;
	let user_id = store.getState().profile.user_details.pk;
	let song_id = store.getState().player.current_song.id;

	// console.log(likeData, user_id, song_id);
	return (dispatch) => {
		if (likeData && likeData.length !== 0) {
			axios
				.delete(`${BASE_URL}/interaction/likes/api/${likeData[0].id}/delete/`, {
					headers: {
						authorization: 'Token ' + TOKEN,
					},
				})
				.then((res) => {
					// console.log(res.data);
					dispatch(getLikes(song_id));
				})
				.catch((err) => {
					dispatch(playerFail(err));
				});
		} else {
			let data = {
				song: song_id,
				username: user_id,
			};
			axios
				.post(`${BASE_URL}/interaction/likes/api/create/`, data, {
					headers: {
						authorization: 'Token ' + TOKEN,
					},
				})
				.then((res) => {
					// console.log(res.data);
					dispatch(getLikes(song_id));
				})
				.catch((err) => {
					// console.log(err);
					dispatch(playerFail(err));
				});
		}
	};
};

export const getComments = (song_id) => {
	return (dispatch) => {
		axios
			.get(`${BASE_URL}/interaction/comments/api/song/${song_id}/`, {
				headers: {
					authorization: 'Token ' + TOKEN,
				},
			})
			.then((res) => {
				// console.log(res.data);
				dispatch(playerGetComments(res.data));
			})
			.catch((err) => {
				dispatch(playerFail(err));
			});
	};
};
