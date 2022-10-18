import {useTheme} from 'hooks';
import {SIZES} from 'theme/style';

const useStyles = () => {
  const {colors} = useTheme();

  const headerContainer = {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SIZES.padding2,
    paddingHorizontal: SIZES.padding3,
    backgroundColor: colors.border,
    width: '100%',
    height: 60,
  };

  const container = {
    marginBottom: SIZES.padding2,
    paddingHorizontal: SIZES.padding3,
  };

  const rightContainer = {};

  const leftContainer = {alignSelf: 'center'};

  const headerIcon = {
    width: 20,
    height: 20,
    tintColor: colors.text,
  };

  const progress = {
    position: 'relative',
    top: -SIZES.padding2,
  };

  return {
    headerContainer,
    container,
    rightContainer,
    leftContainer,
    headerIcon,
    progress,
  };
};

export default useStyles;
