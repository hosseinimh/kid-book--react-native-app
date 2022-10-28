import {utils} from '../../utils';
import SqliteConnection, {PAGE_ITEMS} from './SqliteConnection';

const sqlite = new SqliteConnection(createTableSqls);
const tblName = 'tbl_stories';

function createTableSqls() {
  let dropSql = `DROP TABLE IF EXISTS ${tblName}`;
  let createSql = `CREATE TABLE IF NOT EXISTS ${tblName} (id INTEGER PRIMARY KEY AUTOINCREMENT,server_story_id INTEGER,story_category_id INTEGER,title VARCHAR(255),thumbnail VARCHAR(255),image VARCHAR(255),created_at VARCHAR(20),updated_at VARCHAR(20))`;

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
      `SELECT * FROM ${tblName} WHERE story_category_id=${storyCategoryId} ORDER BY id DESC LIMIT ${
        (pageNumber - 1) * PAGE_ITEMS
      },${PAGE_ITEMS}`,
    );
  };

  insert = async (serverStoryId, storyCategoryId, title, thumbnail, image) => {
    let dateTime = utils.getDateTime();

    title = utils.prepareStr(title);
    thumbnail = utils.prepareStr(thumbnail, null);
    image = utils.prepareStr(image, null);

    return await sqlite.execute(
      `INSERT INTO ${tblName} (server_story_id,story_category_id,title,thumbnail,image,created_at,updated_at) VALUES (${serverStoryId},${storyCategoryId},${title},${thumbnail},${image},'${dateTime}',null)`,
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
