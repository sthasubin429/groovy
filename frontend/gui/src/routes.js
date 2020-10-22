import React from 'react';
import { Route } from 'react-router-dom';

import Home from "./pages/home";
import Player from "./pages/player";
import Login from "./pages/login";
import Register from "./pages/register"

const BaseRouter = () => (
    <div>
        <Route exact path='/' component={Home} />
        <Route exact path='/player/' component={Player} />
        <Route exact path='/login/' component={Login} />
        <Route exact path='/register/' component={Register} />
    </div>

);

export default BaseRouter;