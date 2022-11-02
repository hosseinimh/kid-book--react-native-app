import React, {useEffect, useState} from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import images from '../../theme/images';
import {TABS, THEMES} from '../../constants';
import {setTabAction} from '../../storage/state/layout/layoutActions';
import {utils} from '../../utils';
import {useTheme} from '../../hooks';
import {appVersion} from '../../../app-config.json';
import {setThemeAction} from '../../storage/state/layout/layoutActions';
import * as globalStyles from '../../theme/style';

const Sidebar = () => {
  const [currentTab, setCurrentTab] = useState(TABS.Home);
  const layoutState = useSelector(state => state.layoutReducer);
  const dispatch = useDispatch();
  const {colors} = useTheme();
  const styles = StyleSheet.create({
    tabIcon: [globalStyles.tabIcon, {tintColor: colors.sidebarText}],
    tabText: [globalStyles.tabText, {color: colors.sidebarText}],
    versionText: [globalStyles.versionText, {color: colors.sidebarText}],
  });

  const onTab = tab => {
    if (tab === TABS.Theme) {
      dispatch(
        setThemeAction(
          layoutState?.theme === THEMES.Light ? THEMES.Dark : THEMES.Light,
        ),
      );
    } else {
      dispatch(setTabAction(tab));
    }
  };

  useEffect(() => {
    setCurrentTab(layoutState.tab);
  }, [layoutState]);

  const renderTabButton = (tab, image) => {
    return (
      <TouchableOpacity
        onPress={() => {
          onTab(tab);
        }}>
        <View
          style={[
            {
              backgroundColor:
                currentTab == tab
                  ? colors.sidebarText
                  : colors.sidebarBackground,
            },
            globalStyles.tabContainer,
          ]}>
          <Image
            source={image}
            style={[
              styles.tabIcon,
              {
                tintColor:
                  currentTab == tab
                    ? colors.sidebarBackground
                    : colors.sidebarText,
              },
            ]}></Image>
          <Text
            style={[
              styles.tabText,
              {
                color:
                  currentTab == tab
                    ? colors.sidebarBackground
                    : colors.sidebarText,
              },
            ]}>
            {utils.tabText(tab)}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={globalStyles.sidebarContainer}>
      <View>
        {renderTabButton(TABS.Home, images.home)}
        {renderTabButton(
          TABS.Theme,
          layoutState?.theme === THEMES.Light ? images.sun : images.moon,
        )}
        {renderTabButton(TABS.Settings, images.settings)}
        {renderTabButton(TABS.About, images.about)}
      </View>
      <View>
        <Text style={styles.versionText}>{appVersion}</Text>
      </View>
    </View>
  );
};

export default Sidebar;
