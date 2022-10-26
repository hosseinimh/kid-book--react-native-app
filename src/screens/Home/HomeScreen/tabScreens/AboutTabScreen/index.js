import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {Panel} from '../../../../../components';
import {useTheme} from '../../../../../hooks';

const AboutTabScreen = () => {
  const {colors} = useTheme();
  const styles = StyleSheet.create({
    title1: {color: colors.text},
    container: {
      display: 'flex',
      flexDirection: 'row',
      height: 5,
      backgroundColor: 'red',
    },
  });

  return (
    <>
      <Panel>
        <Text style={styles.title1}>Mahmoud Hosseini1</Text>
      </Panel>
      <View style={styles.container}></View>
      <Panel>
        <Text style={styles.title1}>Mahmoud Hosseini</Text>
      </Panel>
    </>
  );
};

export default AboutTabScreen;
