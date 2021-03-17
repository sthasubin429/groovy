import React from 'react';
import { Route } from 'react-router-dom';

import Home from './pages/home';
import Login from './pages/login';
import Player from './pages/player';
import AllSongs from './pages/allSongs';
import Register from './pages/register';
import UploadMusic from './pages/uploadMusic';
import Playlist from './pages/playlist';

export const BaseRouter = () => (
	<div>
		<Route exact path='/' component={Home} />
		<Route exact path='/login/' component={Login} />
		<Route exact path='/register/' component={Register} />
	</div>
);

export const LoggedInRoute = () => (
	<div>
		<Route exact path='/' component={Home} />
		<Route exact path='/player/' component={Player} />
		<Route exact path='/upload/' component={UploadMusic} />
		<Route exact path='/allSongs/' component={AllSongs} />
		<Route exact path='/playlist/' component={Playlist} />
	</div>
);
