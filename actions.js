/*
 *
 * CustomerPage actions
 *
 */

import {
  DEFAULT_ACTION,
  ACT_GET_CUSTOMER_LIST,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}
export function actGetCustomerList() {
  return {
    type: ACT_GET_CUSTOMER_LIST,
  };
}
