import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';

import * as styles from '../../theme/style';
import {useTheme} from '../../hooks';

const FullWidthButton = ({text, onPress}) => {
  const {colors} = useTheme();

  return (
    <TouchableOpacity style={styles.fullWidthButtonConainer} onPress={onPress}>
      <View
        style={[
          styles.fullWidthButtonWrapper,
          {backgroundColor: colors.sidebarBackground},
        ]}>
        <Text style={[styles.fullWidthButtonText, {color: colors.sidebarText}]}>
          {text}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default FullWidthButton;
