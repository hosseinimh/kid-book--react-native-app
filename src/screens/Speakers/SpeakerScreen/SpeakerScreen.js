import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  Image,
  ScrollView,
  StyleSheet,
  ImageBackground,
} from 'react-native';

import * as globalStyles from '../../../theme/style';
import {useTheme} from '../../../hooks';
import {PanelScreen} from '../../';
import {speakerScreen as strings} from '../../../constants/strings';
import {SpeakerService} from '../../../services';
import {Screens} from '../../../constants';

const SpeakerScreen = ({route, navigation}) => {
  const [item, setItem] = useState(null);
  const {colors} = useTheme();
  const {id} = route.params;
  const {SIZES, FONTS} = globalStyles;
  const CALLBACK_PAGE = Screens.SPEAKERS_LIST;

  const styles = StyleSheet.create({
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      flex: 1,
      paddingHorizontal: SIZES.padding3,
      paddingVertical: SIZES.padding3,
    },
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
    nameContainer: {marginTop: SIZES.padding2},
    name: {...FONTS.h2, color: colors.text},
    descriptionContainer: {flex: 1, alignSelf: 'flex-end'},
    textDescription: {...FONTS.body4, color: colors.text, textAlign: 'right'},
  });

  useEffect(() => {
    if (item === false) {
      navigation.navigate(CALLBACK_PAGE);
    }
  }, [item]);

  useEffect(() => {
    getItem();
  }, []);

  const getItem = async () => {
    setItem(await SpeakerService.getItem(id));
  };

  return (
    <PanelScreen navigation={navigation} headerTitle={strings._headerTitle}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          {item?.avatar && (
            <>
              <ImageBackground
                style={styles.imageBackground}
                source={{
                  uri: `file://${item?.avatar}`,
                }}></ImageBackground>
              <Image
                style={styles.image}
                source={{
                  uri: `file://${item?.avatar}`,
                }}
                resizeMode="cover"
              />
            </>
          )}
          <View style={styles.nameContainer}>
            <Text style={styles.name}>
              {item && `${item?.name} ${item?.family}`}
            </Text>
          </View>
          <View style={styles.descriptionContainer}>
            <Text style={styles.textDescription}>{item?.description}</Text>
          </View>
        </View>
      </ScrollView>
    </PanelScreen>
  );
};

export default SpeakerScreen;
