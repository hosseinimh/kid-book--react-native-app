export const SET_TAB_ACTION = 'SET_TAB_ACTION';
export const SET_LOADING_ACTION = 'SET_LOADING_ACTION';
export const SET_THEME_ACTION = 'SET_THEME_ACTION';

export const setTabAction = tab => async (dispatch, getState) => {
  dispatch({type: SET_TAB_ACTION, payload: tab});
};

export const setLoadingAction = loading => async (dispatch, getState) => {
  dispatch({
    type: SET_LOADING_ACTION,
    payload: {loading},
  });
};

export const setThemeAction = theme => async (dispatch, getState) => {
  dispatch({type: SET_THEME_ACTION, payload: theme});
};
