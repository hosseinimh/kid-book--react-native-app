import {utils} from '../../utils';
import SqliteConnection, {PAGE_ITEMS} from './SqliteConnection';

const sqlite = new SqliteConnection(createTableSqls);
const tblName = 'tbl_story_categories';

function createTableSqls() {
  let dropSql = `DROP TABLE IF EXISTS ${tblName}`;
  let createSql = `CREATE TABLE IF NOT EXISTS ${tblName} (id INTEGER PRIMARY KEY AUTOINCREMENT,server_story_category_id INTEGER,title VARCHAR(255),created_at VARCHAR(20),updated_at VARCHAR(20))`;

  return {dropSql, createSql};
}

class StoryCategory {
  constructor() {}

  getItemByServerId = async serverStoryCategoryId => {
    let items = await sqlite.select(
      `SELECT * FROM ${tblName} WHERE server_story_category_id=${serverStoryCategoryId}`,
    );

    return items?.length > 0 ? items[0] : null;
  };

  getItems = async (pageNumber = 1) => {
    return await sqlite.select(
      `SELECT * FROM ${tblName} ORDER BY created_at,id DESC LIMIT ${
        (pageNumber - 1) * PAGE_ITEMS
      },${PAGE_ITEMS}`,
    );
  };

  insert = async (serverCategoryId, title) => {
    let dateTime = utils.getDateTime();

    return await sqlite.execute(
      `INSERT INTO ${tblName} (server_story_category_id,title,created_at,updated_at) VALUES (${serverCategoryId},'${title}','${dateTime}',null)`,
    );
  };

  createTable = async () => {
    return await sqlite.handleCreateTable();
  };

  dropTable = async () => {
    return await sqlite.execute(`DROP TABLE IF EXISTS ${tblName}`);
  };
}

export default StoryCategory;
