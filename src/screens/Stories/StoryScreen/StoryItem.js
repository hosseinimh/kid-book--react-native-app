import React, {useEffect, useState} from 'react';
import {Text, View, Image, StyleSheet} from 'react-native';

import * as globalStyles from '../../../theme/style';
import {useTheme} from '../../../hooks';
import {StoryItemService} from '../../../services';
import {StoryItemType} from '../../../constants';
import {utils} from '../../../utils';

const StoryItem = ({storyItem}) => {
  const {SIZES, FONTS} = globalStyles;
  const [item, setItem] = useState(storyItem);
  const [width, setWidth] = useState(
    SIZES.width - SIZES.padding1 - SIZES.padding1,
  );
  const [height, setHeight] = useState(300);
  const {colors} = useTheme();
  const styles = StyleSheet.create({
    txtContentContainer: {
      marginBottom: SIZES.padding1,
      width: '100%',
      display: 'flex',
      flexDirection: 'row',
    },
    txtFaContent: {
      ...FONTS.body4,
      color: colors.text,
      textAlign: 'right',
      flex: 1,
    },
    txtEnContent: {
      ...FONTS.body4,
      color: colors.text,
      textAlign: 'left',
      flex: 1,
    },
    imageContentContainer: {
      marginBottom: SIZES.padding1,
      width: '100%',
      borderRadius: 5,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
    },
    imageContent: {
      width: '100%',
      height: 300,
      borderRadius: 5,
    },
  });

  useEffect(() => {
    getSize();
  }, [item]);

  useEffect(() => {
    getItem();
  }, []);

  const getItem = async () => {
    if (item.type === StoryItemType.IMAGE && !item.content) {
      await StoryItemService.downloadContent(item);

      setItem(await StoryItemService.getItem(item.id));
    }
  };

  const getSize = async () => {
    if (item.type === StoryItemType.IMAGE && item?.content) {
      const {width, height} = await utils.getImageSize(
        `file://${item.content}`,
      );
      const newWidth = SIZES.width - SIZES.padding1 - SIZES.padding1;
      const newHeight = (height / width) * newWidth;

      setWidth(newWidth);
      setHeight(newHeight);
    }
  };

  return (
    <View>
      {item.type === StoryItemType.TEXT_EN && (
        <View style={styles.txtContentContainer}>
          <Text style={styles.txtEnContent}>{item?.content ?? ''}</Text>
        </View>
      )}
      {item.type === StoryItemType.TEXT_FA && (
        <View style={styles.txtContentContainer}>
          <Text style={styles.txtFaContent}>
            {item?.content ? utils.en2faDigits(item.content) : ''}
          </Text>
        </View>
      )}
      {item.type === StoryItemType.IMAGE && (
        <View style={{...styles.imageContentContainer, width, height}}>
          {item?.content && (
            <Image
              style={{
                ...styles.imageContent,
                width,
                height,
              }}
              source={{
                uri: `file://${item?.content}`,
              }}
              resizeMode="stretch"
            />
          )}
        </View>
      )}
    </View>
  );
};

export default StoryItem;
