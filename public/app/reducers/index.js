'use strict';

import { combineReducers } from 'redux';
import authReducer from './auth';
import forms from './forms';

export default combineReducers({
	forms,
  authReducer
});
