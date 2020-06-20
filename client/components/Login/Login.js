import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  updateUser,
  setIsLoggedIn,
  setUsername,
  setPassword,
} from '../../store/entities/userEntity';

const Login = ({
  users: { username, password },
  updateUser,
  setIsLoggedIn,
  setUsername,
  setPassword,
}) => {
  const onLoginSubmission = () => {
    // This code needs to be updated when backend is ready
    updateUser({
      username,
      password,
      joinedon: new Date().toDateString(),
    });
    setIsLoggedIn(true);
  };

  const onUsernameChange = event => setUsername(event.target.value);
  const onPasswordChange = event => setPassword(event.target.value);

  return (
    <main className="measure black-80 mv6 center shadow-4 pa5">
      <fieldset id="login" className="ba b--transparent ph0 mh0">
        <legend className="f4 fw6 ph0 mh0">Login</legend>
        <div className="mt3">
          <label className="db fw6 lh-copy f6" htmlFor="username">
            Username
          </label>
          <input
            className="pa2 w-100 hover-white input-reset hover-bg-black ba bg-transparent f7"
            type="username"
            name="username"
            id="username"
            onChange={onUsernameChange}
          />
        </div>
        <div className="mv3">
          <label className="db fw6 lh-copy f6" htmlFor="password">
            Password
          </label>
          <input
            className="pa2 w-100 hover-white input-reset hover-bg-black ba bg-transparent f7"
            type="password"
            name="password"
            id="password"
            onChange={onPasswordChange}
          />
        </div>
        <label className="pa0 ma0 lh-copy f7 pointer">
          <input type="checkbox" /> Remember me
        </label>
      </fieldset>
      <div>
        <NavLink
          exact
          to="/"
          className="b ph3 pv2 dib input-reset ba b--black bg-transparent grow pointer f6 no-underline"
          onClick={onLoginSubmission}
        >
          Login
        </NavLink>
      </div>
      <div className="lh-copy mt3">
        <a href="#0" className="f7 link dim black db">
          Sign up instead?
        </a>

        <a href="#0" className="f7 link dim black db">
          Forgot your password?
        </a>
      </div>
    </main>
  );
};

const mapStateToProps = ({ users }) => ({ users });

const mapDispatchToProps = {
  updateUser,
  setIsLoggedIn,
  setUsername,
  setPassword,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
