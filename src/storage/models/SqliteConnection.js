import SQLite from 'react-native-sqlite-storage';

import {STORAGE} from '../../constants';
import {Settings, User, Story, StoryCategory} from './index';

class SqliteConnection {
  constructor(createTableSqls = null, openDatabase = true) {
    if (openDatabase) {
      this.db = SQLite.openDatabase(
        {
          name: STORAGE.DB_NAME,
          location: STORAGE.LOCATION,
        },
        () => {},
        error => {
          throw error;
        },
      );
      if (createTableSqls) {
        this.createTableSqls = createTableSqls;
      }
    }
  }

  getDb() {
    return this.db;
  }

  async dropDb() {
    const user = new User();
    const settings = new Settings();
    const story = new Story();
    const storyCategory = new StoryCategory();

    await user.dropTable();
    await settings.dropTable();
    await story.dropTable();
    await storyCategory.dropTable();
  }

  async handleCreateTable() {
    if (this.createTableSqls && typeof this.createTableSqls === 'function') {
      let {dropSql, createSql} = this.createTableSqls();

      await this.execute(dropSql);
      await this.execute(createSql);
    }
  }

  select(sql, parameters = []) {
    return new Promise((resolve, reject) => {
      let items = [];

      this.db.transaction(tx => {
        tx.executeSql(
          sql,
          [...parameters],
          (_, results) => {
            for (let i = 0; i < results.rows.length; i++) {
              items.push(results.rows.item(i));
            }

            resolve(items);
          },
          error => {
            if (error?.code === 0) {
              resolve(0);
            }

            resolve(null);
          },
        );
      });
    });
  }

  execute(sql) {
    return new Promise((resolve, reject) => {
      this.db.transaction(tx => {
        tx.executeSql(
          sql,
          [],
          (_, results) => {
            resolve(results.rows.rowsAffected > 0 ? true : false);
          },
          error => {
            // console.log(error);
            resolve(null);
          },
        );
      });
    });
  }
}

export default SqliteConnection;
