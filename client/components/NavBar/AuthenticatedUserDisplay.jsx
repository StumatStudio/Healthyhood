import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { setIsLoggedIn } from '../../store/entities/userEntity';
import './NavBar.css';

const AuthenticatedUserDisplay = () => {
  const onLogoutClick = () => setIsLoggedIn(false);
  return (
    <div className="db dtc-l v-mid w-100 w-75-l tc tr-l">
      <ul className="ul">
        <li className="li">
          <NavLink
            exact
            to="/"
            className="link dim dark-gray pa3 f6 f6-l dib mr0 mr0-l pointer"
          >
            Home
          </NavLink>
        </li>
        <li className="li">
          <NavLink
            exact
            to="/favorites"
            className="link dim dark-gray pa3 f6 f6-l dib mr0 mr0-l pointer"
          >
            Favorites
          </NavLink>
        </li>
        <li className="li">
          <NavLink
            exact
            to="/"
            className="link dim dark-gray pa3 f6 f6-l dib mr0 mr4-l pointer"
            onClick={onLogoutClick}
          >
            Logout
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default connect(null, { setIsLoggedIn })(AuthenticatedUserDisplay);
