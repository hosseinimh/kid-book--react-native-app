import React from 'react';
import {View} from 'react-native';

import StoryCategoriesList from './StoryCategoriesList';
import useStyles from './useStyles';

const HomeTabScreen = ({navigation}) => {
  const styles = useStyles();

  return (
    <View style={styles.tabContainer}>
      <StoryCategoriesList navigation={navigation} />
    </View>
  );
};

export default HomeTabScreen;
