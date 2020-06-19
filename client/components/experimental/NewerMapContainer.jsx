import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { useSelector } from 'react-redux';

const containerStyle = {
  width: '800px',
  height: '800px',
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
  } = useSelector(state => state.map);
  const { restaurants, gyms } = yelpData;

  // console.log('userLoc', userEnteredLocation);
  // console.log('yelp', yelpData);
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
    <LoadScript googleMapsApiKey={process.env.GMAPS_KEY}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={mapCenter}
        zoom={15}
        onLoad={onLoad}
        onUnmount={onUnmount}
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
    </LoadScript>
  );
}

export default React.memo(MyComponent);
