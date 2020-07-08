import React from 'react';
import './SearchCardPlaceholder.css';

const SearchCardPlaceholder = () => (
  <div className="cardPlaceholder__outerContainer">
    <div className="cardPlaceholder__innerContainer">
      <div className="cardPlaceholder__title cardPlace--loading" />
      <div className="cardPlaceholder__data cardPlace--loading">
        <div className="cardPlaceholder__field cardPlace--loading" />
        <div className="cardPlaceholder__field cardPlace--loading" />
        <div className="cardPlaceholder__field cardPlace--loading" />
        <div className="cardPlaceholder__field cardPlace--loading" />
        <div className="cardPlaceholder__field cardPlace--loading" />
        <div className="cardPlaceholder__field cardPlace--loading" />
      </div>
      <div className="cardPlaceholder__buttonContainer">
        <div className="cardPlaceholder__button cardPlace--loading" />
      </div>
    </div>
  </div>
);

export default SearchCardPlaceholder;
