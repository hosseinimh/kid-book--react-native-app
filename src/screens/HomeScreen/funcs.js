import {Settings, User as UserModel} from '../../storage/models';
import {User} from '../../http/entities';
import {TABS, TAB_SCREENS} from '../../constants';
import SqliteConnection from '../../storage/models/SqliteConnection';

export const initialize = async () => {
  const user = new UserModel();
  const settings = new Settings();
  let userItem = await user.get();
  let settingsItem = await settings.get();

  if (userItem && settingsItem) {
    let username = userItem?.uuid ?? (await signUp(user));

    return await updateToken(settings, username);
  }

  return false;
};

export const selectTabScreen = (selectedTab, setTabScreen) => {
  let selectedTabScreen;

  switch (selectedTab) {
    case TABS.Home:
      selectedTabScreen = TAB_SCREENS.Home;

      break;
    case TABS.About:
      selectedTabScreen = TAB_SCREENS.About;

      break;
    default:
      selectedTabScreen = TAB_SCREENS.Home;

      break;
  }

  setTabScreen(selectedTabScreen);
};

const signUp = async user => {
  const entity = new User();
  let res = await entity.signUp();
  let username;

  if (res?.item?.username) {
    username = res.item.username;

    return (await user.updateUUID(username)) === null ? null : username;
  }

  return null;
};

const updateToken = async (settings, username) => {
  if (!username) {
    return false;
  }

  const entity = new User();
  const result = await entity.getToken(username);

  if (result?.token) {
    return (await settings.updateToken(result.token)) === null ? false : true;
  }

  await new SqliteConnection().dropDb();

  return false;
};
