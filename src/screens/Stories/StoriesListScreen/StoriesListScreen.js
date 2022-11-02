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
import Story from './Story';

const StoriesListScreen = ({route, navigation}) => {
  const [items, setItems] = useState([]);
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
    loadItems();
  }, [currentPage]);

  const loadMore = () => {
    setCurrentPage(currentPage + 1);
  };

  const loadItems = async () => {
    let records = await StoryService.getItems(storyCategoryId, currentPage);

    if (records) {
      setItems(utils.uniqueArray([...items, ...records]));
    }

    setLoading(false);
  };

  const renderItem = ({item}) => (
    <Story key={item.id} navigation={navigation} story={item} />
  );

  return (
    <PanelScreen navigation={navigation} headerTitle={headerTitle}>
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        snapToAlignment="start"
        decelerationRate={'fast'}
        snapToInterval={SIZES.height / 2 - SIZES.padding1 - 5}
        onEndReached={loadMore}
        onEndReachedThreshold={5}
        ItemSeparatorComponent={() => <View style={styles.divider}></View>}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            colors={[colors.success]}
            onRefresh={() => {
              setLoading(true);
              setItems([]);
              setCurrentPage(1);
            }}
          />
        }
      />
    </PanelScreen>
  );
};

export default StoriesListScreen;
