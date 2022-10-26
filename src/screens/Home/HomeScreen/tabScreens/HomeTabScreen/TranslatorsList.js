import React from 'react';
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

const TranslatorsList = ({navigation, items}) => {
  const {colors} = useTheme();
  const SIZES = globalStyles.SIZES;
  const styles = StyleSheet.create({
    container: {
      height: SIZES.height / 2 - 150,
      backgroundColor: colors.primary,
    },
    txtContainer: [globalStyles.bodyText, {color: colors.sidebarBackground}],
    imageContainer: [
      globalStyles.rowListItemThumbnailContainer,
      {backgroundColor: colors.background},
    ],
  });

  const renderItem = ({item, index}) => {
    return (
      <View key={index} style={globalStyles.rowListItem}>
        <View style={styles.imageContainer}>
          <>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate(Screens.TRANSLATOR, {id: item.id})
              }>
              {item.avatar && (
                <Image
                  style={globalStyles.rowListItemThumbnail}
                  source={{
                    uri: `file://${item?.avatar}`,
                  }}
                  resizeMode="cover"
                />
              )}
              {!item.avatar && (
                <View style={globalStyles.rowListItemThumbnail} />
              )}
            </TouchableOpacity>
          </>
        </View>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate(Screens.TRANSLATOR, {id: item.id})
          }>
          <Text style={globalStyles.rowListItemTitle}>
            {utils.en2faDigits(`${item.name} ${item.family}`)}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View>
      <Box
        containerStyle={styles.container}
        title={strings.translators}
        rightContainer={() => (
          <View>
            <TouchableOpacity
              onPress={() => navigation.navigate(Screens.TRANSLATORS_LIST)}>
              <Text style={styles.txtContainer}>{strings.viewAll}</Text>
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

export default TranslatorsList;
