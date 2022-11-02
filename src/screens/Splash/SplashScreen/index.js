import {View} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import Lottie from 'lottie-react-native';

import * as styles from '../../../theme/style';
import {Settings} from '../../../storage/models';
import {DashboardService, LoginService} from '../../../services';
import {getHomeItems} from '../../../storage/state/home/homeActions';
import {Screens} from '../../../constants';

const SplashScreen = ({navigation}) => {
  const [initialized, setInitialized] = useState(false);
  const [finished, setFinished] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    initialize();
  }, []);

  const initialize = async () => {
    const settings = new Settings();

    await settings.createTable();
    await settings.updateToken(null);
    await LoginService.login();

    dispatch(getHomeItems(await DashboardService.getItems()));

    setInitialized(true);
  };

  useEffect(() => {
    if (initialized && finished) {
      navigation.navigate(Screens.HOME);
    }
  }, [initialized, finished]);

  return (
    <View style={styles.splashScreenContainer}>
      <Lottie
        source={require('../../../assets/images/splash.json')}
        autoPlay
        loop={false}
        speed={0.75}
        style={styles.splashScreenContainer}
        onAnimationFinish={() => {
          setFinished(true);
        }}
      />
    </View>
  );
};

export default SplashScreen;
