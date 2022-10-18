import {TABS} from '../constants';
import {TAB_SCREENS} from '../constants';
import {tabScreens, tabLinks} from '../constants/strings';

const tabScreenTitle = tabScreen => {
  let title = tabScreens.home;

  switch (tabScreen) {
    case TAB_SCREENS.Home:
      title = tabScreens.home;

      break;
    case TAB_SCREENS.About:
      title = tabScreens.about;

      break;
    default:
      break;
  }

  return title;
};

const tabText = tab => {
  let text = tabLinks.home;

  switch (tab) {
    case TABS.Home:
      text = tabLinks.home;

      break;
    case TABS.Theme:
      text = tabLinks.theme;

      break;
    case TABS.About:
      text = tabLinks.about;

      break;
    default:
      break;
  }

  return text;
};

const getDateTime = () => {
  let today = new Date();
  let date =
    today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  let time =
    today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();

  return date + ' ' + time;
};

const isJsonString = str => {
  try {
    str = JSON.stringify(str);
    str = str
      .replace(/\\n/g, '\\n')
      .replace(/\\'/g, "\\'")
      .replace(/\\"/g, '\\"')
      .replace(/\\&/g, '\\&')
      .replace(/\\r/g, '\\r')
      .replace(/\\t/g, '\\t')
      .replace(/\\b/g, '\\b')
      .replace(/\\f/g, '\\f');
    str = str.replace(/[\u0000-\u0019]+/g, '');
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
};

const en2faDigits = s =>
  s
    ?.toString()
    .replace(/[0-9]/g, w => String.fromCharCode(w.charCodeAt(0) + 1728));

const utils = {
  tabScreenTitle,
  tabText,
  getDateTime,
  isJsonString,
  en2faDigits,
};

export default utils;
