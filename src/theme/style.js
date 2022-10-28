import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

export const SIZES = {
  padding1: 30,
  padding2: 24,
  padding3: 16,
  h1: 30,
  h2: 22,
  h3: 16,
  h4: 14,
  body1: 30,
  body2: 22,
  body3: 16,
  body4: 14,
  width,
  height,
};

export const FONTS = {
  h1: {fontFamily: 'Vazir-Bold', fontSize: SIZES.h1, lineHeight: 36},
  h2: {fontFamily: 'Vazir-Bold', fontSize: SIZES.h2, lineHeight: 30},
  h3: {fontFamily: 'Vazir-Bold', fontSize: SIZES.h3, lineHeight: 22},
  h4: {fontFamily: 'Vazir-Bold', fontSize: SIZES.h4, lineHeight: 22},
  body1: {fontFamily: 'Vazir', fontSize: SIZES.body1, lineHeight: 36},
  body2: {fontFamily: 'Vazir', fontSize: SIZES.body2, lineHeight: 30},
  body3: {fontFamily: 'Vazir', fontSize: SIZES.body3, lineHeight: 22},
  body4: {fontFamily: 'Vazir', fontSize: SIZES.body4, lineHeight: 22},
};

export const screenContainer = {
  position: 'absolute',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  paddingBottom: 20,
};

export const sidebarAnimatedContainer = {};

export const headerContainer = {
  width: SIZES.width,
  paddingVertical: SIZES.padding3,
  paddingHorizontal: SIZES.padding2,
  display: 'flex',
  flexDirection: 'row-reverse',
  justifyContent: 'flex-start',
  alignItems: 'center',
  borderBottomWidth: 1,
};

export const headerTextContainer = {
  paddingHorizontal: SIZES.padding3,
  flex: 1,
};

export const headerText = [FONTS.h3];

export const closeHeaderIcon = {
  width: 20,
  height: 20,
};

export const backHeaderIcon = {
  width: 20,
  height: 20,
};

export const sidebarContainer = {
  padding: 15,
  marginTop: 35,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'flex-end',
  flex: 1,
};

export const baseScreenContainer = {
  flex: 1,
};

export const tabContainer = {
  flexDirection: 'row-reverse',
  alignItems: 'center',
  paddingVertical: 8,
  paddingLeft: 35,
  paddingRight: 13,
  borderRadius: 8,
  marginTop: 15,
  width: 180,
};

export const tabIcon = {width: 25, height: 25};

export const tabText = [FONTS.body3, {fontSize: 15, paddingRight: 15}];

export const versionText = [
  FONTS.body4,
  {
    textAlign: 'right',
  },
];

export const tabScreenContainer = {
  flex: 1,
};

export const rowListItem = {
  borderRadius: 8,
  marginLeft: 15,
  width: SIZES.width / 2 - SIZES.padding1 - 20,
  display: 'flex',
  flexDirection: 'column',
};

export const columnListItem = {
  height: 100,
  display: 'flex',
  flexDirection: 'row-reverse',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  marginBottom: 5,
};

export const rowListItemThumbnailContainer = {
  flex: 1,
  borderRadius: 8,
};

export const columnListItemThumbnailContainer = {
  width: 100,
  height: 100,
  borderRadius: 50,
};

export const rowListItemThumbnail = {
  width: '100%',
  height: '100%',
  borderRadius: 8,
};

export const columnListItemThumbnail = {
  width: '100%',
  height: '100%',
  borderRadius: 50,
};

export const rowListItemTitle = [
  FONTS.body4,
  {
    marginTop: 10,
    marginBottom: 10,
    paddingBottom: 5,
    paddingHorizontal: SIZES.padding3,
  },
];

export const columnListItemTitle = [
  FONTS.h4,
  {
    marginBottom: 10,
    paddingBottom: 5,
    paddingHorizontal: SIZES.padding3,
  },
];

export const columnListItemBody = [
  FONTS.body4,
  {
    marginBottom: 10,
    paddingBottom: 5,
    paddingHorizontal: SIZES.padding3,
  },
];

export const boxContainer = {
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  elevation: 5,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  marginHorizontal: SIZES.padding3,
  marginTop: SIZES.padding3,
};

export const boxHeaderContainer = {
  display: 'flex',
  flexDirection: 'row-reverse',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingHorizontal: SIZES.padding3,
};

export const boxTitleContainer = {};

export const boxTitle = [
  FONTS.h4,
  {
    marginTop: 10,
    marginBottom: 10,
    paddingBottom: 5,
  },
];

export const boxContent = {
  flex: 1,
  marginVertical: 5,
  marginHorizontal: 5,
};

export const panelContainer = {
  display: 'flex',
  flexDirection: 'column',
  marginHorizontal: SIZES.padding3,
  marginVertical: SIZES.padding3,
};

export const bodyText = {
  ...FONTS.body4,
};

export const progressBarContainer = {
  flexDirection: 'row',
  height: 1,
  justifyContent: 'flex-start',
  width: SIZES.width,
};

export const progress = {
  width: '0%',
};

export const splashScreenContainer = {
  height: SIZES.height,
  width: SIZES.width,
  padding: 0,
  margin: 0,
};

export const pageContainer = {
  width: SIZES.width,
  paddingBottom: SIZES.padding3,
  display: 'flex',
  flex: 1,
};

export const divider = {
  height: 1,
  width: SIZES.width,
  marginVertical: 10,
};
