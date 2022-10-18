import React, {useEffect, useState} from 'react';
import {
  Text,
  Image,
  FlatList,
  View,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import axios from 'axios';
import FastImage from 'react-native-fast-image';

import images from 'theme/images';

import useStyles from '../../useStyles';

const ITEM_HEIGHT = 20;

const UsersList = ({navigation}) => {
  const styles = useStyles();
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadData();
  }, [currentPage]);

  const loadMore = () => {
    setCurrentPage(currentPage + 1);
  };

  const filterData = items => {
    const oldData = [...data, ...items];
    let unique = oldData.filter(
      (value, index, self) => index === self.findIndex(t => t.id === value.id),
    );

    setData(unique);
  };

  const loadData = () => {
    setLoading(true);
    axios
      .get(
        `https://dummyjson.com/products?limit=5&skip=${(currentPage - 1) * 5}`,
      )
      .then(res => filterData(res.data.products))
      .catch(error => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('Story', {id: item.id})}>
        <View>
          {item.images?.length > 0 && (
            <FastImage
              source={{uri: item.images[0]}}
              style={styles.listImage}
            />
          )}
          {item.images?.length === 0 && (
            <Image source={images.photo} style={styles.listImage}></Image>
          )}
          <Text style={styles.listTitle} numberOfLines={1}>
            {item.title}
          </Text>
          <Text style={styles.listText} numberOfLines={1}>
            {item.description}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      contentContainerStyle={styles.listContainer}
      ItemSeparatorComponent={ItemDivider}
      onEndReached={loadMore}
      onEndReachedThreshold={1}
      refreshControl={
        <RefreshControl
          colors={['#9Bd35A', '#689F38']}
          refreshing={false}
          onRefresh={loadMore}
        />
      }
      getItemLayout={(_, index) => ({
        length: ITEM_HEIGHT,
        offset: ITEM_HEIGHT * index,
        index,
      })}
    />
  );
};

const ItemDivider = () => {
  const styles = useStyles();

  return <View style={styles.divider} />;
};

export default UsersList;
