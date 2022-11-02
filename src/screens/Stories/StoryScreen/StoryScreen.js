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

import * as globalStyles from '../../../theme/style';
import {useTheme} from '../../../hooks';
import {PanelScreen} from '../../';
import {StoryItemService, StoryService} from '../../../services';
import {Screens, StoryItemType} from '../../../constants';
import {utils} from '../../../utils';
import images from '../../../theme/images';
import {AudioPlayer, Tooltip} from '../../../components';
import CircularProgress from 'react-native-circular-progress-indicator';

const StoryScreen = ({route, navigation}) => {
  const [item, setItem] = useState(false);
  const [audio, setAudio] = useState(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [progress, setProgress] = useState(0);
  const {colors} = useTheme();
  const id = route?.params?.id;
  const {SIZES, FONTS} = globalStyles;
  const CALLBACK_PAGE = Screens.STORIES_LIST;

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
      width: 35,
      height: 35,
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
    txtContentContainer: {
      alignSelf: 'flex-end',
      marginVertical: 5,
      width: '100%',
    },
    txtFaContent: {...FONTS.body4, color: colors.text, textAlign: 'right'},
    txtEnContent: {...FONTS.body4, color: colors.text, textAlign: 'left'},
    imageContentContainer: {
      marginVertical: SIZES.padding1,
      width: '100%',
      borderRadius: 5,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
    },
    imageContent: {
      height: 300,
      width: '100%',
      borderRadius: 5,
    },
  });

  useEffect(() => {
    if (item === null) {
      navigation.navigate(CALLBACK_PAGE);
    }
  }, [item]);

  useEffect(() => {
    getItem();
  }, []);

  const getItem = async () => {
    let data = await StoryService.getItem(id);

    if (data) {
      data.storyItems = await StoryItemService.getItems(id);

      for (let i = 0; i < data.storyItems?.length; i++) {
        if (
          data.storyItems[i].type === StoryItemType.IMAGE &&
          data.storyItems[i].content
        ) {
          const {width, height} = await utils.getImageSize(
            `file://${data.storyItems[i].content}`,
          );
          const newWidth = SIZES.width - SIZES.padding1 - SIZES.padding1;
          const newHeight = (height / width) * newWidth;

          data.storyItems[i].width = newWidth;
          data.storyItems[i].height = newHeight;
        }
      }
    }

    setItem(data);

    if (data?.audio) {
      setAudio(data.audio);
    }
  };

  const getAudio = async () => {
    if (!item.audio) {
      setShowTooltip(true);
      setDownloading(true);

      const result = await StoryService.downloadAudioItem(item, onProgress);

      setDownloading(false);

      if (result) {
        setAudio(result);
      }
    }
  };

  const onProgress = result => {
    console.log(result);
    setProgress(parseInt(result.progress));
  };

  const renderLeftContainer = () => (
    <View>
      <TouchableOpacity onPress={() => getAudio()}>
        {downloading && (
          <View style={styles.progressContainer}>
            <CircularProgress
              radius={15}
              value={progress}
              inActiveStrokeColor={colors.border}
              inActiveStrokeOpacity={0.2}
              showProgressValue={false}
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
        text={'12 سیتا یستنا سنیتا ستیا 3 KB'}
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
          style={{marginBottom: audio ? 125 : 0}}>
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
              {item?.storyItems?.map((item, index) => (
                <React.Fragment key={index}>
                  {item.type === StoryItemType.TEXT_EN && (
                    <View style={styles.txtContentContainer}>
                      <Text style={styles.txtEnContent}>
                        {item?.content ?? ''}
                      </Text>
                    </View>
                  )}
                  {item.type === StoryItemType.TEXT_FA && (
                    <View style={styles.txtContentContainer}>
                      <Text style={styles.txtFaContent}>
                        {item?.content ? utils.en2faDigits(item.content) : ''}
                      </Text>
                    </View>
                  )}
                  {item.type === StoryItemType.IMAGE && item?.content && (
                    <View style={styles.imageContentContainer}>
                      <Image
                        style={{
                          ...styles.imageContent,
                          width: item.width,
                          height: item.height,
                        }}
                        source={{
                          uri: `file://${item?.content}`,
                        }}
                        resizeMode="stretch"
                      />
                    </View>
                  )}
                </React.Fragment>
              ))}
            </View>
          </View>
        </ScrollView>
      </PanelScreen>
      {audio && (
        <View>
          <AudioPlayer filename={audio} containerStyle={{}} />
        </View>
      )}
    </>
  );
};

export default StoryScreen;
