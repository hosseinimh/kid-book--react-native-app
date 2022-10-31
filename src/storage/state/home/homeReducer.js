import * as homeActions from './homeActions';

const initialState = {
  storyCategories: null,
  authors: null,
  translators: null,
  speakers: null,
};

const homeReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case homeActions.GET_HOME_ITEMS:
      return {
        ...state,
        storyCategories: payload.storyCategories,
        authors: payload.authors,
        translators: payload.translators,
        speakers: payload.speakers,
      };
    default:
      return state;
  }
};

export default homeReducer;
