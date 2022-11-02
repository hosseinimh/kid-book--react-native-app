import {utils} from '../../utils';
import SqliteConnection, {PAGE_ITEMS} from './SqliteConnection';

const sqlite = new SqliteConnection(createTableSqls);
const tblName = 'tbl_translators';

function createTableSqls() {
  let dropSql = `DROP TABLE IF EXISTS ${tblName}`;
  let createSql = `CREATE TABLE IF NOT EXISTS ${tblName} (id INTEGER PRIMARY KEY AUTOINCREMENT,server_translator_id INTEGER,name VARCHAR(255),family VARCHAR(255),description TEXT,avatar VARCHAR(255),server_avatar VARCHAR(255),created_at VARCHAR(20),updated_at VARCHAR(20))`;

  return {dropSql, createSql};
}

class Translator {
  constructor() {}

  getItemByServerId = async serverTranslatorId => {
    let items = await sqlite.select(
      `SELECT * FROM ${tblName} WHERE server_translator_id=${serverTranslatorId}`,
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

  insert = async (
    serverTranslatorId,
    name,
    family,
    description,
    serverAvatar,
  ) => {
    let dateTime = utils.getDateTime();

    name = utils.prepareStr(name);
    family = utils.prepareStr(family);
    description = utils.prepareStr(description);
    serverAvatar = utils.prepareStr(serverAvatar, null);

    return await sqlite.execute(
      `INSERT INTO ${tblName} (server_translator_id,name,family,description,avatar,server_avatar,created_at,updated_at) VALUES (${serverTranslatorId},${name},${family},${description},null,${serverAvatar},'${dateTime}',null)`,
    );
  };

  updateAvatar = async (serverTranslatorId, avatar) => {
    let dateTime = utils.getDateTime();

    avatar = utils.prepareStr(avatar, null);

    return await sqlite.execute(
      `UPDATE ${tblName} SET avatar=${avatar},updated_at='${dateTime}' WHERE server_translator_id=${serverTranslatorId}`,
    );
  };

  createTable = async () => {
    return await sqlite.handleCreateTable();
  };

  dropTable = async () => {
    return await sqlite.execute(`DROP TABLE IF EXISTS ${tblName}`);
  };
}

export default Translator;
