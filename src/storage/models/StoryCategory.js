import SqliteConnection from './SqliteConnection';

const sqlite = new SqliteConnection(createTableSqls);
const tblName = 'tbl_story_categories';

function createTableSqls() {
  let dropSql = `DROP TABLE IF EXISTS ${tblName}`;
  let createSql = `CREATE TABLE IF NOT EXISTS ${tblName} (id INTEGER PRIMARY KEY AUTOINCREMENT,server_story_category_id INTEGER,title VARCHAR(255),created_at VARCHAR(20),updated_at VARCHAR(20))`;

  return {dropSql, createSql};
}

class StoryCategory {
  constructor() {}

  getItem = async id => {
    let items = await sqlite.select(`SELECT * FROM ${tblName} WHERE id=${id}`);

    return items.length > 0 ? items[0] : null;
  };

  getItems = async () => {
    return await sqlite.select(
      `SELECT * FROM ${tblName} ORDER BY created_at,id DESC`,
    );
  };

  insert = async (serverCategoryId, title) => {
    let dateTime = utils.getDateTime();

    return await sqlite.execute(
      `INSERT INTO ${tblName} (server_story_category_id,title,created_at,updated_at) VALUES (null,${serverCategoryId},'${title}','${dateTime}',null)`,
    );
  };

  dropTable = async () => {
    return await sqlite.execute(`DROP TABLE IF EXISTS ${tblName}`);
  };
}

export default StoryCategory;
