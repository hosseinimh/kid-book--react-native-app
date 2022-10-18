import utils from '../../utils/utils';
import SqliteConnection from './SqliteConnection';

const sqlite = new SqliteConnection(createTableSqls);
const tblName = 'tbl_users';

function createTableSqls() {
  let dropSql = `DROP TABLE IF EXISTS ${tblName}`;
  let createSql = `CREATE TABLE IF NOT EXISTS ${tblName} (id INTEGER PRIMARY KEY AUTOINCREMENT,uuid VARCHAR(100),created_at VARCHAR(20),updated_at VARCHAR(20))`;

  return {dropSql, createSql};
}

async function handleGet(create = true) {
  let items = await sqlite.select(`SELECT * FROM ${tblName} ORDER BY id DESC`);

  if (items === 0 && create) {
    await sqlite.handleCreateTable();

    items = await sqlite.select(`SELECT * FROM ${tblName} ORDER BY id DESC`);
  }

  return items?.length > 0 ? items[0] : null;
}

class User {
  constructor() {}

  get = async () => {
    let item = await handleGet();

    if (item) {
      return item;
    }

    await this.insert();

    return await handleGet(false);
  };

  insert = async () => {
    let dateTime = utils.getDateTime();

    return await sqlite.execute(
      `INSERT INTO ${tblName} (uuid,created_at,updated_at) VALUES (null,'${dateTime}',null)`,
    );
  };

  updateUUID = async uuid => {
    let dateTime = utils.getDateTime();

    return await sqlite.execute(
      `UPDATE ${tblName} SET uuid='${uuid}',updated_at='${dateTime}'`,
    );
  };

  dropTable = async () => {
    return await sqlite.execute(`DROP TABLE IF EXISTS ${tblName}`);
  };
}

export default User;
