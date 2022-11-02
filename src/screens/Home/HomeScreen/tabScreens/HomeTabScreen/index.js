import React from 'react';
import {RefreshControl, ScrollView, View} from 'react-native';
import {useDispatch} from 'react-redux';

import StoryCategoriesList from './StoryCategoriesList';
import * as styles from '../../../../../theme/style';
import AuthorsList from './AuthorsList';
import SpeakersList from './SpeakersList';
import TranslatorsList from './TranslatorsList';
import {useTheme} from '../../../../../hooks';
import {setParamsAction} from '../../../../../storage/state/layout/layoutActions';

const HomeTabScreen = ({
  navigation,
  storyCategories = [],
  authors = [],
  translators = [],
  speakers = [],
}) => {
  const dispatch = useDispatch();
  const {colors} = useTheme();

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={false}
          colors={[colors.success]}
          onRefresh={() => {
            dispatch(setParamsAction({refresh: true}));
          }}
        />
      }>
      <View style={styles.tabScreenContainer}>
        <StoryCategoriesList navigation={navigation} items={storyCategories} />
        <AuthorsList navigation={navigation} items={authors} />
        <TranslatorsList navigation={navigation} items={translators} />
        <SpeakersList navigation={navigation} items={speakers} />
      </View>
    </ScrollView>
  );
};

export default HomeTabScreen;
