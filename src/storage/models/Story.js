import {utils} from '../../utils';
import SqliteConnection, {PAGE_ITEMS} from './SqliteConnection';

const sqlite = new SqliteConnection(createTableSqls);
const tblName = 'tbl_stories';

function createTableSqls() {
  let dropSql = `DROP TABLE IF EXISTS ${tblName}`;
  let createSql = `CREATE TABLE IF NOT EXISTS ${tblName} (id INTEGER PRIMARY KEY AUTOINCREMENT,server_story_id INTEGER,story_category_id INTEGER,title VARCHAR(255),thumbnail VARCHAR(255),server_thumbnail VARCHAR(255),server_image VARCHAR(255),image VARCHAR(255),audio VARCHAR(255),server_audio VARCHAR(255),created_at VARCHAR(20),updated_at VARCHAR(20))`;

  return {dropSql, createSql};
}

class Story {
  constructor() {}

  getItemByServerId = async serverStoryId => {
    let items = await sqlite.select(
      `SELECT * FROM ${tblName} WHERE server_story_id=${serverStoryId}`,
    );

    return items?.length > 0 ? items[0] : null;
  };

  getItems = async (storyCategoryId, pageNumber = 1) => {
    return await sqlite.select(
      `SELECT * FROM ${tblName} WHERE story_category_id=${storyCategoryId} ORDER BY CAST(id AS INTEGER) LIMIT ${
        (pageNumber - 1) * PAGE_ITEMS
      },${PAGE_ITEMS}`,
    );
  };

  getFileItems = async () => {
    return await sqlite.select(
      `SELECT thumbnail,image,audio FROM ${tblName} WHERE thumbnail IS NOT null OR image IS NOT null OR audio IS NOT null`,
    );
  };

  insert = async (
    serverStoryId,
    storyCategoryId,
    title,
    serverThumbnail,
    serverImage,
    serverAudio,
  ) => {
    let dateTime = utils.getDateTime();

    title = utils.prepareStr(title);
    serverThumbnail = utils.prepareStr(serverThumbnail, null);
    serverImage = utils.prepareStr(serverImage, null);
    serverAudio = utils.prepareStr(serverAudio, null);

    return await sqlite.execute(
      `INSERT INTO ${tblName} (server_story_id,story_category_id,title,thumbnail,server_thumbnail,image,server_image,audio,server_audio,created_at,updated_at) VALUES (${serverStoryId},${storyCategoryId},${title},null,${serverThumbnail},null,${serverImage},null,${serverAudio},'${dateTime}',null)`,
    );
  };

  updateThumbnail = async (serverStoryId, thumbnail) => {
    let dateTime = utils.getDateTime();

    thumbnail = utils.prepareStr(thumbnail, null);

    return await sqlite.execute(
      `UPDATE ${tblName} SET thumbnail=${thumbnail},updated_at='${dateTime}' WHERE server_story_id=${serverStoryId}`,
    );
  };

  updateImage = async (serverStoryId, image) => {
    let dateTime = utils.getDateTime();

    image = utils.prepareStr(image, null);

    return await sqlite.execute(
      `UPDATE ${tblName} SET image=${image},updated_at='${dateTime}' WHERE server_story_id=${serverStoryId}`,
    );
  };

  updateAudio = async (serverStoryId, audio) => {
    let dateTime = utils.getDateTime();

    audio = utils.prepareStr(audio, null);

    return await sqlite.execute(
      `UPDATE ${tblName} SET audio=${audio},updated_at='${dateTime}' WHERE server_story_id=${serverStoryId}`,
    );
  };

  createTable = async () => {
    return await sqlite.handleCreateTable();
  };

  dropTable = async () => {
    return await sqlite.execute(`DROP TABLE IF EXISTS ${tblName}`);
  };
}

export default Story;
