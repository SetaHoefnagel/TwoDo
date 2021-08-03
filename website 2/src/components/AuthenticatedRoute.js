import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

export function AuthenticatedRoute({component: Component, authed, ...rest}) {
    return (
        <Route
          {...rest}
          render={(props) => authed === true
            ? <Component {...props} />
            : <Redirect to={{pathname: '/login/', state: {from: props.location}}} />}
        />
      )
  }
  