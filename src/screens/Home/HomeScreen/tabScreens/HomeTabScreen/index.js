import React from 'react';
import {ScrollView, View} from 'react-native';

import StoryCategoriesList from './StoryCategoriesList';
import * as styles from '../../../../../theme/style';
import AuthorsList from './AuthorsList';
import SpeakersList from './SpeakersList';
import TranslatorsList from './TranslatorsList';

const HomeTabScreen = ({
  navigation,
  storyCategories = [],
  authors = [],
  translators = [],
  speakers = [],
}) => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
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
