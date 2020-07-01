import React from 'react';
import { useSelector } from 'react-redux';
import LongLatTest from '../experimental/LongLatTest';
import NewerMapContainer from '../experimental/NewerMapContainer';
import Suspend from '../common/Suspend';
import MapPlaceholder from '../common/experimental/MapPlaceholder/MapPlaceholder';
import WheelLoader from '../common/experimental/WheelLoader/WheelLoader';

const UserSection = () => {
  const map = useSelector((state) => state.map);
  const loading = !map.isLoading;
  console.log('loading', loading);

  return (
    <div className="mapcontainer">
      <LongLatTest />
      <Suspend
        placeholder={MapPlaceholder}
        initialDelay={1000}
        condition={loading}
      >
        <NewerMapContainer />
      </Suspend>
    </div>
  );
};

export default UserSection;
