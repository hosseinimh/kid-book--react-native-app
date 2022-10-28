import {Image, PermissionsAndroid} from 'react-native';
import RNFS from 'react-native-fs';

import {TABS} from '../constants';
import {TAB_SCREENS} from '../constants';
import {tabScreens, tabLinks} from '../constants/strings';
import {downloader as downloaderStrings} from '../constants/strings';

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

const checkPermission = async () => {
  const granted = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    {
      title: downloaderStrings.permissionTitle,
      message: downloaderStrings.permissionMessage,
    },
  );

  if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    return true;
  }

  return false;
};

const downloadAsync = async (url, filename) => {
  let i = 0;
  let result = null;

  do {
    i++;
    result = await handleDownloadAsync(url, filename);
  } while (i < 10 && !result);

  return result;
};

const handleDownloadAsync = async (url, filename) => {
  try {
    filename = `${RNFS.DocumentDirectoryPath}/${filename}`;
    const result = await RNFS.downloadFile({
      fromUrl: url,
      toFile: filename,
    }).promise;

    if (result && result.bytesWritten > 0 && result.statusCode === 200) {
      return filename;
    }
  } catch {}

  return null;
};

const downloadImage = async url => {
  const filename = new Date().valueOf() + '.jpg';

  return await downloadAsync(url, filename);
};

const deleteFile = async filename => {
  try {
    filename = `${RNFS.DocumentDirectoryPath}/${filename}`;
    let result = await RNFS.exists(filename);

    if (result) {
      return await RNFS.unlink(filename);
    }
  } catch {}

  return false;
};

const getImageSize = uri =>
  new Promise(resolve => {
    Image.getSize(
      uri,
      (width, height) => resolve({width, height}),
      () => {
        resolve({width: '100%', height: 300});
      },
    );
  });

const prepareStr = (text, defaultValue = '""') =>
  text ? `"${text}"` : defaultValue;

const utils = {
  tabScreenTitle,
  tabText,
  getDateTime,
  isJsonString,
  en2faDigits,
  downloadAsync,
  deleteFile,
  downloadImage,
  getImageSize,
  prepareStr,
};

export default utils;
