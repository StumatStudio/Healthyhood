import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '800px',
  height: '800px',
};

// const center = { lat: 47.444, lng: -122.176 };

// Codesmith Venice = 33.987854, -118.470531
const autoLocation = { lat: 33.987854, lng: -118.470531 };

function MyComponent() {
  console.log('state', React.useState());
  const [map, setMap] = React.useState(null);

  // try to detect the user's location using the Geolocation API
  // currently only a success callback is used
  // should consider how we want to handle error flows
  // perhaps default to some known location (e.g. Codesmith Venice)
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      autoLocation.lat = position.coords.latitude;
      autoLocation.lng = position.coords.longitude;
      console.log('myComponent autoLocation', autoLocation);
    });
  }

  const onLoad = React.useCallback(function callback(map) {
    console.log('map', map);
    const bounds = new window.google.maps.LatLngBounds();
    // map.fitBounds(bounds);
    setMap(map);

    // if (navigator.geolocation) {
    //   navigator.geolocation.getCurrentPosition(function (position) {
    //     autoLocation.lat = position.coords.latitude;
    //     autoLocation.lng = position.coords.longitude;
    //     console.log('geo autoLocation', autoLocation);
    //   });
    // }
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
        center={autoLocation}
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
