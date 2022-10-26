import React, {useState, useEffect} from 'react';
import {ScrollView, View} from 'react-native';

import StoryCategoriesList from './StoryCategoriesList';
import * as styles from '../../../../../theme/style';
import AuthorsList from './AuthorsList';
import SpeakersList from './SpeakersList';
import TranslatorsList from './TranslatorsList';
import {DashboardService, StoryService} from '../../../../../services';

const HomeTabScreen = ({navigation}) => {
  const [storyCategories, setStoryCategories] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [translators, setTranslators] = useState([]);
  const [speakers, setSpeakers] = useState([]);

  useEffect(() => {
    getItems();
  }, []);

  const getItems = async () => {
    const result = await DashboardService.getItems();

    if (result) {
      setStoryCategories(result.storyCategories);
      setAuthors(result.authors);
      setTranslators(result.translators);
      setSpeakers(result.speakers);
    }
  };

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
