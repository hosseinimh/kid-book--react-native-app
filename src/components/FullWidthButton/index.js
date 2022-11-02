import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';

import * as globalStyles from '../../theme/style';
import {useTheme} from '../../hooks';

const FullWidthButton = ({text, onPress}) => {
  const {colors} = useTheme();

  return (
    <TouchableOpacity
      style={globalStyles.fullWidthButtonConainer}
      onPress={onPress}>
      <View
        style={[
          globalStyles.fullWidthButtonWrapper,
          {backgroundColor: colors.sidebarBackground},
        ]}>
        <Text
          style={[
            globalStyles.fullWidthButtonText,
            {color: colors.sidebarText},
          ]}>
          {text}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default FullWidthButton;
