import React from 'react';
import {Image, TouchableOpacity, View} from 'react-native';

import images from 'theme/images';

import useStyles from './useStyles';

const Header = ({navigation}) => {
  const styles = useStyles();

  return (
    <View style={styles.container}>
      <View style={styles.backContainer}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <Image source={images.arrowRight} style={styles.backButton}></Image>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;
