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
  favoriteSearches: [],
  favoriteSearchIds: [],
  loading: false,
  lastLoad: null,
};

/*--------------
  Action Types
----------------*/
const FAVORITES_REQUESTED = '';
const FAVORITES_REQUEST_FAILED = '';
const FAVORITES_RECEIVED = '';

/*--------------
  Action Creators
----------------*/
const favoritesRequest = createAction(FAVORITES_REQUESTED); // no payload
const favoritesRequestFailed = createAction(FAVORITES_REQUEST_FAILED); // no payload
const favoritesReceived = createAction(FAVORITES_RECEIVED); // array of favorites objects

/*--------------
  Reducer
----------------*/
const favoritesReducer = createReducer(initialState, {
  [FAVORITES_REQUESTED]: favoritesRequestCase,
  [FAVORITES_REQUEST_FAILED]: favoritesRequestFailedCase,
  [FAVORITES_RECEIVED]: favoritesReceivedCase,
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
  state.favoriteSearchIds = favorites.map((faveObj) => faveObj._id);
  state.favoriteSearches = favorites;
  state.loading = false;
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
