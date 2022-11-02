import * as homeActions from './homeActions';

const initialState = {
  storyCategories: [],
  authors: [],
  translators: [],
  speakers: [],
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
