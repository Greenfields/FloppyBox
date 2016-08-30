import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from '../pages/app';
import Home from '../pages/home';

const routes = (
    <Route component={App} path=":language">
        <IndexRoute component={Home}/>
    </Route>
);

export default routes;
