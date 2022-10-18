import {useTheme} from 'hooks';
import * as styles from 'theme/style';

const useStyles = () => {
  const {colors} = useTheme();
  const {SIZES} = styles;

  const container = {
    flexDirection: 'row',
    height: 1,
    justifyContent: 'flex-start',
    width: SIZES.width,
  };

  const progress = {
    backgroundColor: colors.success,
    width: '50%',
  };

  return {
    container,
    progress,
  };
};

export default useStyles;
