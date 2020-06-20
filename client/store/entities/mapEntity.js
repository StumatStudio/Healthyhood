import { createAction, createReducer } from '@reduxjs/toolkit';
import * as apiActions from './apiActions';

const getInitialLocation = () => {
  console.log('called Initial Location');
  // Codesmith Venice = 33.987854, -118.470531
  const autoLocation = { lat: 33.987854, lng: -118.470531 };

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      autoLocation.lat = position.coords.latitude;
      autoLocation.lng = position.coords.longitude;
      // console.log('myComponent autoLocation', autoLocation);
    });
  }
  return autoLocation;
};

const initialState = {
  yelpData: {},
  walkData: {},
  iqAirData: {},
  healthComputed: false,
  healthScore: 0,

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
const IQAIR_DATA_RECEIVED = 'iqAirDataReceived';
const HEALTH_SCORE_RECEIVED = 'healthScoreReceived';
const GROUP_API_STARTED = 'groupApiCallStarted';

// Action Creators
export const dataRequest = createAction(DATA_REQUEST); // No payload, sets isLoading true
export const dataRequestFailed = createAction(DATA_REQUEST_FAILED); // No payload sets loading false
export const updateUserLocation = createAction(UPDATE_USER_LOCATION); // Payload is object with lat, lng props
export const yelpDataReceived = createAction(YELP_DATA_RECEIVED); // requires apiData return as payload
export const walkDataReceived = createAction(WALK_DATA_RECEIVED); // requires apiData return as payload
export const iqAirDataReceived = createAction(IQAIR_DATA_RECEIVED); // requires apiData return as payload
export const healthScoreReceived = createAction(HEALTH_SCORE_RECEIVED); // requires score returned from sever as payload
export const groupApiCallStarted = createAction(GROUP_API_STARTED); // no payload

// Reducers
const dataReducer = createReducer(initialState, {
  [DATA_REQUEST]: dataRequestCase,
  [DATA_REQUEST_FAILED]: dataRequestFailedCase,
  [UPDATE_USER_LOCATION]: updateUserLocationCase,
  [YELP_DATA_RECEIVED]: yelpDataReceivedCase,
  [WALK_DATA_RECEIVED]: walkDataReceivedCase,
  [IQAIR_DATA_RECEIVED]: iqAirDataReceivedCase,
  [HEALTH_SCORE_RECEIVED]: healthScoreReceivedCase,
  [GROUP_API_STARTED]: groupApiCallStartedCase,
});

// Reducer Cases
function dataRequestCase(state, action) {
  state.isLoading = true;
}

function dataRequestFailedCase(state, action) {
  state.isLoading = false;
}

function groupApiCallStartedCase(state, action) {
  state.healthComputed = false;
  state.healthScore = 0;
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
  //console.log('yelpData', yelpData);
  state.yelpData = yelpData;
  state.yelpDataReturned = Date.now();
  state.isLoading = false;
}

function walkDataReceivedCase(state, action) {
  const { data: walkData } = action.payload;
  console.log('walk Data', walkData);
  state.walkData = walkData;
  state.walkDataReturned = Date.now();
  state.isLoading = false;
}

function iqAirDataReceivedCase(state, action) {
  const { data: iqAirData } = action.payload;
  console.log('Air Data', iqAirData);
  state.iqAirData = iqAirData;
  state.iqAirDataReturned = Date.now();
  state.isLoading = false;
}

function healthScoreReceivedCase(state, action) {
  console.log('health payload', action.payload);
  const { data: healthScore } = action.payload;
  state.healthScore = healthScore;
  state.healthComputed = true;
  state.isLoading = false;
}

export default dataReducer;

// Action Generators
const { apiCallRequested } = apiActions;
const yelpDataUrl = 'yelp/business/search';
const walkDataUrl = '/walkscore';
const iqAirUrl = '/iqair';
const healthScoreUrl = '/healthyscore';

export const getYelpData = latLongObj => {
  const { lat, lng } = latLongObj;
  const newUrl = `${yelpDataUrl}?latitude=${lat}&longitude=${lng}`;
  return apiCallRequested({
    url: newUrl,
    method: 'get',
    data: '',
    onStart: DATA_REQUEST,
    onSuccess: YELP_DATA_RECEIVED,
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

export const getIqAirData = latLonObj => {
  const { lat, lng } = latLonObj;
  const newUrl = `${iqAirUrl}?lat=${lat}&lon=${lng}`;
  return apiCallRequested({
    url: newUrl,
    method: 'get',
    data: '',
    onStart: DATA_REQUEST,
    onSuccess: IQAIR_DATA_RECEIVED,
    onError: DATA_REQUEST_FAILED,
  });
};

export const getHealthScore = secretSauceObj => {
  const { walkScore, yelpGyms, yelpRestaurants, iqAirScore } = secretSauceObj;
  const newUrl = `${healthScoreUrl}?walkscore=${walkScore}&yelpgyms=${yelpGyms}&yelprestaurants=${yelpRestaurants}&iqairscore=${iqAirScore}`;
  return apiCallRequested({
    url: newUrl,
    method: 'get',
    data: '',
    onStart: DATA_REQUEST,
    onSuccess: HEALTH_SCORE_RECEIVED,
    onError: DATA_REQUEST_FAILED,
  });
};
