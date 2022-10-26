import {ServerConnectionStatus} from '../../../constants';

import * as appActions from './appActions';

const initialState = {
  serverConnectionStatus: ServerConnectionStatus.NOT_STARTED,
};

const appReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case appActions.SET_SERVER_CONNECTION_STATUS:
      return {...state, serverConnectionStatus: payload};
    default:
      return state;
  }
};

export default appReducer;
