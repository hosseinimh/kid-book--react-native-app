import React from 'react';
import {Text, View, TouchableOpacity, Image, StyleSheet} from 'react-native';

import * as globalStyles from '../../../../../theme/style';
import {useTheme} from '../../../../../hooks';
import {Screens} from '../../../../../constants';
import {utils} from '../../../../../utils';
import {useEffect} from 'react';
import {useState} from 'react';
import {StoryService} from '../../../../../services';

const Story = ({navigation, story}) => {
  const [item, setItem] = useState(story);
  const {colors} = useTheme();
  const styles = StyleSheet.create({
    imageContainer: [
      globalStyles.rowListItemThumbnailContainer,
      {backgroundColor: colors.background},
    ],
    title: [globalStyles.rowListItemTitle, {color: colors.text}],
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
    <View style={globalStyles.rowListItem}>
      <View style={styles.imageContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate(Screens.STORY, {id: item.id})}>
          {item.thumbnail && (
            <Image
              style={globalStyles.rowListItemThumbnail}
              source={{
                uri: `file://${item.thumbnail}`,
              }}
              resizeMode="cover"
            />
          )}
          {!item.thumbnail && (
            <View style={globalStyles.rowListItemThumbnail} />
          )}
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate(Screens.STORY, {id: item.id})}>
        <Text style={styles.title}>{utils.en2faDigits(item.title)}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Story;
