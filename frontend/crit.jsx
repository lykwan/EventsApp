import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/store';
import Root from './components/root';

import { GroupActions } from './actions/group_actions';

import { createGroup } from './util/group_api_util';

document.addEventListener('DOMContentLoaded', () => {
  let preloadedState = {};
  if (window.currentUser) {
    preloadedState = { session: { currentUser: window.currentUser,
                                  errors: [] }};
  }

  const store = configureStore(preloadedState);
  window.store = store; //DElELTE
  const rootEl = document.getElementById('root');
  ReactDOM.render(<Root store={ store } />, rootEl);
  window.GroupActions = GroupActions;

  window.createGroup = createGroup;
});
