import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import images from 'theme/images';
import {SoundPlayer} from 'utils';
import {useDownloader} from 'hooks';
import {HorizontalProgressBar} from 'components';

import useStyles from './useStyles';

const Header = ({navigation}) => {
  const url =
    'https://dls.music-fa.com/tagdl/downloads/Mobile%20Ringtone%20-%20Number%202%20(320).mp3';
  const filename = new Date().valueOf() + '.mp3';

  const setPath = mp3 => {
    if (mp3) {
      console.log(mp3);

      player = new SoundPlayer(mp3);

      player.playSound();
    }
  };

  const [downloadInfo, setDownloadInfo] = useState({
    downloading: false,
    progress: 0,
    completed: false,
    total: 0,
    loaded: 0,
  });
  const {download, cancelDownload} = useDownloader(
    url,
    filename,
    setDownloadInfo,
    setPath,
  );
  const styles = useStyles();

  useEffect(() => {
    return () => {
      cancelDownload();
    };
  }, []);

  const downloadMp3 = async () => {
    setDownloadInfo(downloadInfo => ({...downloadInfo, downloading: true}));
    download();
  };

  return (
    <>
      <View style={styles.headerContainer}>
        <View style={styles.rightContainer}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}>
            <Image source={images.arrowRight} style={styles.headerIcon}></Image>
          </TouchableOpacity>
        </View>
        <View>
          <Text></Text>
        </View>
        <View style={styles.leftContainer}>
          <TouchableOpacity
            disabled={downloadInfo.downloading}
            onPress={() => {
              !downloadInfo.downloading ? downloadMp3() : null;
            }}>
            {downloadInfo.downloading && (
              <ActivityIndicator size={styles.headerIcon.width} />
            )}
            {!downloadInfo.downloading && (
              <Image source={images.volume} style={styles.headerIcon}></Image>
            )}
          </TouchableOpacity>
        </View>
      </View>
      <HorizontalProgressBar
        progress={downloadInfo.progress}
        containerStyle={styles.progress}
      />
    </>
  );
};

export default Header;
