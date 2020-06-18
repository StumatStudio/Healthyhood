import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { UserContext } from './../../contexts/UserContext';
import './NavBar.css';

const NonAuthenticatedUserDisplay = () => {
  const { onLoginClick, onSignUpClick } = useContext(UserContext);
  return (
    <div className="db dtc-l v-mid w-100 w-75-l tc tr-l">
      <ul className="ul">
        <li className="li">
          <NavLink
            exact
            to="/"
            className="link dim dark-gray pa3 f6 f6-l dib mr0 pointer"
            activeClassName="active"
          >
            Home
          </NavLink>
        </li>
        <li className="li">
          <NavLink
            exact
            to="/login"
            className="link dim dark-gray pa3 f6 f6-l dib mr0 pointer"
            activeClassName="active"
          >
            Login
          </NavLink>
        </li>
        <li className="li">
          <NavLink
            exact
            to="/signup"
            className="link dim dark-gray pa3 f6 f6-l dib mr0 pointer"
            activeClassName="active"
          >
            Sign Up
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default NonAuthenticatedUserDisplay;
