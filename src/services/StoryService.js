import {SettingsService} from '.';
import {Story as Model} from '../storage/models';
import {Story as Entity} from '../http/entities';
import {ResourceUrls} from '../constants';
import {utils} from '../utils';

const resourceThumbnailUrl = ResourceUrls.STORY_THUMBNAIL;
const resourceImageUrl = ResourceUrls.STORY_IMAGE;

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
  const model = new Model();
  const isConnected = await SettingsService.isConnected();

  if (!isConnected || (await model.getItemByServerId(item.id))) {
    return false;
  }

  if (item.thumbnail) {
    item.thumbnail = await downloadImage(
      `${resourceThumbnailUrl}/${item.thumbnail}`,
    );
  }

  if (item.image) {
    item.image = await downloadImage(`${resourceImageUrl}/${item.image}`);
  }

  return await model.insert(
    item.id,
    item.story_category_id,
    item.title,
    item.thumbnail,
    item.image,
  );
};

const downloadImage = async url => {
  const filename = new Date().valueOf() + '.jpg';

  return await utils.downloadAsync(url, filename);
};

const handleGet = async id => {
  const model = new Model();
  const record = await model.getItemByServerId(id);

  if (record) {
    return {
      id: record.server_story_id,
      story_category_id: record.story_category_id,
      title: record.title,
      thumbnail: record.thumbnail,
      image: record.image,
    };
  }

  return null;
};

const handleGetServer = async id => {
  const model = new Model();
  const entity = new Entity();
  let result = await entity.get(id);

  if (result?.item) {
    let thumbnail = result.item.thumbnail;
    let image = result.item.image;

    if (thumbnail) {
      thumbnail = await downloadImage(`${resourceThumbnailUrl}/${thumbnail}`);
    }

    if (image) {
      image = await downloadImage(`${resourceImageUrl}/${image}`);
    }

    await model.insert(
      id,
      result.item.story_category_id,
      result.item.title,
      thumbnail,
      image,
    );

    return {
      id: result.item.id,
      story_category_id: result.item.story_category_id,
      title: result.item.title,
      thumbnail,
      image,
    };
  }

  return null;
};

const handleGetItems = async (storyCategroyId, page) => {
  let items = [];
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
      });
    });
  }

  return items.length > 0 ? items : null;
};

const handleGetServerItems = async (storyCategroyId, page) => {
  let items = [];
  const model = new Model();
  const entity = new Entity();
  const result = await entity.paginate(storyCategroyId, page);

  if (result?.items) {
    result?.items.forEach(async item => {
      let thumbnail = item.thumbnail;
      let image = item.image;

      if (thumbnail) {
        thumbnail = await downloadImage(`${resourceThumbnailUrl}/${thumbnail}`);
      }

      if (image) {
        image = await downloadImage(`${resourceImageUrl}/${image}`);
      }

      if (!(await model.getItemByServerId(item.id))) {
        await model.insert(
          item.id,
          item.story_category_id,
          item.title,
          thumbnail,
          image,
        );
      }

      items.push({
        id: item.id,
        story_category_id: item.story_category_id,
        title: item.title,
        thumbnail: thumbnail,
        image: image,
      });
    });
  }

  return items.length > 0 ? items : null;
};
