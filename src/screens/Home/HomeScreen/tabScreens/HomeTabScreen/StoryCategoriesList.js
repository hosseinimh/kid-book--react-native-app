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
import {Screens} from '../../../../../constants';
import * as globalStyles from '../../../../../theme/style';
import {useTheme} from '../../../../../hooks';
import {Box} from '../../../../../components';
import {homeTabScreen as strings} from '../../../../../constants/strings';
import Story from './Story';

const StoryCategoriesList = ({navigation, items}) => {
  const {colors} = useTheme();
  const SIZES = globalStyles.SIZES;
  const styles = StyleSheet.create({
    container: {
      height: SIZES.height / 2 - 150,
      backgroundColor: colors.primary,
    },
    txtContainer: [globalStyles.bodyText, {color: colors.sidebarBackground}],
  });

  const renderItem = ({item}) => (
    <Story key={item.id} navigation={navigation} story={item} />
  );

  return (
    <View>
      {items?.map((item, index) => (
        <Box
          key={index}
          containerStyle={{
            height: SIZES.height / 2 - 150,
            backgroundColor: colors.primary,
          }}
          title={item?.title}
          rightContainer={() => (
            <View>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate(Screens.STORIES_LIST, {
                    storyCategoryId: item.id,
                    headerTitle: item.title,
                  })
                }>
                <Text style={styles.txtContainer}>{strings.viewAll}</Text>
              </TouchableOpacity>
            </View>
          )}>
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
