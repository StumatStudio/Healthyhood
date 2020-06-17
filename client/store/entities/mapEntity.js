import { createAction, createReducer } from '@reduxjs/toolkit';
import * as apiActions from './apiActions';

const initialState = {
  yelpData: {
    places: {},
  },
  walkData: {

  }
  isLoading: false,
  lastFetch: null,
};

// Action Types
const DATA_REQUEST = 'dataRequest';
const DATA_REQUEST_FAILED = 'dataRequestFailed';
const YELP_DATA_RECEIVED = 'dataReceived';

// Action Creators
export const dataRequest = createAction(DATA_REQUEST); // No payload, sets isLoading true
export const dataRequestFailed = createAction(DATA_REQUEST_FAILED); // No payload sets loading false
export const yelpDataReceived = createAction(); // requires latLong obj as payload

// Reducers
const dataReducer = createReducer(initialState, {
  [DATA_REQUEST]: dataRequestCase,
  [DATA_REQUEST_FAILED]: dataRequestFailedCase,
  [YELP_DATA_RECEIVED]: yelpDataReceivedCase,
});

// Reducer Cases
function dataRequestCase(state, action) {
  state.isLoading = true;
}

function dataRequestFailedCase(state, action) {
  state.isLoading = false;
}

function yelpDataReceivedCase(state, action) {
  const { data: yelpData } = action.payload;
  state.yelpData = yelpData;
  state.isLoading = false;
}

export default dataReducer;

// Action Generators
const { apiCallRequested } = apiActions;
const dataUrl = '/business/search';

export const getYelpData = (latLongObj) =>
  apiCallRequested({
    url: dataUrl,
    method: 'get',
    data: latLongObj,
    onStart: DATA_REQUEST,
    onSuccess: YELP_DATA_RECEIVED,
    onError: DATA_REQUEST_FAILED,
  });
