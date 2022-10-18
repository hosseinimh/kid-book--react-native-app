export const SET_SETTINGS = 'SET_SETTINGS';
export const SET_USER = 'SET_USER';
export const SET_SERVER_TOKEN = 'SET_SERVER_TOKEN';

export const setSettings = settings => async dispatch => {
  dispatch({type: SET_SETTINGS, payload: settings});
};

export const setUser = user => async dispatch => {
  dispatch({type: SET_USER, payload: user});
};

export const setServerToken = serverToken => async dispatch => {
  dispatch({type: SET_SERVER_TOKEN, payload: serverToken});
};
