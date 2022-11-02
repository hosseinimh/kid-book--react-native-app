import utils from '../../utils/utils';
import SqliteConnection from './SqliteConnection';

const {appVersion} = require('../../../app-config.json');

const sqlite = new SqliteConnection(createTableSqls);
const tblName = 'tbl_settings';

function createTableSqls() {
  let dropSql = `DROP TABLE IF EXISTS ${tblName}`;
  let createSql = `CREATE TABLE IF NOT EXISTS ${tblName} (id INTEGER PRIMARY KEY AUTOINCREMENT,app_version VARCHAR(20),token VARCHAR(100),server_connected_at VARCHAR(20),created_at VARCHAR(20),updated_at VARCHAR(20))`;

  return {dropSql, createSql};
}

async function handleGet() {
  let items = await sqlite.select(
    `SELECT * FROM ${tblName} ORDER BY CAST(id AS INTEGER) DESC`,
  );

  return items?.length > 0 ? items[0] : null;
}

class Settings {
  constructor() {}

  get = async () => {
    let item = await handleGet();

    if (item) {
      return item;
    }

    await this.insert();

    return await handleGet();
  };

  insert = async () => {
    let dateTime = utils.getDateTime();

    return await sqlite.execute(
      `INSERT INTO ${tblName} (app_version,token,server_connected_at,created_at,updated_at) VALUES ('${appVersion}',null,null,'${dateTime}',null)`,
    );
  };

  updateToken = async token => {
    let dateTime = utils.getDateTime();
    let serverConnectedAt = token ? `"${dateTime}"` : null;

    token = utils.prepareStr(token, null);

    return await sqlite.execute(
      `UPDATE ${tblName} SET token=${token},server_connected_at=${serverConnectedAt},updated_at='${dateTime}'`,
    );
  };

  createTable = async () => {
    return await sqlite.handleCreateTable();
  };

  dropTable = async () => {
    return await sqlite.execute(`DROP TABLE IF EXISTS ${tblName}`);
  };
}

export default Settings;
