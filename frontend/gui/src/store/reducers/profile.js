import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
	user_details: null,
	user_info: null,
	song_list: null,
	playlist_list: null,
	error: null,
	loading: true,
};

const profileStart = (state, action) => {
	return updateObject(state, {
		error: null,
		loading: true,
	});
};

const profileFail = (state, action) => {
	return updateObject(state, {
		error: action.error,
		loading: false,
	});
};

const profileUpdateDetails = (state, action) => {
	return updateObject(state, {
		user_details: action.user_details,
		user_info: action.user_info,
		error: null,
		loading: false,
	});
};

const profileUpdateSongs = (state, action) => {
	return updateObject(state, {
		song_list: action.song_list,
		error: null,
		loading: false,
	});
};

const profileUpdatePlaylist = (state, action) => {
	return updateObject(state, {
		playlist_list: action.playlist_list,
		error: null,
		loading: false,
	});
};

const profileReducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.PROFILE_START:
			return profileStart(state, action);

		case actionTypes.PROFILE_START:
			return profileFail(state, action);

		case actionTypes.PROFILE_UPDATE_DETAILS:
			return profileUpdateDetails(state, action);

		case actionTypes.PROFILE_USER_SONGS:
			return profileUpdateSongs(state, action);

		case actionTypes.PROFILE_USER_PLAYLIST:
			return profileUpdatePlaylist(state, action);

		default:
			return state;
	}
};

export default profileReducer;
