import {SettingsService} from '.';
import {StoryItem as Model} from '../storage/models';
import {StoryItem as Entity} from '../http/entities';
import {ResourceUrls, StoryItemType} from '../constants';
import {utils} from '../utils';

const resourceUrl = ResourceUrls.STORY_ITEM_IMAGE;

export const getItem = async id => {
  if ((result = await handleGet(id))) {
    return result;
  }

  const isConnected = await SettingsService.isConnected();

  return isConnected ? await handleGetServer(id) : null;
};

export const getItems = async storyId => {
  if ((result = await handleGetItems(storyId))) {
    return result;
  }

  const isConnected = await SettingsService.isConnected();

  return isConnected ? await handleGetServerItems(storyId) : null;
};

export const insertItem = async item => {
  try {
    const model = new Model();
    const isConnected = await SettingsService.isConnected();

    if (!isConnected || (await model.getItemByServerId(item.id))) {
      return false;
    }

    if (item.type === StoryItemType.IMAGE && item.content) {
      item.content = await utils.downloadImage(`${resourceUrl}${item.content}`);
    }

    return await model.insert(item.id, item.story_id, item.type, item.content);
  } catch {}

  return false;
};

export const downloadContent = async item => {
  let content = null;

  try {
    const model = new Model();
    const isConnected = await SettingsService.isConnected();

    if (!isConnected) {
      return null;
    }

    if (item.type === StoryItemType.IMAGE && item.server_content) {
      content = await utils.downloadImage(
        `${resourceUrl}${item.server_content}`,
      );
    }

    return (await model.updateContent(item.id, content)) ? content : null;
  } catch {}

  return null;
};

export const sumFileSizes = async () => {
  let total = 0;

  try {
    const model = new Model();
    let items = await model.getFileItems();

    for (let i = 0; i < items?.length; i++) {
      total += await utils.fileInfo('file:/' + items[i].content);
    }
  } catch {}

  return total;
};

export const deleteFiles = async () => {
  try {
    const model = new Model();
    let items = await model.getFileItems();

    for (let i = 0; i < items?.length; i++) {
      await utils.deleteFile('file:/' + items[i].content);
    }
  } catch {}
};

const handleGet = async id => {
  try {
    const model = new Model();
    const record = await model.getItemByServerId(id);

    if (record) {
      return {
        id: record.server_story_item_id,
        story_id: record.story_id,
        type: record.type,
        content: record.content,
        server_content: record.server_content,
      };
    }
  } catch {}

  return null;
};

const handleGetServer = async id => {
  try {
    const model = new Model();
    const entity = new Entity();
    let result = await entity.get(id);

    if (result?.item) {
      await model.insert(
        result.item.id,
        result.item.storyId,
        result.item.type,
        result.item.type === StoryItemType.IMAGE ? null : result.item.content,
        result.item.type !== StoryItemType.IMAGE ? result.item.content : null,
      );

      return {
        id: result.item.server_story_item_id,
        story_id: result.item.story_id,
        type: result.item.type,
        content:
          result.item.type === StoryItemType.IMAGE ? null : result.item.content,
        server_content:
          result.item.type === StoryItemType.IMAGE ? result.item.content : null,
      };
    }
  } catch {}

  return null;
};

const handleGetItems = async storyId => {
  let items = [];

  try {
    const model = new Model();
    const records = await model.getItems(storyId);

    if (records) {
      for (let i = 0; i < records.length; i++) {
        items.push({
          id: records[i].server_story_item_id,
          story_id: records[i].story_id,
          type: records[i].type,
          content: records[i].content,
          server_content: records[i].server_content,
        });
      }
    }
  } catch {}

  return items.length > 0 ? items : null;
};

const handleGetServerItems = async storyId => {
  let items = [];

  try {
    const model = new Model();
    const entity = new Entity();
    const result = await entity.getAll(storyId);

    if (result?.items) {
      for (let i = 0; i < result.items.length; i++) {
        if (!(await model.getItemByServerId(result.items[i].id))) {
          await model.insert(
            result.items[i].id,
            result.items[i].storyId,
            result.items[i].type,
            result.items[i].type === StoryItemType.IMAGE
              ? null
              : result.items[i].content,
            result.items[i].type !== StoryItemType.IMAGE
              ? null
              : result.items[i].content,
          );
        }

        items.push({
          id: result.items[i].id,
          story_id: result.items[i].storyId,
          type: result.items[i].type,
          content:
            result.items[i].type === StoryItemType.IMAGE
              ? null
              : result.items[i].content,
          server_content:
            result.items[i].type === StoryItemType.IMAGE
              ? result.items[i].content
              : null,
        });
      }
    }
  } catch {}

  return items.length > 0 ? items : null;
};
