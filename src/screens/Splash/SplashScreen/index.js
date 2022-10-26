import {View} from 'react-native';
import React from 'react';
import Lottie from 'lottie-react-native';

import * as styles from '../../../theme/style';
import {Screens} from '../../../constants';

const SplashScreen = ({navigation}) => {
  return (
    <View style={styles.splashScreenContainer}>
      <Lottie
        source={require('../../../assets/images/splash.json')}
        autoPlay
        loop={false}
        speed={0.5}
        style={styles.splashScreenContainer}
        onAnimationFinish={() => {
          navigation.navigate(Screens.HOME);
        }}
      />
    </View>
  );
};

export default SplashScreen;
