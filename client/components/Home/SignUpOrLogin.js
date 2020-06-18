import React, { useContext } from 'react';
import SignUp from './../SignUp/SignUp';
import Login from './../Login/Login';
import { UserContext } from './../../contexts/UserContext';

/**
 * On the home screen/webpage, when the user is not logged in, <Home />
 * displays either <SignUp /> or <Login />, depending on whether the Sign Up
 * or Login button is clicked (which would toggle the wantToSignUp state).
 */

const SignUpOrLogin = () => {
  const { wantToSignUp } = useContext(UserContext);
  return <>{wantToSignUp ? <SignUp /> : <Login />}</>;
};

export default SignUpOrLogin;
