import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';

import BaseScreen from '../_BaseScreen/BaseScreen';
import Header from './Header';
import useStyles from './useStyles';

const StoryScreen = ({route, navigation}) => {
  const [storyId, setStoryId] = useState(0);

  const styles = useStyles();

  useEffect(() => {
    const {id} = route.params;

    if (isNaN(id) || id <= 0) {
      navigation.goBack();
    }

    setStoryId(parseInt(id));
  }, []);

  return (
    <BaseScreen>
      <Header navigation={navigation} />
      <View style={styles.container}>
        <Text>StoryScreen {storyId}</Text>
      </View>
    </BaseScreen>
  );
};

export default StoryScreen;
