import React, { useContext } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Home from './../Home/Home';
import UserSection from './../UserSection/UserSection';
import NotFound from './../NotFound/NotFound';
import SignUp from './../SignUp/SignUp';
import Login from './../Login/Login';
import AuthenticatedRoute from './AuthenticatedRoute';
import { UserContext } from './../../contexts/UserContext';

const ComponentsRouting = () => (
  <Switch>
    {/* <Route path="/user/:username" component={UserSection} /> */}
    <Route path="/signup" component={SignUp} />
    <Route path="/login" component={Login} />
    <Route path="/logout" component={Home} />
    <AuthenticatedRoute path="/user" component={UserSection} />
    <Route path="/not-found" component={NotFound} />
    <Route path="/" exact component={Home} />
    {/*******************************************************/}
    <Redirect from="/signup" to="/" />
    <Redirect from="/login" to="/" />
    <Redirect from="/logout" to="/" />
    <Redirect to="/not-found" />
  </Switch>
);

export default ComponentsRouting;
