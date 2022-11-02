import React from 'react';
import {View} from 'react-native';

import StoryCategory from './StoryCategory';

const StoryCategoriesList = ({navigation, items}) => {
  return (
    <View>
      {items?.map(item => (
        <StoryCategory key={item.id} navigation={navigation} item={item} />
      ))}
    </View>
  );
};

export default StoryCategoriesList;
