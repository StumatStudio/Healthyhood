import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CardsContainer from './CardsContainer';

const Favorites = () => (
  <div className="favorites__mainContainer">
    <div className="favorites__headingContainer" />
    <CardsContainer />
  </div>
);

export default Favorites;
