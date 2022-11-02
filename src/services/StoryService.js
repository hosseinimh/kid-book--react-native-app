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

export const downloadAudio = async (item, onBegin, onProgress) => {
  let audio = null;

  try {
    const model = new Model();
    const isConnected = await SettingsService.isConnected();

    if (!isConnected) {
      return null;
    }

    if (item.server_audio) {
      audio = await utils.downloadAudio(
        `${resourceAudioUrl}${item.server_audio}`,
        onBegin,
        onProgress,
      );
    }

    return (await model.updateAudio(item.id, audio)) ? audio : null;
  } catch {}

  return null;
};

export const downloadThumbnail = async item => {
  let thumbnail = null;

  try {
    const model = new Model();
    const isConnected = await SettingsService.isConnected();

    if (!isConnected) {
      return null;
    }

    if (item.server_thumbnail) {
      thumbnail = await utils.downloadImage(
        `${resourceThumbnailUrl}${item.server_thumbnail}`,
      );
    }

    return (await model.updateThumbnail(item.id, thumbnail)) ? image : null;
  } catch {}

  return null;
};

export const downloadImage = async item => {
  let image = null;

  try {
    const model = new Model();
    const isConnected = await SettingsService.isConnected();

    if (!isConnected) {
      return null;
    }

    if (item.server_image) {
      image = await utils.downloadImage(
        `${resourceImageUrl}${item.server_image}`,
      );
    }

    return (await model.updateImage(item.id, image)) ? image : null;
  } catch {}

  return null;
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
        server_thumbnail: record.server_thumbnail,
        image: record.image,
        server_image: record.server_image,
        audio: record.audio,
        server_audio: record.server_audio,
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

      await model.insert(
        id,
        result.item.story_category_id,
        result.item.title,
        result.item.thumbnail,
        result.item.image,
        result.item.audio,
      );

      return {
        id: result.item.id,
        story_category_id: result.item.story_category_id,
        title: result.item.title,
        thumbnail: null,
        server_thumbnail: result.item.thumbnail,
        image: null,
        server_image: result.item.image,
        audio: null,
        server_audio: result.item.audio,
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
      for (let i = 0; i < records.length; i++) {
        items.push({
          id: records[i].server_story_id,
          story_category_id: records[i].story_category_id,
          title: records[i].title,
          thumbnail: records[i].thumbnail,
          server_thumbnail: records[i].server_thumbnail,
          image: records[i].image,
          server_image: records[i].server_image,
          audio: records[i].audio,
          server_audio: records[i].server_audio,
        });
      }
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
      for (let i = 0; i < result.items?.length; i++) {
        if (!(await model.getItemByServerId(result.items[i].id))) {
          await model.insert(
            result.items[i].id,
            result.items[i].story_category_id,
            result.items[i].title,
            result.items[i].thumbnail,
            result.items[i].image,
            result.items[i].audio,
          );
        }

        items.push({
          id: result.items[i].id,
          story_category_id: result.items[i].story_category_id,
          title: result.items[i].title,
          thumbnail: null,
          server_thumbnail: result.items[i].thumbnail,
          image: null,
          server_image: result.items[i].image,
          audio: null,
          server_audio: result.items[i].audio,
        });
      }
    }
  } catch {}

  return items.length > 0 ? items : null;
};
