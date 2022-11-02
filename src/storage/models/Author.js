import {utils} from '../../utils';
import SqliteConnection, {PAGE_ITEMS} from './SqliteConnection';

const sqlite = new SqliteConnection(createTableSqls);
const tblName = 'tbl_authors';

function createTableSqls() {
  let dropSql = `DROP TABLE IF EXISTS ${tblName}`;
  let createSql = `CREATE TABLE IF NOT EXISTS ${tblName} (id INTEGER PRIMARY KEY AUTOINCREMENT,server_author_id INTEGER,name VARCHAR(255),family VARCHAR(255),description TEXT,avatar VARCHAR(255),server_avatar VARCHAR(255),created_at VARCHAR(20),updated_at VARCHAR(20))`;

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
      `SELECT * FROM ${tblName} ORDER BY CAST(id AS INTEGER) LIMIT ${
        (pageNumber - 1) * PAGE_ITEMS
      },${PAGE_ITEMS}`,
    );
  };

  getFileItems = async () => {
    return await sqlite.select(
      `SELECT avatar FROM ${tblName} WHERE avatar IS NOT null`,
    );
  };

  insert = async (serverAuthorId, name, family, description, serverAvatar) => {
    let dateTime = utils.getDateTime();

    name = utils.prepareStr(name);
    family = utils.prepareStr(family);
    description = utils.prepareStr(description);
    serverAvatar = utils.prepareStr(serverAvatar, null);

    return await sqlite.execute(
      `INSERT INTO ${tblName} (server_author_id,name,family,description,avatar,server_avatar,created_at,updated_at) VALUES (${serverAuthorId},${name},${family},${description},null,${serverAvatar},'${dateTime}',null)`,
    );
  };

  updateAvatar = async (serverAuthorId, avatar) => {
    let dateTime = utils.getDateTime();

    avatar = utils.prepareStr(avatar, null);

    return await sqlite.execute(
      `UPDATE ${tblName} SET avatar=${avatar},updated_at='${dateTime}' WHERE server_author_id=${serverAuthorId}`,
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
