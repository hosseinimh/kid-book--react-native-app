import utils from '../../utils/utils';
import SqliteConnection from './SqliteConnection';

const sqlite = new SqliteConnection(createTableSqls);
const tblName = 'tbl_users';

function createTableSqls() {
  let dropSql = `DROP TABLE IF EXISTS ${tblName}`;
  let createSql = `CREATE TABLE IF NOT EXISTS ${tblName} (id INTEGER PRIMARY KEY AUTOINCREMENT,username VARCHAR(100),created_at VARCHAR(20),updated_at VARCHAR(20))`;

  return {dropSql, createSql};
}

async function handleGet() {
  let items = await sqlite.select(`SELECT * FROM ${tblName} ORDER BY id DESC`);

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

    return await handleGet();
  };

  insert = async () => {
    let dateTime = utils.getDateTime();

    return await sqlite.execute(
      `INSERT INTO ${tblName} (username,created_at,updated_at) VALUES (null,'${dateTime}',null)`,
    );
  };

  updateUsername = async username => {
    let dateTime = utils.getDateTime();

    return await sqlite.execute(
      `UPDATE ${tblName} SET username='${username}',updated_at='${dateTime}'`,
    );
  };

  createTable = async () => {
    return await sqlite.handleCreateTable();
  };

  dropTable = async () => {
    return await sqlite.execute(`DROP TABLE IF EXISTS ${tblName}`);
  };
}

export default User;
