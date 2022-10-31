import {Author as Model} from '../storage/models';
import {Author as Entity} from '../http/entities';
import {ResourceUrls} from '../constants';
import {utils} from '../utils';
import {SettingsService} from '.';

const resourceUrl = ResourceUrls.AUTHOR_IMAGE;

export const getItem = async id => {
  if ((result = await handleGet(id))) {
    return result;
  }

  const isConnected = await SettingsService.isConnected();

  return isConnected ? await handleGetServer(id) : null;
};

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
    const isConnected = await SettingsService.isConnected();

    if (!isConnected || (await model.getItemByServerId(item.id))) {
      return false;
    }

    if (item.avatar) {
      item.avatar = await utils.downloadImage(`${resourceUrl}${item.avatar}`);
    }

    return await model.insert(
      item.id,
      item.name,
      item.family,
      item.description,
      item.avatar,
    );
  } catch {}

  return false;
};

export const sumFileSizes = async () => {
  let total = 0;

  try {
    const model = new Model();
    let items = await model.getFileItems();

    for (let i = 0; i < items?.length; i++) {
      total += await utils.fileInfo('file:/' + items[i].avatar);
    }
  } catch {}

  return total;
};

export const deleteFiles = async () => {
  try {
    const model = new Model();
    let items = await model.getFileItems();

    for (let i = 0; i < items?.length; i++) {
      await utils.deleteFile('file:/' + items[i].avatar);
    }
  } catch {}
};

const handleGet = async id => {
  try {
    const model = new Model();
    const record = await model.getItemByServerId(id);

    if (record) {
      return {
        id: record.server_author_id,
        name: record.name,
        family: record.family,
        description: record.description,
        avatar: record.avatar,
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
      let avatar = result.item.avatar;

      if (avatar) {
        avatar = await utils.downloadImage(`${resourceUrl}/${avatar}`);
      }

      await model.insert(
        id,
        result.item.name,
        result.item.family,
        result.item.description,
        avatar,
      );

      return {
        id: result.item.id,
        name: result.item.name,
        family: result.item.family,
        description: result.item.description,
        avatar: avatar,
      };
    }
  } catch {}

  return null;
};

const handleGetItems = async page => {
  let items = [];

  try {
    const model = new Model();
    const records = await model.getItems(page);

    if (records) {
      for (let i = 0; i < records.length; i++) {
        items.push({
          id: records[i].server_author_id,
          name: records[i].name,
          family: records[i].family,
          description: records[i].description,
          avatar: records[i].avatar,
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
      for (let i = 0; i < result.items?.length; i++) {
        let avatar = result.items[i].avatar;

        if (avatar) {
          avatar = await utils.downloadImage(`${resourceUrl}/${avatar}`);
        }

        if (!(await model.getItemByServerId(result.items[i].id))) {
          await model.insert(
            result.items[i].id,
            result.items[i].name,
            result.items[i].family,
            result.items[i].description,
            avatar,
          );
        }

        items.push({
          id: result.items[i].id,
          name: result.items[i].name,
          family: result.items[i].family,
          description: result.items[i].description,
          avatar: avatar,
        });
      }
    }
  } catch {}

  return items.length > 0 ? items : null;
};
