import React from 'react';

const SearchCard = ({
  searchObj: { _id, healthScore, yelpResult, walkScore, iqAirScore },
}) => {
  const removeFavorite = () => {
    console.log('favorite id', _id);
  };
  return (
    <div className="favorites__searchCardContainer">
      <div className="favorites__searchCardField">{`Total Health: ${healthScore}`}</div>
      <div className="favorites__searchCardField">
        <div className="favorites__searchCardField--yelpResult">
          YelpData:
          <div className="favorites__yelpField">{`Restaurants: ${yelpResult.restaurants}`}</div>
          <div className="favorites__yelpField">{`Gyms: ${yelpResult.gyms}`}</div>
        </div>
      </div>
      <div className="favorites__searchCardField">{`WalkScore: ${walkScore}`}</div>
      <div className="favorites__searchCardField">{`IQ Air Score ${iqAirScore}`}</div>
      <button type="button" onClick={removeFavorite}>
        Delete Favorite
      </button>
    </div>
  );
};

export default SearchCard;
