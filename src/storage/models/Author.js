import {utils} from '../../utils';
import SqliteConnection, {PAGE_ITEMS} from './SqliteConnection';

const sqlite = new SqliteConnection(createTableSqls);
const tblName = 'tbl_authors';

function createTableSqls() {
  let dropSql = `DROP TABLE IF EXISTS ${tblName}`;
  let createSql = `CREATE TABLE IF NOT EXISTS ${tblName} (id INTEGER PRIMARY KEY AUTOINCREMENT,server_author_id INTEGER,name VARCHAR(255),family VARCHAR(255),description TEXT,avatar VARCHAR(255),created_at VARCHAR(20),updated_at VARCHAR(20))`;

  return {dropSql, createSql};
}

class Author {
  constructor() {}

  getItemByServerId = async serverAuthorId => {
    let items = await sqlite.select(
      `SELECT * FROM ${tblName} WHERE server_author_id=${serverAuthorId}`,
    );

    return items?.length > 0 ? items[0] : null;
  };

  getItems = async (pageNumber = 1) => {
    return await sqlite.select(
      `SELECT * FROM ${tblName} ORDER BY family,name,id DESC LIMIT ${
        (pageNumber - 1) * PAGE_ITEMS
      },${PAGE_ITEMS}`,
    );
  };

  insert = async (serverAuthorId, name, family, description, avatar) => {
    let dateTime = utils.getDateTime();

    name = utils.prepareStr(name);
    family = utils.prepareStr(family);
    description = utils.prepareStr(description);
    avatar = utils.prepareStr(avatar, null);

    return await sqlite.execute(
      `INSERT INTO ${tblName} (server_author_id,name,family,description,avatar,created_at,updated_at) VALUES (${serverAuthorId},${name},${family},${description},${avatar},'${dateTime}',null)`,
    );
  };

  createTable = async () => {
    return await sqlite.handleCreateTable();
  };

  dropTable = async () => {
    return await sqlite.execute(`DROP TABLE IF EXISTS ${tblName}`);
  };
}

export default Author;
