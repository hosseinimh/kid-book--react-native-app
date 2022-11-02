import React from 'react';
import {Text, FlatList, View, TouchableOpacity, StyleSheet} from 'react-native';

import {Screens} from '../../../../../constants';
import * as globalStyles from '../../../../../theme/style';
import {useTheme} from '../../../../../hooks';
import {Box} from '../../../../../components';
import {homeTabScreen as strings} from '../../../../../constants/strings';
import Author from './Author';

const AuthorsList = ({navigation, items}) => {
  const {colors} = useTheme();
  const SIZES = globalStyles.SIZES;
  const styles = StyleSheet.create({
    container: {
      height: SIZES.height / 2 - 150,
      backgroundColor: colors.primary,
    },
    link: [globalStyles.bodyText, {color: colors.sidebarBackground}],
  });

  const renderItem = ({item}) => (
    <Author key={item.id} navigation={navigation} author={item} />
  );

  return (
    <View>
      <Box
        containerStyle={styles.container}
        title={strings.authors}
        rightContainer={() => (
          <View>
            <TouchableOpacity
              onPress={() => navigation.navigate(Screens.AUTHORS_LIST)}>
              <Text style={styles.link}>{strings.viewAll}</Text>
            </TouchableOpacity>
          </View>
        )}>
        <FlatList
          data={items}
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
    </View>
  );
};

export default AuthorsList;
