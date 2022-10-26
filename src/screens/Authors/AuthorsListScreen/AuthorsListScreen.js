import React, {useEffect, useState} from 'react';
import {
  Text,
  FlatList,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';

import {utils} from '../../../utils';
import {Screens} from '../../../constants';
import * as globalStyles from '../../../theme/style';
import {useTheme} from '../../../hooks';
import {PanelScreen} from '../../';
import {homeTabScreen as strings} from '../../../constants/strings';
import {AuthorService} from '../../../services';

const AuthorsListScreen = ({navigation}) => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
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
    divider: [globalStyles.divider, {backgroundColor: colors.border}],
  });

  useEffect(() => {
    loadData();
  }, [currentPage]);

  const loadMore = () => {
    setCurrentPage(currentPage + 1);
  };

  const loadData = async () => {
    let items = await AuthorService.getItems(currentPage);

    if (items) {
      const unique = items.filter(
        (v, i, a) => a.findIndex(v2 => v2.id === v.id) === i,
      );

      setData([...data, ...unique]);
    }
  };

  const renderItem = ({item, index}) => {
    return (
      <View key={index} style={globalStyles.columnListItem}>
        <View style={styles.imageContainer}>
          <>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate(Screens.AUTHOR, {id: item.id})
              }>
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
          </>
        </View>
        <View style={styles.txtContainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate(Screens.AUTHOR, {id: item.id})}>
            <Text style={globalStyles.columnListItemTitle} numberOfLines={1}>
              {utils.en2faDigits(`${item.name} ${item.family}`)}
            </Text>
            <Text style={globalStyles.columnListItemBody} numberOfLines={1}>
              {utils.en2faDigits(`${item.description}`)}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <PanelScreen navigation={navigation} headerTitle={strings.authors}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        onEndReached={loadMore}
        onEndReachedThreshold={2}
        ItemSeparatorComponent={() => <View style={styles.divider}></View>}
      />
    </PanelScreen>
  );
};

export default AuthorsListScreen;
