import React from 'react';
import { PropTypes } from 'prop-types';
import './Favorites.css';

const SearchCard = ({
  searchObj: { _id, title, healthScore, yelpResult, walkScore, iqAirScore },
}) => {
  const removeFavorite = () => {
    console.log('favorite id', _id);
  };
  return (
    <div className="favorites__searchCardOuterContainer">
      <div className="favorites__searchCardContainer">
        <div className="favorites__searchCardField">
          <h4 className="favorites__title">{title}</h4>
        </div>
        <div className="favorites__searchCardField">{`Total Health: ${healthScore}`}</div>
        <div className="favorites__searchCardField">
          <div className="favorites__searchCardField--yelpResult">
            YelpData:
            <div className="favorites__yelpField">{`Dining: ${yelpResult.restaurants}`}</div>
            <div className="favorites__yelpField">{`Gyms: ${yelpResult.gyms}`}</div>
          </div>
        </div>
        <div className="favorites__searchCardField">{`WalkScore: ${walkScore}`}</div>
        <div className="favorites__searchCardField">{`IQ Air Score: ${iqAirScore}`}</div>
        <button
          type="button"
          className="favorites__cardButton"
          onClick={removeFavorite}
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default SearchCard;

SearchCard.propTypes = {
  searchObj: PropTypes.shape({
    _id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    healthScore: PropTypes.number.isRequired,
    yelpResult: PropTypes.shape({
      restaurants: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      gyms: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    }),
    walkScore: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    iqAirScore: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  }).isRequired,
};
