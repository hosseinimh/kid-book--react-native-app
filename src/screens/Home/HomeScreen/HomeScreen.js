import React, {useEffect, useRef, useState} from 'react';
import {
  Animated,
  TouchableOpacity,
  Image,
  BackHandler,
  View,
  Text,
  StyleSheet,
  RefreshControl,
  ScrollView,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import images from '../../../theme/images';
import {Box, Sidebar} from '../../../components';
import {utils} from '../../../utils';
import {HomeTabScreen, SettingsTabScreen, AboutTabScreen} from './tabScreens';
import {TAB_SCREENS, TABS, Screens} from '../../../constants';
import {
  setParamsAction,
  setTabAction,
} from '../../../storage/state/layout/layoutActions';
import {BaseScreen} from '../../';
import * as globalStyles from '../../../theme/style';
import {Header} from '../../../components';
import {useTheme} from '../../../hooks';
import {homeTabScreen} from '../../../constants/strings';
import {LoginService} from '../../../services';
import {getHomeItems} from '../../../storage/state/home/homeActions';

const DURATION = 300;

const HomeScreen = ({navigation}) => {
  const [initialized, setInitialized] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  const [tabScreen, setTabScreen] = useState(TAB_SCREENS.Home);
  const [storyCategories, setStoryCategories] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [translators, setTranslators] = useState([]);
  const [speakers, setSpeakers] = useState([]);
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
  const homeState = useSelector(state => state.homeReducer);

  const offsetValue = useRef(new Animated.Value(0)).current;
  const scaleValue = useRef(new Animated.Value(1)).current;
  const closeButtonOffset = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (showMenu) {
      onCloseMenu();
    }

    if (
      layoutState.tab === TAB_SCREENS.Home &&
      layoutState.params?.refresh === true
    ) {
      reload();
    }

    selectTabScreen(layoutState.tab, layoutState.params);
  }, [layoutState]);

  useEffect(() => {
    if (
      homeState.storyCategories?.length > 0 &&
      homeState.authors?.length > 0 &&
      homeState.translators?.length > 0 &&
      homeState.speakers?.length > 0
    ) {
      setStoryCategories(homeState.storyCategories);
      setAuthors(homeState.authors);
      setTranslators(homeState.translators);
      setSpeakers(homeState.speakers);
      setInitialized(true);
    } else if (
      homeState.storyCategories?.length === 0 ||
      homeState.authors?.length === 0 ||
      homeState.translators?.length === 0 ||
      homeState.speakers?.length === 0
    ) {
      setInitialized(false);
    }
  }, [homeState]);

  useEffect(() => {
    initialize();

    return () => {
      clearInterval(interval);
    };
  }, []);

  const interval = setInterval(() => {
    initialize();
  }, 600000);

  const initialize = async () => {
    await LoginService.login();
  };

  const reload = async () => {
    setInitialized(null);
    await initialize();

    dispatch(getHomeItems());
    dispatch(setParamsAction({}));
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

  const selectTabScreen = (selectedTab, params = {}) => {
    let selectedTabScreen;

    switch (selectedTab) {
      case TABS.Home:
        selectedTabScreen = TAB_SCREENS.Home;

        break;
      case TABS.Settings:
        selectedTabScreen = TAB_SCREENS.Settings;

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
                    : showHomTabScreen(
                        tabScreen === TAB_SCREENS.Settings ? true : false,
                      );
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
        return (
          <HomeTabScreen
            navigation={navigation}
            storyCategories={storyCategories}
            authors={authors}
            translators={translators}
            speakers={speakers}
          />
        );
      case TAB_SCREENS.Settings:
        return <SettingsTabScreen />;
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

  const renderLoading = () => {
    return (
      <ScrollView
        style={{
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          height: globalStyles.SIZES.height,
        }}
        refreshControl={
          <RefreshControl refreshing={true} colors={[colors.success]} />
        }></ScrollView>
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
        {initialized && renderTabScreen()}
        {initialized === false && renderNotInitialized()}
        {initialized === null && renderLoading()}
      </Animated.View>
    </BaseScreen>
  );
};

export default HomeScreen;
