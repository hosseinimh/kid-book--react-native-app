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
  const userEntity = new UserEntity();
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

  let userItem = await user.get();
  let settingsItem = await settings.get();

  if (userItem && settingsItem) {
    if (userItem.username) {
      let result = await userEntity.getToken(userItem.username);

      if (result?.token) {
        return await updateToken(settings, result.token);
      }
    }

    let result = await signUp(user);

    if (result) {
      return await updateToken(settings, result.token);
    }
  }

  await updateToken(settings, null);

  return false;
};

const signUp = async user => {
  const entity = new UserEntity();
  let result = await entity.signUp();

  if (
    result?.token &&
    result?.user?.username &&
    (await user.updateUsername(result.user.username)) !== null
  ) {
    return result;
  }

  return null;
};

const updateToken = async (settings, token) => {
  return (await settings.updateToken(token)) === true ? true : false;
};
