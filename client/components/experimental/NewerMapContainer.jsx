import React from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';
import { useSelector, useDispatch } from 'react-redux';
import {
  getYelpData,
  getWalkData,
  getIqAirData,
  getHealthScore,
} from '../../store/entities/mapEntity';

const containerStyle = {
  width: '800px',
  height: '500px',
};

function MyComponent() {
  // console.log('state', React.useState());
  const [map, setMap] = React.useState(null);
  const {
    yelpData,
    walkData,
    iqAirData,
    autoLocation,
    userEnteredLocation,
    initialLoad,
  } = useSelector(state => state.map);
  const { restaurants, gyms } = yelpData;

  const dispatch = useDispatch();

  // console.log('userLoc', userEnteredLocation);
  console.log('yelp1', yelpData);
  // console.log('walk', walkData);

  const mapCenter = userEnteredLocation.isPrimary
    ? userEnteredLocation
    : autoLocation;

  const onLoad = React.useCallback(function callback(map) {
    // console.log('map', map);
    const bounds = new window.google.maps.LatLngBounds();
    // map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  const getNewState = () => {
    return {
      yelpData,
      walkData,
      iqAirData,
    };
  };

  // const callApis = async () => {
  //   if (initialLoad) return;

  //   console.log('calling HealthScore Apis');
  //   console.log('yelp0', initialLoad);
  //   try {
  //     const secretSauce = await Promise.all([
  //       dispatch(getYelpData(userEnteredLocation)),
  //       dispatch(getWalkData(userEnteredLocation)),
  //       dispatch(getIqAirData(userEnteredLocation)),
  //     ]);
  //   } catch (e) {
  //     console.log(e.message);
  //   }
  //   // This is using the stored state from when this function was called.
  //   // We need to get the updated state AFTER apis have finished.
  //   console.log('newState', getNewState());
  //   const {
  //     yelpData: newYelp,
  //     walkData: newWalk,
  //     iqAirData: newAir,
  //   } = getNewState();
  //   const { gyms: newGyms, restaurants: newRest } = newYelp;

  //   const secretSauceObj = {
  //     yelpGyms: newGyms.total,
  //     yelpRestaurants: newRest.total,
  //     walkScore: newWalk.walkscore,
  //     iqAirScore: newAir.data.current.pollution.aqius,
  //   };

  //   dispatch(getHealthScore(secretSauceObj));
  // };




  // Choose marker icons via this object
  const markerTypes = {
    blue: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
    green: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
    pink: 'http://maps.google.com/mapfiles/ms/icons/pink-dot.png',
    yellow: 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png',
    purple: 'http://maps.google.com/mapfiles/ms/icons/purple-dot.png',
  };


  const createMarker = (busnObj, idx, type) => {
    const { coordinates, name } = busnObj;
    const coordObj = {
      lat: parseFloat(coordinates.latitude),
      lng: parseFloat(coordinates.longitude),
    };
    const colorIcon = () => {
      if (type === 'rest') return markerTypes.green;
      if (type === 'gym') return markerTypes.blue;
      return null;
    };

    return (
      <Marker
        position={coordObj}
        title={name}
        animation={2}
        icon={colorIcon()}
        key={`${name}${idx}`}
      />
    );
  };

  // this style below will hide all default points of interest
  const myStyles = [
    {
      featureType: 'poi',
      elementType: 'labels',
      stylers: [{ visibility: 'off' }],
    },
  ];

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={mapCenter}
      zoom={14}
      onLoad={onLoad}
      onUnmount={onUnmount}
      // onCenterChanged={() => callApis()}
      options={{
        styles: myStyles,
      }}
    >
      {/* Child components, such as markers, info windows, etc. */}
      <Marker position={mapCenter} title={'Your Location'} />
      {restaurants &&
        restaurants.businesses.map((busnObj, idx) =>
          createMarker(busnObj, idx, 'rest')
        )}
      {gyms &&
        gyms.businesses.map((busnObj, idx) =>
          createMarker(busnObj, idx, 'gym')
        )}
    </GoogleMap>
  );
}

export default React.memo(MyComponent);
