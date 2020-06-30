import React from 'react';
import { LoadScript } from '@react-google-maps/api';
import NavBar from './components/NavBar/NavBar';
import ComponentsRouting from './components/ComponentsRouting/ComponentsRouting';
import Footer from './components/Footer/Footer';
import BackgroundAnimation from './components/BackgroundAnimation/BackgroundAnimation';
import MapPlaceholder from './components/common/experimental/MapPlaceholder/MapPlaceholder';

const App = () => (
  <>
    <MapPlaceholder />
    <LoadScript googleMapsApiKey={process.env.GMAPS_KEY} libraries={['places']}>
      <NavBar />
      <ComponentsRouting />
    </LoadScript>
    <Footer />
    <BackgroundAnimation />
  </>
);

export default App;
