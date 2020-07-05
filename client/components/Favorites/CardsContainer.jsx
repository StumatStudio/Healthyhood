import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import SearchCard from './SearchCard';
import Suspend from '../common/Suspend';
import MapPlaceholder from '../common/experimental/MapPlaceholder/MapPlaceholder';

const CardsContainer = () => {
  const favoriteSearchIds = useSelector(
    (state) => state.favorites.favoriteSearchIds
  );

  const favoriteSearches = useSelector(
    (state) => state.favorites.favoriteSearches
  );

  const loading = useSelector((state) => state.favorites.loading);

  const createCard = (searchObj) => {
    return <SearchCard searchObj={searchObj} />;
  };

  return favoriteSearchIds.map((searchId) => {
    return (
      <Suspend
        condition={loading}
        placeholder={MapPlaceholder}
        initialDelay={5000}
        numberOfPlaceholdersToRender={10}
      >
        {createCard(favoriteSearches[searchId])}
      </Suspend>
    );
  });
};

export default CardsContainer;
