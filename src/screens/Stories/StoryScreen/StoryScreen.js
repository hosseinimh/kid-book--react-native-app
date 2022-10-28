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
import {SoundPlayer, utils} from '../../../utils';
import images from '../../../theme/images';

const StoryScreen = ({route, navigation}) => {
  const [item, setItem] = useState(null);
  const [audio, setAudio] = useState(null);
  const {colors} = useTheme();
  const {id} = route.params;
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
    volumeIcon: [globalStyles.backHeaderIcon, {tintColor: colors.text}],
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
    if (item === false) {
      navigation.navigate(CALLBACK_PAGE);
    }
  }, [item]);

  useEffect(() => {
    if (audio) {
      player = new SoundPlayer(`file://${audio}`);

      player.playSound();
    }
  }, [audio]);

  useEffect(() => {
    getItem();
  }, []);

  const getItem = async () => {
    let data = await StoryService.getItem(id);

    if (data) {
      data.storyItems = await StoryItemService.getItems(id);

      if (data.storyItems) {
        for (let i = 0; i < data.storyItems.length; i++) {
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
    }

    setItem(data);
  };

  const downloadMp3 = async url => {
    const filename = new Date().valueOf() + '.jpg';

    setAudio(await utils.downloadAsync(url, filename));
  };

  const renderLeftContainer = () => (
    <View>
      <TouchableOpacity
        onPress={() =>
          downloadMp3(
            'https://dl.mahanmusic.net/Song/iran/National-Anthem-of-the-Islamic-Republic-of-Iran.mp3',
          )
        }>
        <Image source={images.volume} style={styles.volumeIcon}></Image>
      </TouchableOpacity>
    </View>
  );

  return (
    <PanelScreen
      navigation={navigation}
      headerTitle={item?.title ?? ''}
      leftContainer={() => renderLeftContainer()}>
      <ScrollView showsVerticalScrollIndicator={false}>
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
                {utils.en2faDigits(item?.title) ?? ''}
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
  );
};

export default StoryScreen;
