import { createAction, createReducer } from '@reduxjs/toolkit';
import * as apiActions from './apiActions';

/*
On successful favorites request, server should return an array
of favorite seach objects with the following schema:
{
  _id
  healthScore
  yelpResult: {totalRestaurants, totalGyms}
  walkScore
  iqAirScore
}
*/

const initialState = {
  currentSearch: {
    _id: '',
    healthScore: '',
    yelpResult: {},
    walkScore: '',
    iqAirScore: '',
  },

  favoriteSearches: {
    1: {
      _id: 1,
      healthScore: 99,
      yelpResult: { restaurants: 106, gyms: 113 },
      walkScore: 91,
      iqAirScore: 3,
    },
    2: {
      _id: 2,
      healthScore: -10,
      yelpResult: { restaurants: 415000, gyms: 1 },
      walkScore: 2,
      iqAirScore: 780,
    },
    3: {
      _id: 3,
      healthScore: 75,
      yelpResult: { restaurants: 487, gyms: 200 },
      walkScore: 75,
      iqAirScore: 106,
    },
  },
  favoriteSearchIds: [1, 2, 3],
  loading: false,
  lastLoad: null,
};

/*--------------
  Action Types
----------------*/
const FAVORITES_REQUESTED = 'favoritesRequested';
const FAVORITES_REQUEST_FAILED = 'favoritesRequestFailed';
const FAVORITES_RECEIVED = 'favoritesReceived';
const SEARCH_SAVED = 'searchSaved';
const UPDATE_CURRENT_SEARCH = 'updateCurrentSearch';

/*--------------
  Action Creators
----------------*/
export const favoritesRequest = createAction(FAVORITES_REQUESTED); // no payload
export const favoritesRequestFailed = createAction(FAVORITES_REQUEST_FAILED); // no payload
export const favoritesReceived = createAction(FAVORITES_RECEIVED); // array of favorites objects
export const searchSaved = createAction(SEARCH_SAVED); // favoriteObj
export const updateCurrentSearch = createAction(UPDATE_CURRENT_SEARCH); // favoriteObj

/*--------------
  Reducer
----------------*/
const favoritesReducer = createReducer(initialState, {
  [FAVORITES_REQUESTED]: favoritesRequestCase,
  [FAVORITES_REQUEST_FAILED]: favoritesRequestFailedCase,
  [FAVORITES_RECEIVED]: favoritesReceivedCase,
  [SEARCH_SAVED]: searchSavedCase,
  [UPDATE_CURRENT_SEARCH]: updateCurrentSearchCase,
});

/*--------------
  Reducer Cases
----------------*/
const favoritesRequestCase = (state, action) => {
  state.loading = true;
};

const favoritesRequestFailedCase = (state, action) => {
  state.loading = false;
};

const favoritesReceivedCase = (state, action) => {
  const favorites = action.payload;
  favorites.forEach((faveSearch) => {
    state.favoriteSearchIds.push(faveSearch._id);
    state.favoriteSearches[faveSearch._id] = faveSearch;
  });
  state.loading = false;
};

const searchSavedCase = (state, action) => {
  const faveSearch = action.payload;
  state.favoriteSearches[faveSearch._id] = faveSearch;
  state.favoriteSearchIds.push(faveSearch._id);
};

const updateCurrentSearchCase = (state, action) => {
  const currentSearch = action.payload;
  state.currentSearch._id = currentSearch._id;
  state.currentSearch.healthScore = currentSearch.healthScore;
  state.currentSearch.yelpResult = currentSearch.yelpResult;
  state.currentSearch.walkScore = currentSearch.walkScore;
  state.currentSearch.iqAirScore = currentSearch.iqAirScore;
};

export default favoritesReducer;

/*------------------
  Action Generators
--------------------*/
const { apiCallRequested } = apiActions;
const favoritesUrl = '/whateverTheBackendNeeds';

// Returns function that, when called creates an API action object with the following payload
// This is set up to take a user ID and send it to the backend as a param
export const getFavorites = (userId) =>
  apiCallRequested({
    url: `${favoritesUrl}:${userId}`,
    method: 'get',
    data: '',
    onStart: FAVORITES_REQUESTED,
    onSuccess: FAVORITES_RECEIVED,
    onError: FAVORITES_REQUEST_FAILED,
  });

export const saveFavorite = (faveObj) =>
  apiCallRequested({
    url: favoritesUrl,
    method: 'post',
    data: faveObj,
    onStart: FAVORITES_REQUESTED,
    onSuccess: SEARCH_SAVED,
    onError: FAVORITES_REQUEST_FAILED,
  });
