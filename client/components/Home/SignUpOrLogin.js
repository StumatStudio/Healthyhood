import React from 'react';
import { connect } from 'react-redux';
import SignUp from './../SignUp/SignUp';
import Login from './../Login/Login';

/**
 * On the home screen/webpage, when the user is not logged in, <Home />
 * displays either <SignUp /> or <Login />, depending on whether the Sign Up
 * or Login button is clicked (which would toggle the wantToSignUp state).
 */

const SignUpOrLogin = ({ wantToSignUp }) => (
  <>{wantToSignUp ? <SignUp /> : <Login />}</>
);

const mapStateToProps = ({ users: { wantToSignUp } }) => ({ wantToSignUp });

export default connect(mapStateToProps)(SignUpOrLogin);
