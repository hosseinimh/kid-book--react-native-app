import {Image, PermissionsAndroid} from 'react-native';
import RNFS, {stat} from 'react-native-fs';

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
    case TAB_SCREENS.Settings:
      title = tabScreens.settings;

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
    case TABS.Settings:
      text = tabLinks.settings;

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

const secondsToTimespan = (seconds, end = 22) =>
  new Date(seconds * 1000)?.toISOString()?.substring(14, end);

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

const downloadAsync = async (url, filename, onBegin, onProgress) => {
  let i = 0;
  let result = null;

  do {
    i++;
    result = await handleDownloadAsync(url, filename, onBegin, onProgress);
  } while (i < 10 && !result);

  return result;
};

const handleDownloadAsync = async (
  url,
  filename,
  onBegin = null,
  onProgress = null,
) => {
  try {
    let result;
    filename = `${RNFS.DocumentDirectoryPath}/${filename}`;

    if (onProgress && typeof onProgress === 'function') {
      result = await RNFS.downloadFile({
        fromUrl: url,
        toFile: filename,
        begin: res => onBegin(res),
        progress: res => {
          onProgress({
            percent: parseInt((res.bytesWritten / res.contentLength) * 100),
          });
        },
      }).promise;
    } else {
      result = await RNFS.downloadFile({
        fromUrl: url,
        toFile: filename,
      }).promise;
    }

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

const downloadAudio = async (url, onBegin, onProgress) => {
  const filename = new Date().valueOf() + '.mp3';

  return await downloadAsync(url, filename, onBegin, onProgress);
};

const fileExists = async filename => {
  try {
    return await RNFS.exists(filename);
  } catch {}

  return false;
};

const deleteFile = async filename => {
  try {
    let result = await RNFS.exists(filename);

    if (result) {
      return await RNFS.unlink(filename);
    }
  } catch {}

  return false;
};

const fileInfo = async filename => {
  try {
    const result = await stat(filename);

    return result.size;
  } catch {}

  return 0;
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

const formatBytes = (bytes, decimals = 2) => {
  if (!+bytes) {
    return '0 Bytes';
  }

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
};

const uniqueArray = items => {
  try {
    return items.filter(
      (value, index, array) => array.indexOf(value) === index,
    );
  } catch {}

  return [];
};

const utils = {
  tabScreenTitle,
  tabText,
  getDateTime,
  isJsonString,
  en2faDigits,
  secondsToTimespan,
  downloadAsync,
  fileExists,
  deleteFile,
  fileInfo,
  downloadImage,
  downloadAudio,
  getImageSize,
  prepareStr,
  formatBytes,
  uniqueArray,
};

export default utils;
