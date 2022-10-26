import {
  AuthorService,
  SettingsService,
  SpeakerService,
  StoryCategoryService,
  StoryService,
  TranslatorService,
} from '../services';
import {Dashboard as Entity} from '../http/entities';

export const getItems = async () => {
  const entity = new Entity();
  const isConnected = await SettingsService.isConnected();
  const result = isConnected ? await entity.getItems() : null;

  if (result) {
    await saveStoryCategories(result.storyCategories);
    await saveAuthors(result.authors);
    await saveTranslators(result.translators);
    await saveSpeakers(result.speakers);
  }

  return {
    storyCategories: await getStoryCategories(),
    authors: await AuthorService.getItems(),
    translators: await TranslatorService.getItems(),
    speakers: await SpeakerService.getItems(),
  };
};

const saveStoryCategories = async items => {
  for (let i = 0; i < items?.length; i++) {
    await StoryCategoryService.insertItem(items[i]);
  }
};

const saveAuthors = async items => {
  for (let i = 0; i < items?.length; i++) {
    await AuthorService.insertItem(items[i]);
  }
};

const saveTranslators = async items => {
  for (let i = 0; i < items?.length; i++) {
    await TranslatorService.insertItem(items[i]);
  }
};

const saveSpeakers = async items => {
  for (let i = 0; i < items?.length; i++) {
    await SpeakerService.insertItem(items[i]);
  }
};

const getStoryCategories = async () => {
  const items = await StoryCategoryService.getItems();

  for (let i = 0; i < items?.length; i++) {
    items[i].stories = await StoryService.getItems(items[i].id);
  }

  return items;
};
