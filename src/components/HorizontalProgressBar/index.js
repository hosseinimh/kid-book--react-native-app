import React from 'react';
import {View} from 'react-native';

import {useTheme} from '../../hooks';
import * as styles from '../../theme/style';

const HorizontalProgressBar = ({progress = 0, containerStyle = {}}) => {
  const {colors} = useTheme();

  return (
    <View style={[styles.progressBarContainer, {...containerStyle}]}>
      <View
        style={[
          styles.progress,
          {
            color: colors.success,
            width: `${progress === 100 ? 0 : progress}%`,
          },
        ]}></View>
    </View>
  );
};

export default HorizontalProgressBar;
