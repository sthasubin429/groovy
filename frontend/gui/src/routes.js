import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import Login from './pages/login';
import Player from './pages/player';

import HomePage from './pages/home';
import Artists from './pages/artists';

import Profile from './pages/profile';
import AllSongs from './pages/allSongs';

import Composer from './pages/composer';
import NotFound from './pages/notFound';

import Register from './pages/register';
import Playlist from './pages/playlist';

import LandingPage from './pages/landing';
import Following from './pages/following';

import ArtistPage from './pages/artistPage';
import Favourites from './pages/favourites';

import ProfileEdit from './pages/profileEdit';
import UploadMusic from './pages/uploadMusic';

import SinglePlayer from './pages/singlePlayer';
import PlaylistEdit from './pages/playlistEdit';

import ChangePassword from './pages/changePassword';
import PlaylistCreate from './pages/playlistCreate';
import PlaylistDetail from './pages/playlistDetail';

import ForgotPassword from './pages/forgotPassword';
import RegisterDetails from './pages/registerDetails';

import PasswordResetConfirm from './pages/passwordResetConfirm';
import { LoggedOutDefault, LoggedInDefault } from './pages/default';

export const BaseRouter = () => (
	<div>
		<Switch>
			<Route exact path='/' component={LandingPage} />
			<Route exact path='/login/' component={Login} />
			<Route exact path='/register/' component={Register} />
			<Route exact path='/forgotPassword/' component={ForgotPassword} />
			<Route exact path='/passwordResetConfirm/:token' component={PasswordResetConfirm} />
			<Route exact path='/500/' component={NotFound} />
			<Route path='/' component={LoggedOutDefault} />
		</Switch>
	</div>
);

export const LoggedInRoute = () => (
	<div>
		<Switch>
			<Route exact path='/' component={HomePage} />
			<Redirect from='/home/' to='/' />
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
			<Route exact path='/playlistDetail/' component={PlaylistDetail} />
			<Route exact path='/following/' component={Following} />
			<Route exact path='/favourites/' component={Favourites} />
			<Route exact path='/playlistEdit/' component={PlaylistEdit} />
			<Route exact path='/500/' component={NotFound} />
			<Route path='/' component={LoggedInDefault} />
		</Switch>
	</div>
);
