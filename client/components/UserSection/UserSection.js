import React from 'react';
import LongLatTest from './../experimental/LongLatTest';
import NewerMapContainer from './../experimental/NewerMapContainer';
import MapContainer2 from './../experimental/MapContainer2';
import NewMapContainer from './../experimental/NewMapContainer';
import { connect } from 'react-redux';
import { usersRequest } from './../../store/entities/userEntity';

const UserSection = ({ users: { user }, usersRequest }) => {
  const handleClick = () => {
    console.log('inClick');
    usersRequest('This is the action payload');
  };
  return (
    <>
      <h1>Hey, {user.username}, {user.email}, {user.password}, {user.joinedon}</h1>
      <p>Warning: Restricted Area</p>
      <h1>Hello STUMAT!!!</h1>
      <LongLatTest />
      <NewerMapContainer />
      <button onClick={handleClick}>Click Me</button>
    </>
  );
};

const mapStateToProps = ({ users }) => ({ users });

export default connect(mapStateToProps, { usersRequest })(UserSection);
