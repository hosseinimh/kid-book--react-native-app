import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  Image,
  ScrollView,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import CircularProgress from 'react-native-circular-progress-indicator';

import * as globalStyles from '../../../theme/style';
import {useTheme} from '../../../hooks';
import {PanelScreen} from '../../';
import {StoryItemService, StoryService} from '../../../services';
import {Screens} from '../../../constants';
import {utils} from '../../../utils';
import images from '../../../theme/images';
import {AudioPlayer, Tooltip} from '../../../components';
import StoryItem from './StoryItem';

const StoryScreen = ({route, navigation}) => {
  const [item, setItem] = useState(null);
  const [storyItems, setStoryItems] = useState([]);
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipText, setTooltipText] = useState('');
  const [downloading, setDownloading] = useState(false);
  const [progress, setProgress] = useState(0);
  const {colors} = useTheme();
  const {SIZES, FONTS} = globalStyles;
  const id = route?.params?.id;

  const styles = StyleSheet.create({
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      flex: 1,
      paddingHorizontal: SIZES.padding3,
      paddingVertical: SIZES.padding3,
    },
    soundTrackIcon: [
      globalStyles.backHeaderIcon,
      {width: 30, height: 30, tintColor: colors.text},
    ],
    progressContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 30,
      height: 30,
    },
    imageBackground: {
      width: '100%',
      height: 150,
      opacity: 0.4,
    },
    image: {
      width: 100,
      height: 100,
      borderRadius: 5,
      position: 'absolute',
      zIndex: 2,
      opacity: 1,
      top: -100,
      right: 20,
      borderWidth: 1,
      borderColor: colors.border,
    },
    titleContainer: {marginVertical: SIZES.padding1},
    title: {...FONTS.h2, color: colors.text},
  });

  useEffect(() => {
    if (item === false) {
      navigation.navigate(Screens.HOME);
    }
  }, [item]);

  useEffect(() => {
    getItem();
  }, []);

  const getItem = async () => {
    let result = await StoryService.getItem(id);

    if (result) {
      if (!result.thumbnail) {
        await StoryService.downloadThumbnail(result);
      }

      if (!result.image) {
        await StoryService.downloadImage(result);
      }

      if (!result.thumbnail || !result.image) {
        result = await StoryService.getItem(id);
      }

      setStoryItems(await StoryItemService.getItems(id));
    }

    setItem(result ?? false);
  };

  const getAudio = async () => {
    if (!item.audio) {
      setProgress(0);
      setTooltipText('');
      setDownloading(true);

      const result = await StoryService.downloadAudio(
        item,
        onBegin,
        onProgress,
      );

      setDownloading(false);

      if (result) {
        setItem(await StoryService.getItem(id));
      }
    }
  };

  const onBegin = result => {
    setShowTooltip(true);
    setTooltipText(result?.contentLength);
  };

  const onProgress = result => {
    setProgress(parseInt(result.percent));
  };

  const renderLeftContainer = () => (
    <View>
      <TouchableOpacity onPress={() => getAudio()}>
        {downloading && (
          <View style={styles.progressContainer}>
            <CircularProgress
              maxValue={100}
              radius={15}
              value={progress}
              inActiveStrokeColor={colors.border}
              inActiveStrokeOpacity={0.2}
              stroke
              showProgressValue={false}
              inActiveStrokeWidth={5}
              activeStrokeWidth={5}
            />
          </View>
        )}
        {!downloading && (
          <Image
            source={images.soundtrack}
            style={styles.soundTrackIcon}></Image>
        )}
      </TouchableOpacity>
    </View>
  );

  return (
    <>
      <Tooltip
        text={utils.formatBytes(tooltipText)}
        top={35}
        left={8}
        show={showTooltip}
        onFinished={() => setShowTooltip(false)}
      />
      <PanelScreen
        navigation={navigation}
        headerTitle={item?.title ?? ''}
        leftContainer={() => renderLeftContainer()}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{marginBottom: item?.audio ? 125 : 0}}>
          <View>
            {item?.image && (
              <ImageBackground
                style={styles.imageBackground}
                source={{
                  uri: `file://${item?.image}`,
                }}
                resizeMode="stretch"></ImageBackground>
            )}
            <View style={styles.container}>
              {item?.thumbnail && (
                <Image
                  style={styles.image}
                  source={{
                    uri: `file://${item?.thumbnail}`,
                  }}
                  resizeMode="center"
                />
              )}
              <View style={styles.titleContainer}>
                <Text style={styles.title}>
                  {item?.title ? utils.en2faDigits(item?.title) : ''}
                </Text>
              </View>
              {storyItems?.map(item => (
                <StoryItem key={item.id} storyItem={item} />
              ))}
            </View>
          </View>
        </ScrollView>
      </PanelScreen>
      {item?.audio && (
        <View>
          <AudioPlayer filename={item?.audio} containerStyle={{}} />
        </View>
      )}
    </>
  );
};

export default StoryScreen;
