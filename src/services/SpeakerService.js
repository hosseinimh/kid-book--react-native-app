import {Speaker as Model} from '../storage/models';
import {Speaker as Entity} from '../http/entities';
import {ResourceUrls} from '../constants';
import {utils} from '../utils';
import {SettingsService} from '.';

const resourceUrl = ResourceUrls.SPEAKER_IMAGE;

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
  const model = new Model();
  const isConnected = await SettingsService.isConnected();

  if (!isConnected || (await model.getItemByServerId(item.id))) {
    return false;
  }

  if (item.avatar) {
    item.avatar = await downloadImage(`${resourceUrl}/${item.avatar}`);
  }

  return await model.insert(
    item.id,
    item.name,
    item.family,
    item.description,
    item.avatar,
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
      id: record.server_speaker_id,
      name: record.name,
      family: record.family,
      description: record.description,
      avatar: record.avatar,
    };
  }

  return null;
};

const handleGetServer = async id => {
  const model = new Model();
  const entity = new Entity();
  let result = await entity.get(id);

  if (result?.item) {
    let avatar = result.item.avatar;

    if (avatar) {
      avatar = await downloadImage(`${resourceUrl}/${avatar}`);
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

  return null;
};

const handleGetItems = async page => {
  let items = [];
  const model = new Model();
  const records = await model.getItems(page);

  if (records) {
    for (let i = 0; i < records.length; i++) {
      items.push({
        id: records[i].server_speaker_id,
        name: records[i].name,
        family: records[i].family,
        description: records[i].description,
        avatar: records[i].avatar,
      });
    }
  }

  return items.length > 0 ? items : null;
};

const handleGetServerItems = async page => {
  let items = [];
  const model = new Model();
  const entity = new Entity();
  const result = await entity.paginate(page);

  if (result?.items) {
    for (let i = 0; i < result.items.length; i++) {
      let avatar = result.items[i].avatar;

      if (avatar) {
        avatar = await downloadImage(`${resourceUrl}/${avatar}`);
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

  return items.length > 0 ? items : null;
};
