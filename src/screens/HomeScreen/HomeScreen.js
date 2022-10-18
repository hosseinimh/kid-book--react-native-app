import React, {useEffect, useRef, useState} from 'react';
import {
  Text,
  Animated,
  TouchableOpacity,
  Image,
  BackHandler,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import images from 'theme/images';
import {Sidebar} from 'components';
import {utils} from '../../utils';
import {HomeTabScreen, AboutTabScreen} from './tabScreens';
import {TAB_SCREENS, TABS} from '../../constants';
import {setTabAction} from 'storage/state/layout/layoutActions';
import BaseScreen from '../_BaseScreen/BaseScreen';
import * as funcs from './funcs';
import * as styles from '../../theme/style';
import {Header} from '../../components';

const DURATION = 300;

const HomeScreen = ({navigation}) => {
  const [showMenu, setShowMenu] = useState(false);
  const [tabScreen, setTabScreen] = useState(TAB_SCREENS.Home);
  const [initialized, setInitialized] = useState(false);

  const dispatch = useDispatch();

  const layoutState = useSelector(state => state.layoutReducer);

  const offsetValue = useRef(new Animated.Value(0)).current;
  const scaleValue = useRef(new Animated.Value(1)).current;
  const closeButtonOffset = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    funcs.selectTabScreen(layoutState.tab, setTabScreen);

    if (showMenu) {
      onCloseMenu();
    }
  }, [layoutState]);

  useEffect(() => {
    initialize();
  }, []);

  const initialize = async () => {
    setInitialized(await funcs.initialize());
  };

  BackHandler.addEventListener('hardwareBackPress', function () {
    if (navigation.isFocused()) {
      if (showMenu) {
        onCloseMenu();

        return true;
      } else if (tabScreen !== TABS.Home) {
        showHomTabScreen();

        return true;
      }
    }

    return false;
  });

  const showHomTabScreen = () => {
    dispatch(setTabAction(TABS.Home));
  };

  const onCloseMenu = () => {
    Animated.timing(scaleValue, {
      toValue: showMenu ? 1 : 0.88,
      duration: DURATION,
      useNativeDriver: true,
    }).start();

    Animated.timing(offsetValue, {
      toValue: showMenu ? 0 : -230,
      duration: DURATION,
      useNativeDriver: true,
    }).start();

    Animated.timing(closeButtonOffset, {
      toValue: !showMenu ? 0 : 0,
      duration: DURATION,
      useNativeDriver: true,
    }).start();

    setShowMenu(!showMenu);
  };

  const renderHeader = () => {
    return (
      <Animated.View
        style={[
          styles.sidebarAnimatedContainer,
          {
            transform: [
              {
                translateY: closeButtonOffset,
              },
            ],
          },
        ]}>
        <Header
          title={utils.tabScreenTitle(tabScreen)}
          rightContainer={() => (
            <View>
              <TouchableOpacity
                onPress={() => {
                  tabScreen === TAB_SCREENS.Home
                    ? onCloseMenu()
                    : showHomTabScreen();
                }}>
                <Image
                  source={
                    showMenu
                      ? images.close
                      : tabScreen === TAB_SCREENS.Home
                      ? images.menu
                      : images.arrowRight
                  }
                  style={
                    tabScreen === TAB_SCREENS.Home || showMenu
                      ? styles.closeHeaderIcon
                      : styles.backHeaderIcon
                  }></Image>
              </TouchableOpacity>
            </View>
          )}
        />
      </Animated.View>
    );
  };

  const renderTabScreen = () => {
    switch (tabScreen) {
      case TAB_SCREENS.Home:
        return <HomeTabScreen navigation={navigation} />;
      case TAB_SCREENS.About:
        return <AboutTabScreen />;
      default:
        return <></>;
    }
  };

  const renderNotInitialized = () => {
    return <></>;
  };

  return (
    <BaseScreen homeScreen={true}>
      <Sidebar />
      <Animated.View
        style={[
          styles.screenContainer,
          {
            borderRadius: showMenu ? 15 : 0,
            transform: [{scale: scaleValue}, {translateX: offsetValue}],
          },
        ]}>
        {renderHeader()}
        {initialized && renderTabScreen()}
      </Animated.View>
    </BaseScreen>
  );
};

export default HomeScreen;
