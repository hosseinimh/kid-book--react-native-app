import React, {useEffect, useState} from 'react';
import {Text, View, ScrollView, StyleSheet} from 'react-native';
import {useDispatch} from 'react-redux';

import * as globalStyles from '../../../../../theme/style';
import {useTheme} from '../../../../../hooks';
import {PanelScreen} from '../../../../';
import {settingsScreen as strings} from '../../../../../constants/strings';
import {Screens} from '../../../../../constants';
import {
  AuthorService,
  SpeakerService,
  StoryItemService,
  StoryService,
  TranslatorService,
} from '../../../../../services';
import {FullWidthButton} from '../../../../../components';
import {utils} from '../../../../../utils';
import SqliteConnection from '../../../../../storage/models/SqliteConnection';
import {setParamsAction} from '../../../../../storage/state/layout/layoutActions';

const SettingsTabScreen = () => {
  const [volume, setVolume] = useState(0);
  const dispatch = useDispatch();
  const {colors} = useTheme();

  const {SIZES, FONTS} = globalStyles;

  const styles = StyleSheet.create({
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      flex: 1,
      paddingHorizontal: SIZES.padding3,
      paddingBottom: SIZES.padding3,
    },
    volumeContainer: {
      display: 'flex',
      flexDirection: 'row-reverse',
      flexWrap: 'wrap',
    },
    volumeText: [
      FONTS.body4,
      {
        color: colors.text,
        marginLeft: 8,
      },
    ],
  });

  useEffect(() => {
    getFileSizes();
  }, []);

  const onResetData = async () => {
    await resetData();

    setVolume(0);
  };

  const getFileSizes = async () => {
    let total = 0;

    total += await AuthorService.sumFileSizes();
    total += await TranslatorService.sumFileSizes();
    total += await SpeakerService.sumFileSizes();
    total += await StoryService.sumFileSizes();
    total += await StoryItemService.sumFileSizes();

    setVolume(total);
  };

  const resetData = async () => {
    const sqlite = new SqliteConnection();

    await AuthorService.deleteFiles();
    await TranslatorService.deleteFiles();
    await SpeakerService.deleteFiles();
    await StoryService.deleteFiles();
    await StoryItemService.deleteFiles();
    await sqlite.dropDb();

    dispatch(setParamsAction({refresh: true}));
  };

  return (
    <PanelScreen headerShown={false}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <View style={styles.volumeContainer}>
            <Text style={styles.volumeText}>{strings.volumeText}:</Text>
            <Text style={styles.volumeText}>{utils.formatBytes(volume)}</Text>
          </View>
          <FullWidthButton text={strings.reset} onPress={onResetData} />
        </View>
      </ScrollView>
    </PanelScreen>
  );
};

export default SettingsTabScreen;
