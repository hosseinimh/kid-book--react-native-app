import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';

import {useTheme} from '../../../hooks';
import * as globalStyles from '../../../theme/style';

const BaseScreen = ({children}) => {
  const {colors} = useTheme();
  const styles = StyleSheet.create({
    container: [
      globalStyles.baseScreenContainer,
      {backgroundColor: colors.sidebarBackground},
    ],
  });

  return <SafeAreaView style={styles.container}>{children}</SafeAreaView>;
};

export default BaseScreen;
