import React from 'react';
import NavBar from './components/NavBar/NavBar';
import ComponentsRouting from './components/ComponentsRouting/ComponentsRouting';
import Footer from './components/Footer/Footer';
import BackgroundAnimation from './components/BackgroundAnimation/BackgroundAnimation';

const App = () => (
  <>
    <NavBar />
    <ComponentsRouting />
    <Footer />
    {/*******************/}
    <BackgroundAnimation />
  </>
);

export default App;
