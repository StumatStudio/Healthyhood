import React from 'react';
import { LoadScript } from '@react-google-maps/api';
import NavBar from './components/NavBar/NavBar';
import ComponentsRouting from './components/ComponentsRouting/ComponentsRouting';
import Footer from './components/Footer/Footer';
import BackgroundAnimation from './components/BackgroundAnimation/BackgroundAnimation';
import TestLogin from './components/TestLogin';
const App = () => (
  <>
    <TestLogin />
    <LoadScript googleMapsApiKey={process.env.GMAPS_KEY} libraries={['places']}>
      <NavBar />
      <ComponentsRouting />
    </LoadScript>
    <Footer />
    <BackgroundAnimation />
  </>
);

export default App;
