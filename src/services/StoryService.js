import {SettingsService} from '.';
import {Story as Model} from '../storage/models';
import {Story as Entity} from '../http/entities';
import {ResourceUrls} from '../constants';
import {utils} from '../utils';

const resourceThumbnailUrl = ResourceUrls.STORY_THUMBNAIL;
const resourceImageUrl = ResourceUrls.STORY_IMAGE;
const resourceAudioUrl = ResourceUrls.STORY_AUDIO;

export const getItem = async id => {
  if ((result = await handleGet(id))) {
    return result;
  }

  const isConnected = await SettingsService.isConnected();

  return isConnected ? await handleGetServer(id) : null;
};

export const getItems = async (storyCategoryId, page = 1) => {
  if ((result = await handleGetItems(storyCategoryId, page))) {
    return result;
  }

  const isConnected = await SettingsService.isConnected();

  return isConnected ? await handleGetServerItems(storyCategoryId, page) : null;
};

export const insertItem = async item => {
  try {
    const model = new Model();
    const isConnected = await SettingsService.isConnected();

    if (!isConnected || (await model.getItemByServerId(item.id))) {
      return false;
    }

    if (item.thumbnail) {
      item.thumbnail = await utils.downloadImage(
        `${resourceThumbnailUrl}/${item.thumbnail}`,
      );
    }

    if (item.image) {
      item.image = await utils.downloadImage(
        `${resourceImageUrl}${item.image}`,
      );
    }

    return await model.insert(
      item.id,
      item.story_category_id,
      item.title,
      item.thumbnail,
      item.image,
      item.audio,
    );
  } catch {}

  return false;
};

export const downloadAudioItem = async item => {
  let audio = null;

  try {
    const model = new Model();
    const isConnected = await SettingsService.isConnected();

    if (!isConnected) {
      return false;
    }

    if (item.server_audio) {
      audio = await utils.downloadAudio(
        `${resourceAudioUrl}/${item.server_audio}`,
      );
    }

    return (await model.update(item.id, audio)) ? audio : null;
  } catch {}

  return false;
};

export const sumFileSizes = async () => {
  let total = 0;

  try {
    const model = new Model();
    let items = await model.getFileItems();

    for (let i = 0; i < items?.length; i++) {
      total += await utils.fileInfo('file:/' + items[i].thumbnail);
      total += await utils.fileInfo('file:/' + items[i].image);
      total += await utils.fileInfo('file:/' + items[i].audio);
    }
  } catch {}

  return total;
};

export const deleteFiles = async () => {
  try {
    const model = new Model();
    let items = await model.getFileItems();

    for (let i = 0; i < items?.length; i++) {
      await utils.deleteFile('file:/' + items[i].thumbnail);
      await utils.deleteFile('file:/' + items[i].image);
      await utils.deleteFile('file:/' + items[i].audio);
    }
  } catch {}
};

const handleGet = async id => {
  try {
    const model = new Model();
    const record = await model.getItemByServerId(id);

    if (record) {
      return {
        id: record.server_story_id,
        story_category_id: record.story_category_id,
        title: record.title,
        thumbnail: record.thumbnail,
        image: record.image,
        server_audio: record.server_audio,
        audio: record.audio,
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
      let thumbnail = result.item.thumbnail;
      let image = result.item.image;

      if (thumbnail) {
        thumbnail = await utils.downloadImage(
          `${resourceThumbnailUrl}${thumbnail}`,
        );
      }

      if (image) {
        image = await utils.downloadImage(`${resourceImageUrl}${image}`);
      }

      await model.insert(
        id,
        result.item.story_category_id,
        result.item.title,
        thumbnail,
        image,
        result.item.audio,
      );

      return {
        id: result.item.id,
        story_category_id: result.item.story_category_id,
        title: result.item.title,
        thumbnail,
        image,
        server_audio: result.item.audio,
        audio: null,
      };
    }
  } catch {}

  return null;
};

const handleGetItems = async (storyCategroyId, page) => {
  let items = [];

  try {
    const model = new Model();
    const records = await model.getItems(storyCategroyId, page);

    if (records) {
      records.forEach(record => {
        items.push({
          id: record.server_story_id,
          story_category_id: record.story_category_id,
          title: record.title,
          thumbnail: record.thumbnail,
          image: record.image,
          server_audio: record.server_audio,
          audio: record.audio,
        });
      });
    }
  } catch {}

  return items.length > 0 ? items : null;
};

const handleGetServerItems = async (storyCategroyId, page) => {
  let items = [];

  try {
    const model = new Model();
    const entity = new Entity();
    const result = await entity.paginate(storyCategroyId, page);

    if (result?.items) {
      result?.items.forEach(async item => {
        let thumbnail = item.thumbnail;
        let image = item.image;

        if (thumbnail) {
          thumbnail = await utils.downloadImage(
            `${resourceThumbnailUrl}${thumbnail}`,
          );
        }

        if (image) {
          image = await utils.downloadImage(`${resourceImageUrl}${image}`);
        }

        if (!(await model.getItemByServerId(item.id))) {
          await model.insert(
            item.id,
            item.story_category_id,
            item.title,
            thumbnail,
            image,
            item.audio,
          );
        }

        items.push({
          id: item.id,
          story_category_id: item.story_category_id,
          title: item.title,
          thumbnail: thumbnail,
          image: image,
          server_audio: item.audio,
          audio: null,
        });
      });
    }
  } catch {}

  return items.length > 0 ? items : null;
};
