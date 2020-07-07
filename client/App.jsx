import React from 'react';
import { LoadScript } from '@react-google-maps/api';
import NavBar from './components/NavBar/NavBar';
import ComponentsRouting from './components/ComponentsRouting/ComponentsRouting';
import Footer from './components/Footer/Footer';
import BackgroundAnimation from './components/BackgroundAnimation/BackgroundAnimation';

const App = () => (
  <>
    <div className="app__background">
      <LoadScript
        googleMapsApiKey={process.env.GMAPS_KEY}
        libraries={['places']}
      >
        <NavBar />
        <ComponentsRouting />
      </LoadScript>
      <Footer />
      <BackgroundAnimation />
    </div>
  </>
);

export default App;
