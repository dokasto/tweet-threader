'use strict';

import { combineReducers } from 'redux';
import tweetReducer from './tweet';
import authReducer from './auth';

export default combineReducers({
  tweetReducer,
  authReducer
});
