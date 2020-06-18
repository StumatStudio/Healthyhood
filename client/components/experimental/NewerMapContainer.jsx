import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { useSelector } from 'react-redux';

const containerStyle = {
  width: '800px',
  height: '800px',
};

function MyComponent() {
  console.log('state', React.useState());
  const [map, setMap] = React.useState(null);
  const { yelpData, walkData, autoLocation, userEnteredLocation } = useSelector(
    state => state.map
  );
  console.log('userLoc', userEnteredLocation);
  console.log('yelp', yelpData);
  console.log('walk', walkData);

  const mapCenter = userEnteredLocation.isPrimary
    ? userEnteredLocation
    : autoLocation;


  const onLoad = React.useCallback(function callback(map) {
    console.log('map', map);
    const bounds = new window.google.maps.LatLngBounds();
    // map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

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
        <Marker position={autoLocation} title={'Your Location'} />
      </GoogleMap>
    </LoadScript>
  );
}

export default React.memo(MyComponent);
