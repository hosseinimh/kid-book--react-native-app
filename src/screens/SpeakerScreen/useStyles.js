import {useTheme} from 'hooks';
import {SIZES} from 'theme/style';

const useStyles = () => {
  const {colors} = useTheme();

  const container = {
    marginBottom: SIZES.padding2,
    paddingHorizontal: SIZES.padding3,
    backgroundColor: colors.background,
  };

  return {
    container,
  };
};

export default useStyles;
