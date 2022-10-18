import {useTheme} from '../../../../hooks';
import * as styles from '../../../../theme/style';

const useStyles = () => {
  const {colors} = useTheme();
  const {FONTS, SIZES} = styles;

  const tabContainer = {
    paddingHorizontal: SIZES.padding3,
    paddingVertical: SIZES.padding3,
  };

  const boxContainer = {
    height: SIZES.height / 2 - 150,
    backgroundColor: colors.primary,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: SIZES.padding3,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  };

  const boxTitle = [
    FONTS.h4,
    {
      color: colors.text,
      marginTop: 10,
      marginBottom: 10,
      paddingBottom: 5,
      paddingHorizontal: SIZES.padding3,
    },
  ];

  const listContainer = {
    flex: 1,
    marginBottom: 5,
    marginRight: 5,
    alignItems: 'flex-end',
  };

  const itemsContainer = {};

  const item = {
    borderRadius: 8,
    marginLeft: 15,
    width: SIZES.width / 2 - SIZES.padding1 - 20,
    display: 'flex',
    flexDirection: 'column',
  };

  const itemThumbnailContainer = {
    flex: 1,
    backgroundColor: colors.background,
    borderRadius: 8,
  };

  const itemThumbnail = {
    width: '100%',
    height: '100%',
  };

  const itemTitle = [
    FONTS.body4,
    {
      color: colors.text,
      marginTop: 10,
      marginBottom: 10,
      paddingBottom: 5,
      paddingHorizontal: SIZES.padding3,
    },
  ];

  return {
    tabContainer,
    boxContainer,
    boxTitle,
    listContainer,
    itemsContainer,
    item,
    itemThumbnailContainer,
    itemThumbnail,
    itemTitle,
  };
};

export default useStyles;
