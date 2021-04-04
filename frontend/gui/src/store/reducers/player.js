import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
	playlist_id: null,
	index: 0,
	playlist_details: null,
	current_song: null,
	error: null,
	loading: true,
};

const playerStart = (state, action) => {
	return updateObject(state, {
		error: null,
		loading: true,
	});
};

const playerChangePlaylist = (state, action) => {
	return updateObject(state, {
		playlist_id: action.playlist_id,
		playlist_details: action.playlist_details,
		index: action.index,
		error: null,
	});
};

const playerChangeSong = (state, action) => {
	return updateObject(state, {
		index: action.index,
		current_song: action.current_song,
		loading: false,
		error: null,
	});
};

const playerFail = (state, action) => {
	return updateObject(state, {
		error: action.error,
		loading: false,
	});
};

const playerReducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.PLAYER_START:
			return playerStart(state, action);

		case actionTypes.PLAYER_FAIL:
			return playerFail(state, action);

		case actionTypes.PLAYER_CHANGE_PLAYLIST:
			return playerChangePlaylist(state, action);

		case actionTypes.PLAYER_CHANGE_SONG:
			return playerChangeSong(state, action);

		default:
			return state;
	}
};

export default playerReducer;
