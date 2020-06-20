import React from 'react';
import { connect } from 'react-redux';
import NavBar from './components/NavBar/NavBar';
import ComponentsRouting from './components/ComponentsRouting/ComponentsRouting';
import Footer from './components/Footer/Footer';
import BackgroundAnimation from './components/BackgroundAnimation/BackgroundAnimation';
import UserContextProvider from './contexts/UserContext';

import { usersRequest } from './store/entities/userEntity';

const App = () => (
  <>
    <UserContextProvider>
      <NavBar />
      <ComponentsRouting />
    </UserContextProvider>
    <Footer />
    {/*******************/}
    <BackgroundAnimation />
  </>
);

const mapStateToProps = state => ({
  currentUser: state,
});

const mapDispatchToProps = dispatch => ({
  usersRequest: payload => dispatch(usersRequest(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
