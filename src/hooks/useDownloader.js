import {useEffect} from 'react';
import {PermissionsAndroid} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';

import {downloader as strings} from '../constants/strings';

const useDownloader = (
  url,
  filename,
  dirPath = RNFetchBlob.fs.dirs.DocumentDir,
  setDownloadInfo,
  setPath,
) => {
  let dirs;
  let task;

  if (dirPath === RNFetchBlob.fs.dirs.PictureDir) {
    dirs = dirPath;
  } else {
    dirs = RNFetchBlob.fs.dirs.DocumentDir;
  }

  useEffect(() => {
    task = RNFetchBlob.config({
      path: dirs + '/' + filename,
    });

    return () => {
      cancel();
    };
  }, []);

  const checkPermission = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {title: strings.permissionTitle, message: strings.permissionMessage},
    );

    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    }

    return false;
  };

  const download = () => {
    try {
      // if (!(await checkPermission())) {
      //   console.log('no permission');

      //   return;
      // }

      task
        .fetch('GET', url, {})
        .progress((received, total) => {
          if (setDownloadInfo) {
            setDownloadInfo({
              downloading: true,
              progress: Math.floor((received * 100) / total),
              loaded: received,
              total,
              completed: false,
            });
          }
        })
        .then(res => {
          if (setDownloadInfo) {
            setDownloadInfo(info => ({
              ...info,
              downloading: false,
              progress: 100,
              completed: true,
            }));
          }
          setPath(res.path());
        })
        .catch(err => {
          console.warn('download', err);
        });
    } catch (error) {
      console.warn('download', error);
    }
  };

  const cancel = () => {
    try {
      task?.cancel(err => {});
    } catch (error) {}
  };

  return {download, cancelDownload: cancel};
};

export default useDownloader;
