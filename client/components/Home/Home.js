import React from 'react';
import { connect } from 'react-redux';
import UserSection from '../UserSection/UserSection';
import SignUpOrLogin from './SignUpOrLogin';

const Home = ({ isLoggedIn }) => (
  <>{isLoggedIn ? <UserSection /> : <SignUpOrLogin />}</>
);

const mapStateToProps = ({ users: { isLoggedIn } }) => ({ isLoggedIn });

export default connect(mapStateToProps)(Home);
