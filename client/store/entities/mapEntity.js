import { createAction, createReducer } from '@reduxjs/toolkit';
import * as apiActions from './apiActions';

const getInitialLocation = () => {
  // Codesmith Venice = 33.987854, -118.470531
  const autoLocation = { lat: 33.987854, lng: -118.470531 };

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      autoLocation.lat = position.coords.latitude;
      autoLocation.lng = position.coords.longitude;
      console.log('myComponent autoLocation', autoLocation);
    });
  }
  return autoLocation;
};

const initialState = {
  yelpData: {
    places: {},
  },
  walkData: {},
  autoLocation: getInitialLocation(),
  userEnteredLocation: {
    lng: 0,
    lat: 0,
    isPrimary: false,
  },
  isLoading: false,
  lastFetch: null,
};

// Action Types
const DATA_REQUEST = 'dataRequest';
const DATA_REQUEST_FAILED = 'dataRequestFailed';
const UPDATE_USER_LOCATION = 'userUpdatedLocation';
const YELP_DATA_RECEIVED = 'yelpDataReceived';
const WALK_DATA_RECEIVED = 'walkDataReceived';

// Action Creators
export const dataRequest = createAction(DATA_REQUEST); // No payload, sets isLoading true
export const dataRequestFailed = createAction(DATA_REQUEST_FAILED); // No payload sets loading false
export const updateUserLocation = createAction(UPDATE_USER_LOCATION); // Payload is object with lat, lng props
export const yelpDataReceived = createAction(YELP_DATA_RECEIVED); // requires latLong obj as payload
export const walkDataReceived = createAction(WALK_DATA_RECEIVED); // requires latLong obj as payload

// Reducers
const dataReducer = createReducer(initialState, {
  [DATA_REQUEST]: dataRequestCase,
  [DATA_REQUEST_FAILED]: dataRequestFailedCase,
  [UPDATE_USER_LOCATION]: updateUserLocationCase,
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

function updateUserLocationCase(state, action) {
  let { lat, lng } = action.payload;
  lat = parseFloat(lat);
  lng = parseFloat(lng);
  const newUserLocObj = { lat, lng, isPrimary: true };
  state.userEnteredLocation = newUserLocObj;
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
  const { lat, lng } = latLongObj;
  const newUrl = `${yelpDataUrl}?latitude=${lat}&longitude=${lng}`;
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
  const { lat, lng } = latLonObj;
  const newUrl = `${walkDataUrl}?lat=${lat}&lon=${lng}`;
  return apiCallRequested({
    url: newUrl,
    method: 'get',
    data: '',
    onStart: DATA_REQUEST,
    onSuccess: WALK_DATA_RECEIVED,
    onError: DATA_REQUEST_FAILED,
  });
};
