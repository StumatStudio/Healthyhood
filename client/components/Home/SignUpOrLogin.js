import React from 'react';
import { connect } from 'react-redux';
import SignUp from '../SignUp/SignUp';
import Login from '../Login/Login';

/**
 * On the home screen/webpage, when the user is not logged in, <Home />
 * displays either <SignUp /> or <Login />, depending on whether the initial
 * state's defaultToSignUp key is set to true or false).
 *
 * Iinitial state is set in client/store/entities/userEntity.js
 */

const SignUpOrLogin = ({ defaultToSignUp }) => (
  <>{defaultToSignUp ? <SignUp /> : <Login />}</>
);

const mapStateToProps = ({ users: { defaultToSignUp } }) => ({
  defaultToSignUp,
});

export default connect(mapStateToProps)(SignUpOrLogin);
