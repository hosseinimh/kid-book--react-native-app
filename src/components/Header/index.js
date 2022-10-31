import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';

import {useTheme} from '../../hooks';
import images from '../../theme/images';
import * as styles from '../../theme/style';
import {utils} from '../../utils';

const Header = ({
  navigation,
  navigateScreen,
  navigateParams,
  title,
  rightContainer,
  leftContainer,
  containerStyle = {},
}) => {
  const {colors} = useTheme();

  const goBack = () => {
    if (navigateScreen) {
      navigation.navigate(navigateScreen, {...navigateParams});
    } else {
      navigation.goBack();
    }
  };

  return (
    <View
      style={[
        styles.headerContainer,
        {
          borderBottomColor: colors.border,
          backgroundColor: colors.primary,
          ...containerStyle,
        },
      ]}>
      {rightContainer && rightContainer()}
      {!rightContainer && (
        <View>
          <TouchableOpacity onPress={goBack}>
            <Image
              source={images.arrowRight}
              style={styles.backHeaderIcon}></Image>
          </TouchableOpacity>
        </View>
      )}
      <View style={styles.headerTextContainer}>
        <Text style={[styles.headerText, {color: colors.text}]}>
          {utils.en2faDigits(title)}
        </Text>
      </View>
      {leftContainer && leftContainer()}
    </View>
  );
};

export default Header;
