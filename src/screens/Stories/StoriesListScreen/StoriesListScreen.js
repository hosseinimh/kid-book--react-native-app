import React, {useEffect, useState} from 'react';
import {
  Text,
  FlatList,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  RefreshControl,
} from 'react-native';

import {utils} from '../../../utils';
import {Screens} from '../../../constants';
import * as globalStyles from '../../../theme/style';
import {useTheme} from '../../../hooks';
import {PanelScreen} from '../../';
import {StoryService} from '../../../services';

const StoriesListScreen = ({route, navigation}) => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const {colors} = useTheme();
  const storyCategoryId = route?.params?.storyCategoryId;
  const headerTitle = route?.params?.headerTitle;
  const SIZES = globalStyles.SIZES;
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
    divider: [globalStyles.divider, {backgroundColor: colors.border}],
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadMore = () => {
    setCurrentPage(currentPage + 1);
    loadData();
  };

  const loadData = async () => {
    let items = await StoryService.getItems(storyCategoryId, currentPage);

    if (items) {
      setData(utils.uniqueArray(items));
    }

    setLoading(false);
  };

  const renderItem = ({item, index}) => {
    return (
      <View key={index} style={globalStyles.columnListItem}>
        <View style={styles.imageContainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate(Screens.STORY, {id: item.id})}>
            {item.image && (
              <Image
                style={globalStyles.columnListItemThumbnail}
                source={{
                  uri: `file://${item.image}`,
                }}
                resizeMode="cover"
              />
            )}
            {!item.image && (
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

  return (
    <PanelScreen navigation={navigation} headerTitle={headerTitle}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        snapToAlignment="start"
        decelerationRate={'fast'}
        snapToInterval={SIZES.height / 2 - SIZES.padding1 - 5}
        onEndReached={loadMore}
        onEndReachedThreshold={2}
        ItemSeparatorComponent={() => <View style={styles.divider}></View>}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            colors={[colors.success]}
            onRefresh={() => {
              setLoading(true);
              setCurrentPage(1);
              loadData();
            }}
          />
        }
      />
    </PanelScreen>
  );
};

export default StoriesListScreen;
