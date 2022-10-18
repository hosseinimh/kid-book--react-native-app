import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';

import BaseScreen from '../_BaseScreen/BaseScreen';
import {Header} from '../../components';
import useStyles from './useStyles';

const SpeakerScreen = ({route, navigation}) => {
  const [speakerId, setSpeakerId] = useState(0);

  const styles = useStyles();

  useEffect(() => {
    const {id} = route.params;

    if (isNaN(id) || id <= 0) {
      navigation.goBack();
    }

    setSpeakerId(parseInt(id));
  }, []);

  return (
    <BaseScreen>
      <Header navigation={navigation} />
      <View style={styles.container}>
        <Text>SpeakerScreen {speakerId}</Text>
      </View>
    </BaseScreen>
  );
};

export default SpeakerScreen;
