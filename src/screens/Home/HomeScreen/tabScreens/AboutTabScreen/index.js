import React from 'react';
import {Text, View, ScrollView, StyleSheet, Image} from 'react-native';

import * as globalStyles from '../../../../../theme/style';
import {useTheme} from '../../../../../hooks';
import {PanelScreen} from '../../../../';
import {aboutScreen as strings} from '../../../../../constants/strings';
import images from '../../../../../theme/images';

const AboutTabScreen = ({navigation}) => {
  const {colors} = useTheme();

  const {SIZES, FONTS} = globalStyles;

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
      alignItems: 'center',
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

  return (
    <PanelScreen headerShown={false}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <View style={styles.titleContainer}>
            <Image
              style={styles.image}
              source={images.developer}
              resizeMode="cover"
            />
            <View style={styles.nameContainer}>
              <Text style={styles.name}>{strings.developer}</Text>
            </View>
          </View>
          <View style={styles.descriptionContainer}>
            <Text style={styles.textDescription}>{strings.description}</Text>
          </View>
        </View>
      </ScrollView>
    </PanelScreen>
  );
};

export default AboutTabScreen;
