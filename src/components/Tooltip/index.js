import {View, Text, StyleSheet} from 'react-native';
import React, {useState} from 'react';

import * as globalStyles from '../../theme/style';
import {useTheme} from '../../hooks';
import {useEffect} from 'react';

const Tooltip = ({text, top = 0, left = 0, show = false, onFinished}) => {
  const [showTooltip, setShowTooltip] = useState(false);
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
    setShowTooltip(show);
  }, [show]);

  useEffect(() => {
    if (showTooltip) {
      timeout = setTimeout(() => {
        if (typeof onFinished === 'function') {
          onFinished();
        }

        setShowTooltip(false);
      }, 2500);
    } else {
      clearTimeout(timeout);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [showTooltip]);

  if (showTooltip) {
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
