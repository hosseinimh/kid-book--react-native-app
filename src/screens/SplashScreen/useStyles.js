import {SIZES} from 'theme/style';

const useStyles = () => {
  const container = {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: SIZES.height,
    padding: 0,
    margin: 0,
  };

  return {
    container,
  };
};

export default useStyles;
