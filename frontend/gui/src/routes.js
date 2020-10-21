import React from 'react';
import { Route } from 'react-router-dom';

import Home from "./pages/home";
import Player from "./pages/player";

const BaseRouter = () => (
    <div>
        <Route exact path='/' component={Home} />
        <Route exact path='/player' component={Player} />
    </div>

);

export default BaseRouter;