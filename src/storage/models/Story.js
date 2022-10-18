import SqliteConnection from './SqliteConnection';

const sqlite = new SqliteConnection(createTableSqls);
const tblName = 'tbl_stories';

function createTableSqls() {
  let dropSql = `DROP TABLE IF EXISTS ${tblName}`;
  let createSql = `CREATE TABLE IF NOT EXISTS ${tblName} (id INTEGER PRIMARY KEY AUTOINCREMENT,server_story_id INTEGER,story_category_id INTEGER,title VARCHAR(255),thumbnail VARCHAR(255),image VARCHAR(255),created_at VARCHAR(20),updated_at VARCHAR(20)`;

  return {dropSql, createSql};
}

class Story {
  constructor() {}

  getItem = async id => {
    let items = await sqlite.select(`SELECT * FROM ${tblName} WHERE id=${id}`);

    return items.length > 0 ? items[0] : null;
  };

  getItems = async storyCategoryId => {
    return await sqlite.select(
      `SELECT * FROM ${tblName} WHERE story_category_id=${storyCategoryId} ORDER BY created_at,id DESC`,
    );
  };

  dropTable = async () => {
    return await sqlite.execute(`DROP TABLE IF EXISTS ${tblName}`);
  };
}

export default Story;
