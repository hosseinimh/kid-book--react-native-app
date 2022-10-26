import {View} from 'react-native';
import React from 'react';

import * as styles from '../../theme/style';

const Panel = ({containerStyle, children}) => {
  return (
    <View style={[styles.panelContainer, {...containerStyle}]}>{children}</View>
  );
};

export default Panel;
