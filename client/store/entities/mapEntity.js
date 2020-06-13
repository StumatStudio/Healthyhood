import { createAction, createReducer } from '@reduxjs/toolkit';
import * as apiActions from './apiActions';

const initialState = {
  mapData: {
    location: 'mapTest',
  },
  isLoading: false,
  lastFetch: null,
};

// Action Types
const MAP_REQUEST = 'mapRequest';
const MAP_REQUEST_FAILED = 'mapRequestFailed';
const MAP_RECEIVED = 'mapReceived';

// Action Creators
export const mapRequest = createAction(MAP_REQUEST); // No payload, sets isLoading true
export const mapRequestFailed = createAction(MAP_REQUEST_FAILED); // No payload sets loading false
export const mapReceived = createAction(); // requires mapData as payload

// Reducers
const mapReducer = createReducer(initialState, {
  [MAP_REQUEST]: mapRequestCase,
  [MAP_REQUEST_FAILED]: mapRequestFailedCase,
  [MAP_RECEIVED]: mapReceivedCase,
});

// Reducer Cases
function mapRequestCase(state, action) {
  state.isLoading = true;
}

function mapRequestFailedCase(state, action) {
  state.isLoading = false;
}

function mapReceivedCase(state, action) {
  const { data: mapData } = action.payload;
  state.mapData = mapData;
  state.isLoading = false;
}

export default mapReducer;

// Action Generators
const { apiCallRequested } = apiActions;
const mapUrl = 'whateverBackendNeeds'

export const getMapData = () =>
  apiCallRequested({
    url: mapUrl,
    method: 'get',
    data: '',
    onStart: MAP_REQUEST,
    onSuccess: MAP_RECEIVED,
    onError: MAP_REQUEST_FAILED,
  });