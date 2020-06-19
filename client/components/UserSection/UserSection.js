import React, { useContext } from 'react';
import { connect } from 'react-redux';
import { UserContext } from './../../contexts/UserContext';

import LongLatTest from './../experimental/LongLatTest';
import NewerMapContainer from './../experimental/NewerMapContainer';
import MapContainer2 from './../experimental/MapContainer2';
import NewMapContainer from './../experimental/NewMapContainer';
import { usersRequest } from './../../store/entities/userEntity';

const UserSection = props => {
  const { user } = useContext(UserContext); // For later use when we have user info to display

  const handleClick = () => {
    // console.log('inClick');
    props.usersRequest('This is the action payload');
  };
  //console.log(props.currentUser);
  // console.log('loadFlag', props.currentUser.users.isLoading);

  return (
    <>
      <p>Warning: Restricted Area</p>
      <h1>Hello STUMAT!!!</h1>
      <LongLatTest />
      <NewerMapContainer />
      <button onClick={handleClick}>Click Me</button>
    </>
  );
};

const mapStateToProps = state => ({
  currentUser: state,
});

const mapDispatchToProps = dispatch => ({
  usersRequest: payload => dispatch(usersRequest(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserSection);
