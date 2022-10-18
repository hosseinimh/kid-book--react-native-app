import React, {useEffect} from 'react';
import {BackHandler, SafeAreaView} from 'react-native';

import {useTheme} from 'hooks';

import useStyles from './useStyles';

const BaseScreen = ({children, homeScreen = false}) => {
  let {container} = useStyles();

  if (!homeScreen) {
    const {colors} = useTheme();

    container = {
      ...container,
      backgroundColor: colors.background,
    };
  }

  return <SafeAreaView style={container}>{children}</SafeAreaView>;
};

export default BaseScreen;
