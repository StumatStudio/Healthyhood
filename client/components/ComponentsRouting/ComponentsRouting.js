import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import SignUp from './../SignUp/SignUp';
import Login from './../Login/Login';
import Home from './../Home/Home';
import UserSection from './../UserSection/UserSection';
import NotFound from './../NotFound/NotFound';

const ComponentsRouting = () => (
  <Switch>
    <Route path="/signup" component={SignUp} />
    <Route path="/login" component={Login} />
    <Route path="/not-found" component={NotFound} />
    <Route exact path="/" component={Home} />
    {/********************************************/}
    <Redirect to="/not-found" />
  </Switch>
);

export default ComponentsRouting;
