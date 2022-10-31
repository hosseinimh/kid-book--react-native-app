import {StoryItemType} from '../../constants';
import {utils} from '../../utils';
import SqliteConnection from './SqliteConnection';

const sqlite = new SqliteConnection(createTableSqls);
const tblName = 'tbl_story_items';

function createTableSqls() {
  let dropSql = `DROP TABLE IF EXISTS ${tblName}`;
  let createSql = `CREATE TABLE IF NOT EXISTS ${tblName} (id INTEGER PRIMARY KEY AUTOINCREMENT,server_story_item_id INTEGER,story_id INTEGER,type VARCHAR(20),content TEXT,created_at VARCHAR(20),updated_at VARCHAR(20))`;

  return {dropSql, createSql};
}

class StoryItem {
  constructor() {}

  getItemByServerId = async serverStoryItemId => {
    let items = await sqlite.select(
      `SELECT * FROM ${tblName} WHERE server_story_item_id=${serverStoryItemId}`,
    );

    return items?.length > 0 ? items[0] : null;
  };

  getItems = async storyId => {
    return await sqlite.select(
      `SELECT * FROM ${tblName} WHERE story_id=${storyId} ORDER BY id DESC`,
    );
  };

  getFileItems = async () => {
    return await sqlite.select(
      `SELECT content FROM ${tblName} WHERE type LIKE "${StoryItemType.IMAGE}" AND content IS NOT null`,
    );
  };

  insert = async (serverStoryItemId, storyId, type, content) => {
    let dateTime = utils.getDateTime();

    type = utils.prepareStr(type);
    content = utils.prepareStr(content, null);

    return await sqlite.execute(
      `INSERT INTO ${tblName} (server_story_item_id,story_id,type,content,created_at,updated_at) VALUES (${serverStoryItemId},${storyId},${type},${content},'${dateTime}',null)`,
    );
  };

  createTable = async () => {
    return await sqlite.handleCreateTable();
  };

  dropTable = async () => {
    return await sqlite.execute(`DROP TABLE IF EXISTS ${tblName}`);
  };
}

export default StoryItem;
