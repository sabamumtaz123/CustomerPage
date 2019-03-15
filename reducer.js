/*
 *
 * CustomerPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  ACT_GET_CUSTOMER_LIST,
} from './constants';

const initialState = fromJS({
});

function customerPageReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case ACT_GET_CUSTOMER_LIST:
      return state;
    default:
      return state;
  }
}

export default customerPageReducer;
