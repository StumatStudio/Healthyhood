import axios from 'axios';
import * as apiActions from '../entities/apiActions';

/*
Boilerplate API Call action payload:
{
  url,
  method,
  data,
  onStart,
  onSuccess,
  onError
}
*/

/* 
If we're here, THUNK has called an action creator that created an 
API action. I believe middleware are functions that redux automatically
runs under the hood passing certain parameters via currying. These are run
after an action is dispatched and before reducers are called. Each middleware
NEEDS three parameters, the a synthetic store obj (with dispatch and getstate methods),
the next middle/reducer to be called, AND the action that was dispached
*/

const apiCall = ({ dispatch, getState }) => next => async action => {
  // Call next middleware / reducer if not an api action
  if (action.type !== apiActions.apiCallRequested.type) return next(action);

  // If we're here we dispatched an apiCAllRequestedAction
  const baseUrl = process.env.BASE_URL;
  const { apiCallFailed, apiCallRequested, apiCallSuccess } = apiActions;
  const { url, method, data, onStart, onSuccess, onError } = action.payload;

  // Send current action through to DevTools so we can track it if needed
  next(action);

  // Dispatch specified API call start action
  dispatch({ type: onStart });

  // Execute API call
  try {
    console.log('Making API call');
    const response = await axios.request({
      baseURL: baseUrl,
      url,
      method,
      data,
    })

    // If we're here, the call was a success.
    // For Dev Tools to track success
    dispatch(apiCallSuccess(response.data)); // axios returns an object with a data prop

    // Pass succcessful resonse data to slice success action for updating state
    if (onSuccess)
      dispatch({
        type: onSuccess,
        payload: { data: response.data, headers: response.headers },
      });
  } catch (err) {
    // For Dev tools / displaying error to client
    dispatch(apiCallFailed(err.response.data)); // This syntax is axios specific

    // To notify slice if onError specified
    if (onError) dispatch({ type: onError, payload: err.response.data });
  }
};

export default apiCall;
