import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import authReducer from './reducers/auth';
import playerReducer from './reducers/player';
import profileReducer from './reducers/profile';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducer = combineReducers({
	auth: authReducer,
	player: playerReducer,
	profile: profileReducer,
});

const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

export default store;
