import {View, Text} from 'react-native';
import React from 'react';
import Lottie from 'lottie-react-native';

import useStyles from './useStyles';

const SplashScreen = ({navigation}) => {
  const styles = useStyles();

  return (
    <View style={styles.container}>
      <Lottie
        source={require('assets/images/splash.json')}
        autoPlay
        loop={false}
        speed={0.5}
        style={styles.container}
        onAnimationFinish={() => {
          navigation.navigate('Home');
        }}
      />
    </View>
  );
};

export default SplashScreen;
