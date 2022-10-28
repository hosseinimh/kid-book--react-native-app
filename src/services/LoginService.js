import {
  Author,
  Speaker,
  Translator,
  Settings,
  User,
  StoryCategory,
  Story,
  StoryItem,
} from '../storage/models';
import {User as UserEntity} from '../http/entities';

export const login = async () => {
  await createTables();

  const user = new User();
  const settings = new Settings();

  let userItem = await user.get();
  let settingsItem = await settings.get();

  if (settingsItem) {
    let result = await handleLogin(userItem?.username);

    if (result) {
      return true;
    } else if (result === false) {
      return await signUp(user);
    }
  }

  await updateToken(null);

  return false;
};

const createTables = async () => {
  const user = new User();
  const settings = new Settings();
  const storyCategory = new StoryCategory();
  const story = new Story();
  const storyItem = new StoryItem();
  const author = new Author();
  const speaker = new Speaker();
  const translator = new Translator();

  await user.createTable();
  await settings.createTable();
  await storyCategory.createTable();
  await story.createTable();
  await storyItem.createTable();
  await author.createTable();
  await speaker.createTable();
  await translator.createTable();
};

const handleLogin = async username => {
  try {
    const userEntity = new UserEntity();

    if (username) {
      let result = await userEntity.getToken(username);

      if (!result) {
        return null;
      }

      if (result?.token) {
        return await updateToken(result.token);
      }
    }
  } catch {}

  return false;
};

const signUp = async user => {
  try {
    const entity = new UserEntity();
    let result = await entity.signUp();

    if (
      result?.token &&
      result?.user?.username &&
      (await user.updateUsername(result.user.username)) !== null
    ) {
      return await updateToken(result.token);
    }
  } catch {}

  return null;
};

const updateToken = async token => {
  try {
    const settings = new Settings();

    return (await settings.updateToken(token)) === true ? true : false;
  } catch {}

  return false;
};
