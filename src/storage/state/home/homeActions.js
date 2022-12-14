export const GET_HOME_ITEMS = 'GET_HOME_ITEMS';

export const getHomeItems = res => async dispatch => {
  const result = getItems(res);

  dispatch({
    type: GET_HOME_ITEMS,
    payload: result,
  });
};

const getItems = result => {
  try {
    if (
      result &&
      result.storyCategories?.length > 0 &&
      result.authors?.length > 0 &&
      result.translators?.length > 0 &&
      result.speakers?.length > 0
    ) {
      return {
        storyCategories: result.storyCategories,
        authors: result.authors,
        translators: result.translators,
        speakers: result.speakers,
      };
    }
  } catch {}

  return {
    storyCategories: [],
    authors: [],
    translators: [],
    speakers: [],
  };
};
