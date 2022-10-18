import {useTheme} from '../../hooks';
import * as styles from '../../theme/style';

const useStyles = () => {
  const {colors} = useTheme();
  const {FONTS, SIZES} = styles;

  const container = {
    flexGrow: 1,
    backgroundColor: colors.background,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    paddingBottom: 20,
  };

  const headerAnimatedContainer = {
    backgroundColor: colors.primary,
  };

  const headerContainer = {
    marginTop: SIZES.padding1,
    paddingBottom: SIZES.padding3,
    paddingHorizontal: SIZES.padding2,
    display: 'flex',
    flexDirection: 'row-reverse',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderBottomColor: colors.border,
    borderBottomWidth: 1,
  };

  const closeButton = {
    width: 20,
    height: 20,
    tintColor: colors.text,
  };

  const backButton = {
    width: 20,
    height: 20,
    tintColor: colors.text,
  };

  const headerText = {
    paddingHorizontal: SIZES.padding3,
  };

  const tabScreenTitle = [
    FONTS.h3,
    {
      color: colors.text,
    },
  ];

  return {
    container,
    headerAnimatedContainer,
    headerContainer,
    closeButton,
    backButton,
    headerText,
    tabScreenTitle,
  };
};

export default useStyles;
