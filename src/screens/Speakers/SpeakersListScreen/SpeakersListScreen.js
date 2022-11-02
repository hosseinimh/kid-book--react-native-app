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
import {homeTabScreen as strings} from '../../../constants/strings';
import {SpeakerService} from '../../../services';

const SpeakersListScreen = ({navigation}) => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const {colors} = useTheme();
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
    name: [globalStyles.columnListItemTitle, {color: colors.text}],
    description: [globalStyles.columnListItemBody, {color: colors.text}],
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
    let items = await SpeakerService.getItems(currentPage);

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

  return (
    <PanelScreen navigation={navigation} headerTitle={strings.speakers}>
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

export default SpeakersListScreen;
