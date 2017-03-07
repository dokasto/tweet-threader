'use strict';

import { combineReducers } from 'redux';
import forms from './forms';
import notifications from './notifications';

export default combineReducers({
  forms,
  notifications
});
