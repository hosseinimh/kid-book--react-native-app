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
      height: 200,
      opacity: 0.1,
      zIndex: 1,
    },
    image: {
      width: 200,
      height: 200,
      borderRadius: 100,
      position: 'absolute',
      zIndex: 2,
      opacity: 1,
    },
    titleContainer: {marginTop: SIZES.padding2},
    title: {...FONTS.h2, color: colors.text},
    txtContentContainer: {
      flex: 1,
      alignSelf: 'flex-end',
      marginVertical: 5,
    },
    txtContent: {...FONTS.body4, color: colors.text, textAlign: 'right'},
    imageContentContainer: {
      marginVertical: 5,
      width: '100%',
    },
    imageContent: {
      height: 300,
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
        <View style={styles.container}>
          {item?.image && (
            <ImageBackground
              style={styles.imageBackground}
              source={{
                uri: `file://${item?.image}`,
              }}></ImageBackground>
          )}
          {item?.thumbnail && (
            <Image
              style={styles.image}
              source={{
                uri: `file://${item?.thumbnail}`,
              }}
              resizeMode="cover"
            />
          )}
          <View style={styles.titleContainer}>
            <Text style={styles.title}>
              {utils.en2faDigits(item?.title) ?? ''}
            </Text>
          </View>
          {item?.storyItems?.map((item, index) => (
            <React.Fragment key={index}>
              {(item.type === StoryItemType.TEXT_EN ||
                item.type === StoryItemType.TEXT_FA) && (
                <View style={styles.txtContentContainer}>
                  <Text style={styles.txtContent}>sss</Text>
                </View>
              )}
              {item.type === StoryItemType.IMAGE && item?.content && (
                <View style={styles.imageContentContainer}>
                  <Image
                    style={styles.imageContent}
                    source={{
                      uri: `file://${item?.content}`,
                    }}
                    resizeMode="contain"
                  />
                </View>
              )}
            </React.Fragment>
          ))}
        </View>
      </ScrollView>
    </PanelScreen>
  );
};

export default StoryScreen;
