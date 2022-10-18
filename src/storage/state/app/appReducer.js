import * as appActions from './appActions';

const initialState = {
  settings: null,
  user: null,
  serverToken: null,
};

const appReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case appActions.SET_SETTINGS:
      return {...state, settings: payload};
    case appActions.SET_USER:
      return {
        ...state,
        user: payload,
      };
    case appActions.SET_SERVER_TOKEN:
      return {
        ...state,
        serverToken: payload,
      };
    default:
      return state;
  }
};

export default appReducer;
