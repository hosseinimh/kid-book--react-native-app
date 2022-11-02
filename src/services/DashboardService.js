import {
  AuthorService,
  SettingsService,
  SpeakerService,
  StoryCategoryService,
  StoryItemService,
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
  try {
    for (let i = 0; i < items?.length; i++) {
      await StoryCategoryService.insertItem(items[i]);

      for (let j = 0; j < items[i]?.stories?.length; j++) {
        await StoryService.insertItem(items[i].stories[j]);

        // for (let k = 0; k < items[i]?.stories[j]?.storyItems?.length; k++) {
        //   await StoryItemService.insertItem(items[i].stories[j].storyItems[k]);
        // }
      }
    }
  } catch {}
};

const saveAuthors = async items => {
  try {
    for (let i = 0; i < items?.length; i++) {
      await AuthorService.insertItem(items[i]);
    }
  } catch {}
};

const saveTranslators = async items => {
  try {
    for (let i = 0; i < items?.length; i++) {
      await TranslatorService.insertItem(items[i]);
    }
  } catch {}
};

const saveSpeakers = async items => {
  try {
    for (let i = 0; i < items?.length; i++) {
      await SpeakerService.insertItem(items[i]);
    }
  } catch {}
};

const getStoryCategories = async () => {
  try {
    const items = await StoryCategoryService.getItems();

    for (let i = 0; i < items?.length; i++) {
      items[i].stories = await StoryService.getItems(items[i].id);
    }

    return items;
  } catch {}

  return null;
};
