import {SettingsService, StoryService} from '.';
import {StoryCategory as Model} from '../storage/models';
import {StoryCategory as Entity} from '../http/entities';

export const getItems = async (page = 1) => {
  if ((result = await handleGetItems(page))) {
    return result;
  }

  const isConnected = await SettingsService.isConnected();

  return isConnected ? await handleGetServerItems(page) : null;
};

export const insertItem = async item => {
  try {
    const model = new Model();

    if (await model.getItemByServerId(item.id)) {
      return false;
    }

    const result = await model.insert(item.id, item.title);

    if (result) {
      for (let i = 0; i < item.stories?.length; i++) {
        await StoryService.insertItem(item.stories[i]);
      }
    }

    return result;
  } catch {}

  return false;
};

const handleGetItems = async page => {
  let items = [];

  try {
    const model = new Model();
    const records = await model.getItems(page);

    if (records) {
      for (let i = 0; i < records.length; i++) {
        items.push({
          id: records[i].server_story_category_id,
          title: records[i].title,
        });
      }
    }
  } catch {}

  return items.length > 0 ? items : null;
};

const handleGetServerItems = async page => {
  let items = [];

  try {
    const model = new Model();
    const entity = new Entity();
    const result = await entity.paginate(page);

    if (result?.items) {
      for (let i = 0; i < result.items.length; i++) {
        if (!(await model.getItemByServerId(result.items[i].id))) {
          await model.insert(result.items[i].id, result.items[i].title);
        }

        items.push({
          id: result.items[i].id,
          title: result.items[i].title,
        });
      }
    }
  } catch {}

  return items.length > 0 ? items : null;
};
