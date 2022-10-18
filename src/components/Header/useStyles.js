import {useTheme} from 'hooks';
import {SIZES} from 'theme/style';

const useStyles = () => {
  const {colors} = useTheme();

  const container = {
    marginBottom: SIZES.padding2,
    marginTop: 0,
    pading: 0,
  };

  const backContainer = {
    alignSelf: 'flex-end',
  };

  const backButton = {
    width: 25,
    height: 25,
    tintColor: colors.text,
    marginTop: SIZES.padding2,
  };

  return {
    container,
    backContainer,
    backButton,
  };
};

export default useStyles;
