const appConfig = require('../../app-config.json');
const {serverUrl} = appConfig;

export const SERVER_URL = `${serverUrl}/app`;

export const DASHBOARD_API_URLS = {
  FETCH_ITEMS: `${SERVER_URL}/dashboard`,
  LOGIN: `${SERVER_URL}/users/login`,
  GET_TOKEN: `${SERVER_URL}/users/get_token`,
  FETCH_USER: `${SERVER_URL}/users/show`,
};

export const USERS_API_URLS = {
  SIGN_UP: `${SERVER_URL}/users/sign_up`,
  LOGIN: `${SERVER_URL}/users/login`,
  GET_TOKEN: `${SERVER_URL}/users/get_token`,
  FETCH_USER: `${SERVER_URL}/users/show`,
};

export const STORY_CATEGORIES_API_URLS = {
  FETCH_STORY_CATEGORY: `${SERVER_URL}/story_categories/show`,
  FETCH_STORY_CATEGORIES: `${SERVER_URL}/story_categories`,
};

export const STORIES_API_URLS = {
  FETCH_STORY: `${SERVER_URL}/stories/show`,
  FETCH_STORIES: `${SERVER_URL}/stories`,
};

export const STORY_ITEMS_API_URLS = {
  FETCH_STORY_ITEM: `${SERVER_URL}/story_items/show`,
  FETCH_STORY_ITEMS: `${SERVER_URL}/story_items`,
};

export const AUTHORS_API_URLS = {
  FETCH_AUTHOR: `${SERVER_URL}/authors/show`,
  FETCH_AUTHORS: `${SERVER_URL}/authors`,
};

export const TRANSLATORS_API_URLS = {
  FETCH_TRANSLATOR: `${SERVER_URL}/translators/show`,
  FETCH_TRANSLATORS: `${SERVER_URL}/translators`,
};

export const SPEAKERS_API_URLS = {
  FETCH_SPEAKER: `${SERVER_URL}/speakers/show`,
  FETCH_SPEAKERS: `${SERVER_URL}/speakers`,
};
