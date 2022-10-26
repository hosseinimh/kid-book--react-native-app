import {View, Text} from 'react-native';
import React from 'react';

import * as styles from '../../theme/style';
import {useTheme} from '../../hooks';

const Box = ({containerStyle, title, rightContainer = null, children}) => {
  const {colors} = useTheme();

  return (
    <View style={[styles.boxContainer, {...containerStyle}]}>
      <View style={styles.boxHeaderContainer}>
        {title && (
          <View style={styles.boxTitleContainer}>
            <Text style={[styles.boxTitle, {color: colors.text}]}>{title}</Text>
          </View>
        )}
        {rightContainer && rightContainer()}
      </View>
      <View style={styles.boxContent}>{children}</View>
    </View>
  );
};

export default Box;
