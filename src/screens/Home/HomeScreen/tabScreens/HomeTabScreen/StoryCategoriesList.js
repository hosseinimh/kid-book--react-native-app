import React, {useEffect, useState} from 'react';
import {
  Text,
  FlatList,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';

import {utils} from '../../../../../utils';
import {ResourceUrls, Screens} from '../../../../../constants';
import * as globalStyles from '../../../../../theme/style';
import {useTheme} from '../../../../../hooks';
import {Box} from '../../../../../components';
import {StoryService} from '../../../../../services';
import {Story} from '../../../../../storage/models';

const StoryCategoriesList = ({navigation, items}) => {
  const [data, setData] = useState([]);
  const {colors} = useTheme();
  const SIZES = globalStyles.SIZES;
  const styles = StyleSheet.create({
    imgContainer: [
      globalStyles.rowListItemThumbnailContainer,
      {backgroundColor: colors.background},
    ],
  });

  const renderItem = ({item, index}) => {
    return (
      <View key={index} style={globalStyles.rowListItem}>
        <View style={styles.imgContainer}>
          <>
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
          </>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate(Screens.STORY, {id: item.id})}>
          <Text style={globalStyles.rowListItemTitle}>
            {utils.en2faDigits(item.title)}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View>
      {items?.map((item, index) => (
        <Box
          key={index}
          containerStyle={{
            height: SIZES.height / 2 - 150,
            backgroundColor: colors.primary,
          }}
          title={item?.title}>
          <FlatList
            data={item.stories}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            horizontal={true}
            inverted={true}
            showsHorizontalScrollIndicator={false}
            snapToAlignment="start"
            decelerationRate={'fast'}
            snapToInterval={SIZES.width / 2 - SIZES.padding1 - 5}
          />
        </Box>
      ))}
    </View>
  );
};

export default StoryCategoriesList;
