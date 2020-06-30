import React from 'react';
import LongLatTest from '../experimental/LongLatTest';
import NewerMapContainer from '../experimental/NewerMapContainer';
import MapContainer2 from '../experimental/MapContainer2';
import NewMapContainer from '../experimental/NewMapContainer';
import { connect } from 'react-redux';
import { usersRequest } from '../../store/entities/userEntity';
import DisplayUser from './DisplayUser';

const UserSection = ({ users: { user }, usersRequest }) => {
  
  const handleClick = () => {
    console.log('inClick');
    usersRequest('This is the action payload');
  };

  return (
    <div className="mapcontainer">
      <DisplayUser user={user} />
      <LongLatTest />
      <NewerMapContainer />
    </div>
  );
};

const mapStateToProps = ({ users }) => ({ users });

export default connect(mapStateToProps, { usersRequest })(UserSection);
