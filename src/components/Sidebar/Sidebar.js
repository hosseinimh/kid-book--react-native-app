import React, {useEffect, useState} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import images from '../../theme/images';
import {TABS, THEMES} from '../../constants';
import {setTabAction} from '../../storage/state/layout/layoutActions';
import {utils} from '../../utils';
import {useTheme} from '../../hooks';
import {appVersion} from '../../../app-config.json';
import {setThemeAction} from '../../storage/state/layout/layoutActions';
import * as styles from '../../theme/style';

const Sidebar = () => {
  const [currentTab, setCurrentTab] = useState(TABS.Home);
  const layoutState = useSelector(state => state.layoutReducer);
  const dispatch = useDispatch();
  const {colors} = useTheme();

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
                currentTab == tab ? colors.sidebarText : colors.transparent,
            },
            styles.tabContainer,
          ]}>
          <Image
            source={image}
            style={[
              {
                tintColor:
                  currentTab == tab
                    ? colors.sidebarBackground
                    : colors.sidebarText,
              },
              styles.tabIcon,
            ]}></Image>
          <Text
            style={[
              {
                color:
                  currentTab == tab
                    ? colors.sidebarBackground
                    : colors.sidebarText,
              },
              styles.tabText,
            ]}>
            {utils.tabText(tab)}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.sidebarContainer}>
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
        <Text style={[styles.versionText, {color: colors.sidebarText}]}>
          {appVersion}
        </Text>
      </View>
    </View>
  );
};

export default Sidebar;
