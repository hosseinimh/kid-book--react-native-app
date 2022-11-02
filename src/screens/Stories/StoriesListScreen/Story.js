import React, {useEffect, useState} from 'react';
import {Text, View, TouchableOpacity, Image, StyleSheet} from 'react-native';

import {utils} from '../../../utils';
import {Screens} from '../../../constants';
import * as globalStyles from '../../../theme/style';
import {useTheme} from '../../../hooks';
import {StoryService} from '../../../services';

const Story = ({navigation, story}) => {
  const [item, setItem] = useState(story);
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
    title: [globalStyles.columnListItemTitle, {color: colors.text}],
  });

  useEffect(() => {
    getItem();
  }, []);

  const getItem = async () => {
    if (!item.thumbnail) {
      await StoryService.downloadThumbnail(item);

      setItem(await StoryService.getItem(item.id));
    }
  };

  return (
    <View style={globalStyles.columnListItem}>
      <View style={styles.imageContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate(Screens.STORY, {id: item.id})}>
          {item.thumbnail && (
            <Image
              style={globalStyles.columnListItemThumbnail}
              source={{
                uri: `file://${item.thumbnail}`,
              }}
              resizeMode="cover"
            />
          )}
          {!item.thumbnail && (
            <View style={globalStyles.columnListItemThumbnail} />
          )}
        </TouchableOpacity>
      </View>
      <View style={styles.txtContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate(Screens.STORY, {id: item.id})}>
          <Text style={styles.title} numberOfLines={1}>
            {utils.en2faDigits(item.title)}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Story;
