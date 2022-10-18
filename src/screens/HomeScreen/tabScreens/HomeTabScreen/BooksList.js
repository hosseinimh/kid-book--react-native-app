import React from 'react';
import {Text, Image, FlatList, View, TouchableOpacity} from 'react-native';

import images from 'theme/images';
import stories from 'constants/stories';

import useStyles from '../../useStyles';

const BooksList = ({navigation}) => {
  const styles = useStyles();

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('Story', {id: item.id})}>
        <View>
          <Image source={images.photo} style={styles.listImage}></Image>
          <Text style={styles.listTitle}>{item.title}</Text>
          <Text style={styles.listText}>{item.text}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      data={stories}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      contentContainerStyle={styles.listContainer}
      ItemSeparatorComponent={ItemDivider}
    />
  );
};

const ItemDivider = () => {
  const styles = useStyles();

  return <View style={styles.divider} />;
};

export default BooksList;
