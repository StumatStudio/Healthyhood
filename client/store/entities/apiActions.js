import { createAction } from '@reduxjs/toolkit';

// Token Header -- Any Module that needs API will now know the token key if we don't use cookies
export const tokenHeader = 'x-auth-token';

// Action Types
const API_CALL_REQUESTED = 'apiCallRequested';
const API_CALL_SUCCESS = 'apiCallSuccess';
const API_CALL_FAILED = 'apiCallFailed';

// Action Creators
export const apiCallRequested = createAction(API_CALL_REQUESTED);
export const apiCallSuccess = createAction(API_CALL_SUCCESS);
export const apiCallFailed = createAction(API_CALL_FAILED);
