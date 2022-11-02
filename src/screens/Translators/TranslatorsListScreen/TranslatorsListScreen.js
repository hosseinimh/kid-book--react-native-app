import React, {useEffect, useState} from 'react';
import {FlatList, View, StyleSheet, RefreshControl} from 'react-native';

import {utils} from '../../../utils';
import * as globalStyles from '../../../theme/style';
import {useTheme} from '../../../hooks';
import {PanelScreen} from '../../';
import {homeTabScreen as strings} from '../../../constants/strings';
import {TranslatorService} from '../../../services';
import Translator from './Translator';

const TranslatorsListScreen = ({navigation}) => {
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const {colors} = useTheme();
  const SIZES = globalStyles.SIZES;
  const styles = StyleSheet.create({
    divider: [globalStyles.divider, {backgroundColor: colors.border}],
  });

  useEffect(() => {
    loadItems();
  }, [currentPage]);

  const loadMore = () => {
    setCurrentPage(currentPage + 1);
  };

  const loadItems = async () => {
    let records = await TranslatorService.getItems(currentPage);

    if (records) {
      setItems(utils.uniqueArray([...items, ...records]));
    }

    setLoading(false);
  };

  const renderItem = ({item}) => (
    <Translator key={item.id} navigation={navigation} translator={item} />
  );

  return (
    <PanelScreen navigation={navigation} headerTitle={strings.translators}>
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

export default TranslatorsListScreen;
