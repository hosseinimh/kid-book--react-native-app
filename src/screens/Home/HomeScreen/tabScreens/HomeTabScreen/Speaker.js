import React from 'react';
import {Text, View, TouchableOpacity, Image, StyleSheet} from 'react-native';

import * as globalStyles from '../../../../../theme/style';
import {useTheme} from '../../../../../hooks';
import {Screens} from '../../../../../constants';
import {utils} from '../../../../../utils';
import {useEffect} from 'react';
import {useState} from 'react';
import {SpeakerService} from '../../../../../services';

const Speaker = ({navigation, speaker}) => {
  const [item, setItem] = useState(speaker);
  const {colors} = useTheme();
  const styles = StyleSheet.create({
    imageContainer: [
      globalStyles.rowListItemThumbnailContainer,
      {backgroundColor: colors.background},
    ],
    name: [globalStyles.rowListItemTitle, {color: colors.text}],
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
    <View style={globalStyles.rowListItem}>
      <View style={styles.imageContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate(Screens.SPEAKER, {id: item.id})}>
          {item.avatar && (
            <Image
              style={globalStyles.rowListItemThumbnail}
              source={{
                uri: `file://${item.avatar}`,
              }}
              resizeMode="cover"
            />
          )}
          {!item.avatar && <View style={globalStyles.rowListItemThumbnail} />}
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate(Screens.SPEAKER, {id: item.id})}>
        <Text style={styles.name}>
          {utils.en2faDigits(`${item.name} ${item.family}`)}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Speaker;
