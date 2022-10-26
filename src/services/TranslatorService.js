import {Translator as Model} from '../storage/models';
import {Translator as Entity} from '../http/entities';
import {ResourceUrls} from '../constants';
import {utils} from '../utils';
import {SettingsService} from '.';

const resourceUrl = ResourceUrls.TRANSLATOR_IMAGE;

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
      id: record.server_translator_id,
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
    records.forEach(record => {
      items.push({
        id: record.server_translator_id,
        name: record.name,
        family: record.family,
        description: record.description,
        avatar: record.avatar,
      });
    });
  }

  return items.length > 0 ? items : null;
};

const handleGetServerItems = async page => {
  let items = [];
  const model = new Model();
  const entity = new Entity();
  const result = await entity.paginate(page);

  if (result?.items) {
    result?.items.forEach(async item => {
      let avatar = item.avatar;

      if (avatar) {
        avatar = await downloadImage(`${resourceUrl}/${avatar}`);
      }

      if (!(await model.getItemByServerId(item.id))) {
        await model.insert(
          item.id,
          item.name,
          item.family,
          item.description,
          avatar,
        );
      }

      items.push({
        id: item.id,
        name: item.name,
        family: item.family,
        description: item.description,
        avatar: avatar,
      });
    });
  }

  return items.length > 0 ? items : null;
};
