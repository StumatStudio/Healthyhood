import { createAction, createReducer } from '@reduxjs/toolkit';
import * as apiActions from './apiActions';

// Will allow us to have consistent key if we decide to save JWT to
// local storage instead of cookie
const tokenKey = 'token';

// Keep whatever user specific session data we want to use on the front end
const initialState = {
  userObj: {
    name: 'userTest',
    // etc
  },
  currentToken: '', // We can put current session token here for easy access
  isLoading: false, // Can trigger loading indicator based on flag
  lastFetch: null, // We can timestamp here to run comparisons for caching
};

/*
Action Types here are unnecessary as everything's in the same file, but
it's my preference to ensure consistency. Easily Changed if needed.
*/

// Action Types
const USERS_REQUEST = 'usersRequest';
const USERS_REQUEST_FAILED = 'usersRequestFailed';
const RECEIVED_USER = 'receivedUser';

/*
Create action is part of Reduxjs toolkit and will automatically create
a function that returns an object with a type property set to the argument
passed to createAction, and a payload property consistent with whatever
argument is passed to the created function. 
ie: usersRequest = createAction('usersRequestX') === 

function usersRequest(actionPayload) {
  return {
    type: 'usersRequestX',
    payload: actionPayload
  }
}
*/

// Action Creators
export const usersRequest = createAction(USERS_REQUEST); // no payload needed
export const usersRequestFailed = createAction(USERS_REQUEST_FAILED); // no payload needed
export const receivedUser = createAction(USERS_REQUEST_FAILED); // needs userObj as payload

/*
Create reducer is a redux toolkit function that maps function definitions
to action types and returns a single reducer for export.
Under the hood it uses a library called IMMER that will
allow us to right simpler code without having to worry about mutating state.
I believe it will also return state by default if no action types match.
*/

// Reducers
const usersReducer = createReducer(initialState, {
  [USERS_REQUEST]: usersRequestCase,
  [USERS_REQUEST_FAILED]: usersRequestFailedCase,
  [RECEIVED_USER]: receivedUserCase,
});

// Reducer Cases
function usersRequestCase(state, action) {
  state.isLoading = true;
}

function usersRequestFailedCase(state, action) {
  state.isLoading = false;
}

function receivedUserCase(state, action) {
  const { data: userInfo } = action.payload;
  state.userObj = userInfo;
  state.isLoading = false;
}

export default usersReducer;

/*
Most of the time we user action creators to return objects. We dispatch the
objects returned by action creators to our reducers to update state. Sometimes 
we want to execute logic though and we can't do that with simple action creators and
the objects they return. 
Redux Toolkit comes with a built in middleware called THUNK. THUNK allows us to 
pass functions as actions. Thunk will check the type of an action, if it is a function, 
thunk will CALL THAT FUNCTION. Below are action generators (I made up that term, it's not
real). These, when called will return functions that, when called, return a specific action
object. These action generators essentially return action creators, but allow us to pass
parameters to those action creators as payload. In this case, we can create one action
for an API call but customize the data and type based on what we give the action generator.
Confusing, but solid practice and implacations extend beyond fetch requests. 
*/

// Action Generators -- Functions for API calls

const { apiCallRequested } = apiActions;
const usersUrl = '/whateverTheBackendNeeds';
const loginUrl = '/whateverTheBackendNeeds';

// Returns function that, when called creates an API action object with the following payload
export const login = loginObj =>
  apiCallRequested({
    url: loginUrl,
    method: 'post',
    data: loginObj, // Likely needs userName and password
    onStart: USERS_REQUEST, // These three props are actions to be dispatched by our API middleware
    onSuccess: RECEIVED_USER,
    onError: USERS_REQUEST_FAILED,
  });
