import {View, Text, StyleSheet} from 'react-native';
import React, {useState} from 'react';

import * as globalStyles from '../../theme/style';
import {useTheme} from '../../hooks';
import {useEffect} from 'react';

const Tooltip = ({text, top = 0, left = 0, show = false, onFinished}) => {
  const [showTooltip, setShowTooltip] = useState(show);
  const {colors} = useTheme();
  const {SIZES} = globalStyles;
  let timeout;
  const styles = StyleSheet.create({
    container: {
      position: 'absolute',
      top,
      left,
      margin: SIZES.padding3,
      padding: SIZES.padding3,
      backgroundColor: colors.border,
      zIndex: 10,
      borderRadius: 5,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: [globalStyles.bodyText, {color: colors.text}],
  });

  useEffect(() => {
    if (show) {
      timeout = setTimeout(() => {
        if (typeof onFinished === 'function') {
          onFinished();
        }

        show = false;
      }, 2500);
    } else {
      if (typeof onFinished === 'function') {
        onFinished();
      }

      clearTimeout(timeout);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [show]);

  if (show) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{text}</Text>
      </View>
    );
  } else {
    return <></>;
  }
};

export default Tooltip;
