import { createSelector } from 'reselect';

/**
 * Direct selector to the customerPage state domain
 */
const selectCustomerPageDomain = (state) => state.get('customerPage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by CustomerPage
 */

const makeSelectCustomerPage = () => createSelector(
  selectCustomerPageDomain,
  (substate) => substate.toJS()
);
const SelectCustomerPage = () => createSelector(
  selectCustomerPageDomain,
  (substate) => substate.get('').toJS()
);

export default makeSelectCustomerPage;
export {
  selectCustomerPageDomain,
  SelectCustomerPage,
  
};
