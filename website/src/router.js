import React from 'react';
import Home from './components/home'
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link
  } from "react-router-dom";


  export default () => (
    <Switch>
        <Route exact path="/login/">
            {/* TODO: Create a login for the user */}
        </Route>
        <Route exact path="/register/">
            {/* TODO: Create a register for the user */}
        </Route>


        <Route exact path="/">
            {/* TODO: check if user is logged in, true > goto list of todo lists, false > show general home screen */}
            <Home />
        </Route>
        <Route>
            404
        </Route>

    </Switch>
  )
