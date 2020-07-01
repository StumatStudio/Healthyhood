import React from 'react';
import './MapPlaceholder.css';

const MapPlaceholder = () => (
  <div className="mapPlace__mapContainer">
    <div className="mapPlace__img-container mapPlace--loading">
      <div className="mapPlace__mapSatBar mapPlace--loading" />
      <div className="mapPlace__fullScreenBox mapPlace--loading" />
      <div className="mapPlace__zoomBar mapPlace--loading" />
      <div className="mapPlace__streetViewBox mapPlace--loading" />
    </div>
  </div>
);

export default MapPlaceholder;
