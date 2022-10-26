import {SettingsService} from '.';
import {StoryItem as Model} from '../storage/models';
import {StoryItem as Entity} from '../http/entities';
import {ResourceUrls, StoryItemType} from '../constants';
import {utils} from '../utils';

const resourceUrl = ResourceUrls.STORY_ITEM_IMAGE;

export const getItems = async storyId => {
  if ((result = await handleGetItems(storyId))) {
    return result;
  }

  const isConnected = await SettingsService.isConnected();

  return isConnected ? await handleGetServerItems(storyId) : null;
};

const downloadContent = async url => {
  const filename = new Date().valueOf() + '.jpg';

  return await utils.downloadAsync(url, filename);
};

const handleGetItems = async storyId => {
  let items = [];
  const model = new Model();
  const records = await model.getItems(storyId);

  if (records) {
    for (let i = 0; i < records.length; i++) {
      items.push({
        id: records[i].server_story_item_id,
        story_id: records[i].story_id,
        type: records[i].type,
        content: records[i].content,
      });
    }
  }

  return items.length > 0 ? items : null;
};

const handleGetServerItems = async storyId => {
  let items = [];
  const model = new Model();
  const entity = new Entity();
  const result = await entity.getAll(storyId);

  if (result?.items) {
    for (let i = 0; i < result.items.length; i++) {
      let content = result.items[i].content;

      if (content && result.items[i].type === StoryItemType.IMAGE) {
        content = await downloadContent(`${resourceUrl}/${content}`);
      }

      if (!(await model.getItemByServerId(result.items[i].id))) {
        await model.insert(
          result.items[i].id,
          result.items[i].storyId,
          result.items[i].type,
          content,
        );
      }

      items.push({
        id: result.items[i].id,
        story_id: result.items[i].storyId,
        type: result.items[i].type,
        content,
      });
    }
  }

  return items.length > 0 ? items : null;
};
