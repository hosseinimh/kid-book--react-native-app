import React from 'react';
import {View, TouchableOpacity, Image, StyleSheet} from 'react-native';

import * as globalStyles from '../../../theme/style';
import {useTheme} from '../../../hooks';
import {Box, Header} from '../../../components';
import BaseScreen from '../_BaseScreen/BaseScreen';
import images from '../../../theme/images';

const PanelScreen = ({
  containerStyle,
  navigation,
  navigateScreen,
  navigateParams,
  children,
  headerShown = true,
  headerTitle,
  rightContainer,
  leftContainer,
}) => {
  const {colors} = useTheme();
  const SIZES = globalStyles.SIZES;
  const styles = StyleSheet.create({
    image: [globalStyles.backHeaderIcon, {tintColor: colors.text}],
    container: [
      globalStyles.pageContainer,
      {backgroundColor: colors.background, ...containerStyle},
    ],
    boxContainer: {
      backgroundColor: colors.primary,
      flex: 1,
      paddingTop: SIZES.padding3,
      shadowOffset: {width: 0, height: 0},
      elevation: 0,
      borderWidth: 0.3,
      borderRadius: 5,
      borderColor: colors.border,
    },
  });

  const goBack = () => {
    if (navigateScreen) {
      navigation.navigate(navigateScreen, {...navigateParams});
    } else {
      navigation.goBack();
    }
  };

  const renderRightContainer = () => {
    if (rightContainer) {
      return rightContainer();
    }

    return (
      <View>
        <TouchableOpacity onPress={() => goBack()}>
          <Image source={images.arrowRight} style={styles.image}></Image>
        </TouchableOpacity>
      </View>
    );
  };

  const renderLeftContainer = () => {
    if (leftContainer) {
      return leftContainer();
    }

    return <></>;
  };

  return (
    <BaseScreen>
      {headerShown && (
        <Header
          navigation={navigation}
          title={headerTitle}
          rightContainer={() => renderRightContainer()}
          leftContainer={() => renderLeftContainer()}
        />
      )}
      <View style={styles.container}>
        <Box containerStyle={styles.boxContainer}>{children}</Box>
      </View>
    </BaseScreen>
  );
};

export default PanelScreen;
