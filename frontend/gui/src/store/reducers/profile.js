import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
	user_details: null,
	user_info: null,
	song_list: null,
	playlist_list: null,
	error: null,
	loading: true,
	sucess: false,
	profileView: null,
};

const profileStart = (state, action) => {
	return updateObject(state, {
		error: null,
		loading: true,
		profileView: null,
	});
};

const profileFail = (state, action) => {
	return updateObject(state, {
		error: action.error,
		loading: false,
	});
};

const profileSucess = (state, action) => {
	return updateObject(state, {
		error: null,
		loading: false,
		sucess: true,
	});
};

const profileRestSucess = (state, action) => {
	return updateObject(state, {
		error: null,
		loading: false,
		sucess: false,
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

const profileUpdateProfileView = (state, action) => {
	return updateObject(state, {
		profileView: action.profileView,
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

		case actionTypes.PROFILE_SUCESS:
			return profileSucess(state, action);

		case actionTypes.PROFILE_SUCESS_RESET:
			return profileRestSucess(state, action);

		case actionTypes.PROFILE_VIEW:
			return profileUpdateProfileView(state, action);

		default:
			return state;
	}
};

export default profileReducer;
