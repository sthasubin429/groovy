import React from 'react';
import { Route } from 'react-router-dom';

import Home from './pages/home';
import Login from './pages/login';
import Player from './pages/player';
import AllSongs from './pages/allSongs';
import Register from './pages/register';
import Playlist from './pages/playlist';
import UploadMusic from './pages/uploadMusic';
import PlaylistCreate from './pages/playlistCreate';
import RegisterDetails from './pages/registerDetails';
import Profile from './pages/profile';
import ProfileEdit from './pages/profileEdit';
import Artists from './pages/artists';
import ArtistPage from './pages/artistPage';
import Composer from './pages/composer';
import SinglePlayer from './pages/singlePlayer';
import ChangePassword from './pages/changePassword';

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
		<Route exact path='/playlistCreate/' component={PlaylistCreate} />
		<Route exact path='/registerDetails/' component={RegisterDetails} />
		<Route exact path='/profile/' component={Profile} />
		<Route exact path='/profileEdit/' component={ProfileEdit} />
		<Route exact path='/artists/' component={Artists} />
		<Route exact path='/artistDetail/' component={ArtistPage} />
		<Route exact path='/composer/' component={Composer} />
		<Route exact path='/listen/' component={SinglePlayer} />
		<Route exact path='/changePassword/' component={ChangePassword} />
	</div>
);
