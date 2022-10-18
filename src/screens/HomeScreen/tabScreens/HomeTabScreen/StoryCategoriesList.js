import React, {useEffect, useState} from 'react';
import {
  Text,
  FlatList,
  View,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';
import FastImage from 'react-native-fast-image';

import useStyles from './useStyles';
import {StoryCategory} from '../../../../http/entities';
import {useDispatch} from 'react-redux';
import {setLoadingAction} from '../../../../storage/state/layout/layoutActions';
import {utils} from '../../../../utils';
import {SIZES} from '../../../../theme/style';
import {ResourceUrls} from '../../../../constants';

const StoryCategoriesList = ({navigation}) => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const [data, setData] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    dispatch(setLoadingAction(true));

    const storyCategory = new StoryCategory();
    let result = await storyCategory.paginate();

    if (result) {
      setData(result.items);
    }

    dispatch(setLoadingAction(false));
  };

  const renderItem = ({item, index}) => {
    return (
      <View key={index} style={styles.item}>
        <View style={styles.itemThumbnailContainer}>
          <>
            <TouchableOpacity
              onPress={() => navigation.navigate('Speaker', {id: item.id})}>
              {item.thumbnail && (
                <Image
                  style={styles.itemThumbnail}
                  source={{
                    uri: `${ResourceUrls.STORY_IMAGE}/${item.thumbnail}`,
                  }}
                  resizeMode="contain"
                />
              )}
              {!item.thumbnail && <View style={styles.itemThumbnail} />}
            </TouchableOpacity>
          </>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('Story', {id: item.id})}>
          <Text style={styles.itemTitle}>{utils.en2faDigits(item.title)}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View>
      {data?.map((item, index) => (
        <View key={index} style={styles.boxContainer}>
          <View>
            <Text style={styles.boxTitle}>{item?.title}</Text>
          </View>
          {item?.stories.length > 0 && (
            <View style={styles.listContainer}>
              <FlatList
                data={item.stories}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.itemsContainer}
                horizontal={true}
                inverted={true}
                showsHorizontalScrollIndicator={false}
                snapToAlignment="start"
                decelerationRate={'fast'}
                snapToInterval={SIZES.width / 2 - SIZES.padding1 - 5}
              />
            </View>
          )}
        </View>
      ))}
    </View>
  );
};

export default StoryCategoriesList;
