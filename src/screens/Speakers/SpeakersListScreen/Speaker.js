import React, {useEffect, useState} from 'react';
import {Text, View, TouchableOpacity, Image, StyleSheet} from 'react-native';

import {utils} from '../../../utils';
import {Screens} from '../../../constants';
import * as globalStyles from '../../../theme/style';
import {useTheme} from '../../../hooks';
import {SpeakerService} from '../../../services';

const Speaker = ({navigation, speaker}) => {
  const [item, setItem] = useState(speaker);
  const {colors} = useTheme();
  const styles = StyleSheet.create({
    imageContainer: [
      globalStyles.columnListItemThumbnailContainer,
      {backgroundColor: colors.background},
    ],
    txtContainer: {
      display: 'flex',
      flexDirection: 'column',
      flex: 1,
    },
    name: [globalStyles.columnListItemTitle, {color: colors.text}],
    description: [globalStyles.columnListItemBody, {color: colors.text}],
  });

  useEffect(() => {
    getItem();
  }, []);

  const getItem = async () => {
    if (!item.avatar) {
      await SpeakerService.downloadAvatar(item);

      setItem(await SpeakerService.getItem(item.id));
    }
  };

  return (
    <View style={globalStyles.columnListItem}>
      <View style={styles.imageContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate(Screens.SPEAKER, {id: item.id})}>
          {item.avatar && (
            <Image
              style={globalStyles.columnListItemThumbnail}
              source={{
                uri: `file://${item.avatar}`,
              }}
              resizeMode="cover"
            />
          )}
          {!item.avatar && (
            <View style={globalStyles.columnListItemThumbnail} />
          )}
        </TouchableOpacity>
      </View>
      <View style={styles.txtContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate(Screens.SPEAKER, {id: item.id})}>
          <Text style={styles.name} numberOfLines={1}>
            {utils.en2faDigits(`${item.name} ${item.family}`)}
          </Text>
          <Text style={styles.description} numberOfLines={1}>
            {utils.en2faDigits(`${item.description}`)}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Speaker;
