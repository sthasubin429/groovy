import * as actionTypes from './actionTypes';
import axios from 'axios';
import { BASE_URL } from '../utility';
import store from '../configureStore';

const token = localStorage.getItem('token');

export const playerStart = () => {
	return {
		type: actionTypes.PLAYER_START,
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

export const playerFail = (error) => {
	return {
		type: actionTypes.PLAYER_FAIL,
		error: error,
	};
};

export const changeSong = (index) => {
	// console.log(index);
	let song_id = store.getState().player.playlist_details[index].playlist_songs;
	return (dispatch) => {
		axios
			.get(`${BASE_URL}/songs/api/${song_id}/`, {
				headers: {
					authorization: 'Token ' + token,
				},
			})
			.then((res) => {
				dispatch(playerChangeSong(index, res.data));
			})
			.catch((err) => {
				console.log(err);
				dispatch(playerFail(err));
			});
	};
};

export const changePlaylist = (playlist_id) => {
	return (dispatch) => {
		dispatch(playerStart());
		axios
			.get(`${BASE_URL}/songs/playlistDetail/api/${playlist_id}/`, {
				headers: {
					authorization: 'Token ' + token,
				},
			})
			.then((res) => {
				dispatch(playerChangePlaylist(playlist_id, res.data));
				dispatch(changeSong(0));
			})
			.catch((err) => {
				// console.log(err);
				dispatch(playerFail(err));
			});
	};
};

export const checkPlaylist = () => {
	return (dispatch) => {
		let playlist_id = localStorage.getItem('current_playlist');

		if (playlist_id === null) {
			localStorage.setItem('current_playlist', 1);
			dispatch(changePlaylist(localStorage.getItem('current_playlist')));
		} else {
			dispatch(changePlaylist(playlist_id));
		}
	};
};
