import { createAction, createReducer } from '@reduxjs/toolkit';
import * as apiActions from './apiActions';

const initialState = {
  yelpData: {
    places: {},
  },
  walkData: {},
  isLoading: false,
  lastFetch: null,
};

// Action Types
const DATA_REQUEST = 'dataRequest';
const DATA_REQUEST_FAILED = 'dataRequestFailed';
const YELP_DATA_RECEIVED = 'yelpDataReceived';
const WALK_DATA_RECEIVED = 'walkDataReceived';

// Action Creators
export const dataRequest = createAction(DATA_REQUEST); // No payload, sets isLoading true
export const dataRequestFailed = createAction(DATA_REQUEST_FAILED); // No payload sets loading false
export const yelpDataReceived = createAction(YELP_DATA_RECEIVED); // requires latLong obj as payload
export const walkDataReceived = createAction(WALK_DATA_RECEIVED); // requires latLong obj as payload

// Reducers
const dataReducer = createReducer(initialState, {
  [DATA_REQUEST]: dataRequestCase,
  [DATA_REQUEST_FAILED]: dataRequestFailedCase,
  [YELP_DATA_RECEIVED]: yelpDataReceivedCase,
  [WALK_DATA_RECEIVED]: walkDataReceivedCase,
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
  console.log('yelpData', yelpData);
  state.yelpData = yelpData;
  state.isLoading = false;
}

function walkDataReceivedCase(state, action) {
  const { data: walkData } = action.payload;
  console.log('walk Data', walkData);
  state.walkData = walkData;
  state.isLoading = false;
}

export default dataReducer;

// Action Generators
const { apiCallRequested } = apiActions;
const yelpDataUrl = 'yelp/business/search';
const walkDataUrl = '/walkscore';
// const dataUrl = '/nope';

export const getYelpData = latLongObj => {
  const { latitude, longitude } = latLongObj;
  const newUrl = `${yelpDataUrl}?latitude=${latitude}&longitude=${longitude}`;
  return apiCallRequested({
    url: newUrl,
    method: 'get',
    data: '',
    onStart: DATA_REQUEST,
    onSuccess: YELP_DATA_RECEIVED,
    onError: DATA_REQUEST_FAILED,
  });
};
export const getWalkData = latLonObj => {
  const { latitude, longitude } = latLonObj;
  const newUrl = `${walkDataUrl}?lat=${latitude}&lon=${longitude}`;
  return apiCallRequested({
    url: newUrl,
    method: 'get',
    data: '',
    onStart: DATA_REQUEST,
    onSuccess: WALK_DATA_RECEIVED,
    onError: DATA_REQUEST_FAILED,
  });
};
