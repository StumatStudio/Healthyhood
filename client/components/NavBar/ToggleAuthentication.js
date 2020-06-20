import React from 'react';
import AuthenticatedUserDisplay from './AuthenticatedUserDisplay';
import NonAuthenticatedUserDisplay from './NonAuthenticatedUserDisplay';
import { connect } from 'react-redux';
import { setIsLoggedIn } from '../../store/entities/userEntity';

const ToggleAuthentication = ({ isLoggedIn }) => (
  <>
    {isLoggedIn ? (
      <AuthenticatedUserDisplay />
    ) : (
      <NonAuthenticatedUserDisplay />
    )}
  </>
);

const mapStateToProps = ({ users: { isLoggedIn } }) => ({ isLoggedIn });

export default connect(mapStateToProps)(ToggleAuthentication);
