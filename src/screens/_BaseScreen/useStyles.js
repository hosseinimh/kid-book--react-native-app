import {useTheme} from 'hooks';

const useStyles = () => {
  const {colors} = useTheme();

  const container = {
    flex: 1,
    backgroundColor: colors.sidebarBackground,
    alignItems: 'flex-end',
  };

  return {
    container,
  };
};

export default useStyles;
