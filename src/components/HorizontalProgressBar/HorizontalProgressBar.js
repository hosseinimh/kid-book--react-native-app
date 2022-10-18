import React from 'react';
import {View, Text} from 'react-native';

import useStyles from './useStyles';

const HorizontalProgressBar = ({progress = 0, containerStyle = {}}) => {
  const styles = useStyles();

  return (
    <View style={[styles.container, {...containerStyle}]}>
      <View
        style={[
          styles.progress,
          {
            width: `${progress === 100 ? 0 : progress}%`,
          },
        ]}></View>
    </View>
  );
};

export default HorizontalProgressBar;
