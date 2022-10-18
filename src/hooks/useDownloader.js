import {useEffect} from 'react';
import {PermissionsAndroid} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';

import {downloader as strings} from 'constants/strings';

const useDownloader = (url, filename, setDownloadInfo, setPath) => {
  // const dirs = RNFetchBlob.fs.dirs;
  let task;

  useEffect(() => {
    // task = RNFetchBlob.config({
    //   path: dirs.DocumentDir + '/' + filename,
    // }).fetch('GET', url, {});

    return () => {
      // cancel();
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
      if (!checkPermission()) {
        console.log('no permission');

        return;
      }

      const dirs = RNFetchBlob.fs.dirs;
      RNFetchBlob.config({
        path: dirs.DocumentDir + '/' + filename,
      })
        .fetch('GET', url, {})
        .progress((received, total) => {
          setDownloadInfo({
            downloading: true,
            progress: Math.floor((received * 100) / total),
            loaded: received,
            total,
            completed: false,
          });
        })
        .then(res => {
          setDownloadInfo(info => ({
            ...info,
            downloading: false,
            progress: 100,
            completed: true,
          }));
          setPath(res.path());
        })
        .catch(err => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const cancel = () => {
    // try {
    //   task?.cancel(err => {});
    //   console.log('cancel');
    // } catch (error) {}
  };

  return {download, cancelDownload: cancel};
};

export default useDownloader;
