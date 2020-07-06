import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import SearchCard from './SearchCard';
import Suspend from '../common/Suspend';
import './Favorites.css';
import SearchCardPlaceholder from '../common/experimental/SearchCardPlaceholder/SearchCardPlaceholder';

const CardsContainer = () => {
  const favoriteSearchIds = useSelector(
    (state) => state.favorites.favoriteSearchIds
  );

  const favoriteSearches = useSelector(
    (state) => state.favorites.favoriteSearches
  );

  const loading = useSelector((state) => state.favorites.loading);

  const createCard = (searchObj, idx) => (
    <SearchCard key={`Card${idx}`} searchObj={searchObj} />
  );

  return (
    <div className="favorites__cardsSectionContainer">
      <Suspend
        condition={loading}
        placeholder={SearchCardPlaceholder}
        initialDelay={1000}
        numberOfPlaceholdersToRender={10}
      >
        {favoriteSearchIds.map((searchId, idx) =>
          createCard(favoriteSearches[searchId], idx)
        )}
      </Suspend>
    </div>
  );
};

export default CardsContainer;
