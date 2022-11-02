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
import {translatorScreen as strings} from '../../../constants/strings';
import {TranslatorService} from '../../../services';
import {Screens} from '../../../constants';
import {utils} from '../../../utils';

const TranslatorScreen = ({route, navigation}) => {
  const [item, setItem] = useState(null);
  const {colors} = useTheme();
  const id = route?.params?.id;
  const {SIZES, FONTS} = globalStyles;
  const CALLBACK_PAGE = Screens.TRANSLATORS_LIST;

  const styles = StyleSheet.create({
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      flex: 1,
      paddingHorizontal: SIZES.padding3,
      paddingBottom: SIZES.padding3,
    },
    titleContainer: {
      display: 'flex',
      flexDirection: 'row-reverse',
      width: '100%',
      marginBottom: SIZES.padding2,
    },
    image: {
      width: 100,
      height: 100,
      borderRadius: 5,
      borderWidth: 1,
      borderColor: colors.border,
    },
    nameContainer: {
      marginHorizontal: SIZES.padding3,
    },
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
    setItem(await TranslatorService.getItem(id));
  };

  return (
    <PanelScreen navigation={navigation} headerTitle={strings._headerTitle}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <View style={styles.titleContainer}>
            {item?.avatar && (
              <Image
                style={styles.image}
                source={{
                  uri: `file://${item?.avatar}`,
                }}
                resizeMode="cover"
              />
            )}
            <View style={styles.nameContainer}>
              <Text style={styles.name}>
                {item && utils.en2faDigits(`${item?.name} ${item?.family}`)}
              </Text>
            </View>
          </View>
          <View style={styles.descriptionContainer}>
            <Text style={styles.textDescription}>
              {utils.en2faDigits(item?.description)}
            </Text>
          </View>
        </View>
      </ScrollView>
    </PanelScreen>
  );
};

export default TranslatorScreen;
