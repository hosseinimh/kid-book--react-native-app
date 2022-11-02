import {utils} from '../../utils';
import SqliteConnection, {PAGE_ITEMS} from './SqliteConnection';

const sqlite = new SqliteConnection(createTableSqls);
const tblName = 'tbl_speakers';

function createTableSqls() {
  let dropSql = `DROP TABLE IF EXISTS ${tblName}`;
  let createSql = `CREATE TABLE IF NOT EXISTS ${tblName} (id INTEGER PRIMARY KEY AUTOINCREMENT,server_speaker_id INTEGER,name VARCHAR(255),family VARCHAR(255),description TEXT,avatar VARCHAR(255),server_avatar VARCHAR(255),created_at VARCHAR(20),updated_at VARCHAR(20))`;

  return {dropSql, createSql};
}

class Speaker {
  constructor() {}

  getItemByServerId = async serverSpeakerId => {
    let items = await sqlite.select(
      `SELECT * FROM ${tblName} WHERE server_speaker_id=${serverSpeakerId}`,
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

  getFileItems = async () => {
    return await sqlite.select(
      `SELECT avatar FROM ${tblName} WHERE avatar IS NOT null`,
    );
  };

  insert = async (serverSpeakerId, name, family, description, serverAvatar) => {
    let dateTime = utils.getDateTime();

    name = utils.prepareStr(name);
    family = utils.prepareStr(family);
    description = utils.prepareStr(description);
    serverAvatar = utils.prepareStr(serverAvatar, null);

    return await sqlite.execute(
      `INSERT INTO ${tblName} (server_speaker_id,name,family,description,avatar,server_avatar,created_at,updated_at) VALUES (${serverSpeakerId},${name},${family},${description},null,${serverAvatar},'${dateTime}',null)`,
    );
  };

  updateAvatar = async (serverSpeakerId, avatar) => {
    let dateTime = utils.getDateTime();

    avatar = utils.prepareStr(avatar, null);

    return await sqlite.execute(
      `UPDATE ${tblName} SET avatar=${avatar},updated_at='${dateTime}' WHERE server_speaker_id=${serverSpeakerId}`,
    );
  };

  createTable = async () => {
    return await sqlite.handleCreateTable();
  };

  dropTable = async () => {
    return await sqlite.execute(`DROP TABLE IF EXISTS ${tblName}`);
  };
}

export default Speaker;
