import React, { useContext } from 'react';
import NonAuthenticatedUserDisplay from './NonAuthenticatedUserDisplay';
import AuthenticatedUserDisplay from './AuthenticatedUserDisplay';
import { UserContext } from './../../contexts/UserContext';

const ToggleAuthentication = () => {
  const { isLoggedIn } = useContext(UserContext);
  return (
    <>
      {isLoggedIn ? (
        <AuthenticatedUserDisplay />
      ) : (
        <NonAuthenticatedUserDisplay />
      )}
    </>
  );
};

export default ToggleAuthentication;
