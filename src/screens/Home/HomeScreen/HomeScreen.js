import React, {useEffect, useRef, useState} from 'react';
import {
  Animated,
  TouchableOpacity,
  Image,
  BackHandler,
  View,
  Text,
  StyleSheet,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import images from '../../../theme/images';
import {Box, Sidebar} from '../../../components';
import {utils} from '../../../utils';
import {HomeTabScreen, AboutTabScreen} from './tabScreens';
import {TAB_SCREENS, TABS, ServerConnectionStatus} from '../../../constants';
import {setTabAction} from '../../../storage/state/layout/layoutActions';
import {BaseScreen} from '../../';
import * as globalStyles from '../../../theme/style';
import {Header} from '../../../components';
import {useTheme} from '../../../hooks';
import {homeTabScreen} from '../../../constants/strings';
import {setServerConnectionStatus} from '../../../storage/state/app/appActions';
import {LoginService, SettingsService} from '../../../services';
import {Settings} from '../../../storage/models';

const DURATION = 300;

const HomeScreen = ({navigation}) => {
  const [initialized, setInitialized] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [tabScreen, setTabScreen] = useState(TAB_SCREENS.Home);

  const {colors} = useTheme();
  const styles = StyleSheet.create({
    notInitializedBoxContainer: {
      backgroundColor: colors.primary,
      height: 50,
    },
    notInitializedText: [globalStyles.bodyText, {color: colors.text}],
    container: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1,
    },
  });

  const dispatch = useDispatch();

  const layoutState = useSelector(state => state.layoutReducer);
  const appState = useSelector(state => state.appReducer);

  const offsetValue = useRef(new Animated.Value(0)).current;
  const scaleValue = useRef(new Animated.Value(1)).current;
  const closeButtonOffset = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    selectTabScreen(layoutState.tab, setTabScreen);

    if (showMenu) {
      onCloseMenu();
    }
  }, [layoutState]);

  useEffect(() => {
    initialize();
  }, []);

  setInterval(() => {
    initialize();
  }, 600000);

  const initialize = async () => {
    const settings = new Settings();

    await settings.updateToken(null);
    await LoginService.login();

    setInitialized(true);
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

  const selectTabScreen = (selectedTab, setTabScreen) => {
    let selectedTabScreen;

    switch (selectedTab) {
      case TABS.Home:
        selectedTabScreen = TAB_SCREENS.Home;

        break;
      case TABS.About:
        selectedTabScreen = TAB_SCREENS.About;

        break;
      default:
        selectedTabScreen = TAB_SCREENS.Home;

        break;
    }

    setTabScreen(selectedTabScreen);
  };

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
      toValue: 0,
      duration: DURATION,
      useNativeDriver: true,
    }).start();

    setShowMenu(!showMenu);
  };

  const renderHeader = () => {
    return (
      <Animated.View
        style={[
          globalStyles.sidebarAnimatedContainer,
          {
            borderTopRightRadius: showMenu ? 20 : 0,
            backgroundColor: colors.primary,
            transform: [
              {
                translateY: closeButtonOffset,
              },
            ],
          },
        ]}>
        <Header
          navigation={navigation}
          title={utils.tabScreenTitle(tabScreen)}
          containerStyle={{borderTopRightRadius: showMenu ? 20 : 0}}
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
                  style={[
                    tabScreen === TAB_SCREENS.Home || showMenu
                      ? globalStyles.closeHeaderIcon
                      : globalStyles.backHeaderIcon,
                    {tintColor: colors.text},
                  ]}></Image>
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
    return (
      <Box containerStyle={styles.notInitializedBoxContainer}>
        <View style={styles.container}>
          <View>
            <Text style={styles.notInitializedText}>
              {homeTabScreen.notInitialized}
            </Text>
          </View>
        </View>
      </Box>
    );
  };

  return (
    <BaseScreen>
      <Sidebar />
      <Animated.View
        style={[
          globalStyles.screenContainer,
          {
            backgroundColor: colors.background,
            borderRadius: showMenu ? 15 : 0,
            transform: [{scale: scaleValue}, {translateX: offsetValue}],
          },
        ]}>
        {renderHeader()}
        {/* <Text>{appState?.serverConnectionStatus}</Text> */}
        {initialized && renderTabScreen()}
        {/* {appState?.serverConnectionStatus ===
          ServerConnectionStatus.DISCONNECTED && renderNotInitialized()} */}
      </Animated.View>
    </BaseScreen>
  );
};

export default HomeScreen;
