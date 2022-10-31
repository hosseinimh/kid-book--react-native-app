import {View} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import Lottie from 'lottie-react-native';

import * as styles from '../../../theme/style';
import {Screens} from '../../../constants';
import {Settings} from '../../../storage/models';
import {LoginService} from '../../../services';
import {getHomeItems} from '../../../storage/state/home/homeActions';

const SplashScreen = ({navigation}) => {
  const [initialized, setInitialized] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    initialize();
  }, []);

  const initialize = async () => {
    const settings = new Settings();

    await settings.updateToken(null);
    await LoginService.login();

    dispatch(getHomeItems());

    setInitialized(prev => prev + 1);
  };

  useEffect(() => {
    if (initialized === 2) {
      navigation.navigate(Screens.HOME);
    }
  }, [initialized]);

  return (
    <View style={styles.splashScreenContainer}>
      <Lottie
        source={require('../../../assets/images/splash.json')}
        autoPlay
        loop={false}
        speed={0.75}
        style={styles.splashScreenContainer}
        onAnimationFinish={() => {
          setInitialized(prev => prev + 1);
        }}
      />
    </View>
  );
};

export default SplashScreen;
