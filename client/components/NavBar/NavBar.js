import React from 'react';
import Logo from './../Logo/Logo';
import ToggleAuthentication from './ToggleAuthentication';

const NavBar = () => (
  <nav className="db dt-l w-100 border-box pa3 ph5-l">
    <Logo />
    <ToggleAuthentication />
  </nav>
);

export default NavBar;
