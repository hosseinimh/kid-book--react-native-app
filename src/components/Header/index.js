import React from 'react';
import {Text, View} from 'react-native';

import * as styles from '../../theme/style';

const Header = ({navigation, title, rightContainer}) => {
  return (
    <View style={styles.headerContainer}>
      {rightContainer && rightContainer()}
      <View style={styles.headerTextContainer}>
        <Text style={styles.headerText}>{title}</Text>
      </View>
    </View>
  );
};

export default Header;
