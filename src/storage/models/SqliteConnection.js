import SQLite from 'react-native-sqlite-storage';

import {STORAGE} from '../../constants';
import {
  Settings,
  User,
  Story,
  StoryCategory,
  Author,
  Speaker,
  Translator,
} from './index';

export const PAGE_ITEMS = 10;

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
    const author = new Author();
    const speaker = new Speaker();
    const translator = new Translator();

    await user.dropTable();
    await settings.dropTable();
    await story.dropTable();
    await storyCategory.dropTable();
    await author.dropTable();
    await speaker.dropTable();
    await translator.dropTable();
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
      this.db.transaction(tx => {
        tx.executeSql(
          sql,
          [...parameters],
          (_, results) => {
            let items = [];

            for (let i = 0; i < results.rows.length; i++) {
              items.push(results.rows.item(i));
            }

            resolve(items.length > 0 ? items : null);
          },
          error => {
            console.warn('select', error);
            // if (error?.code === 0) {
            //   resolve(0);
            // }

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
            resolve(results.rowsAffected > 0 ? true : false);
          },
          error => {
            console.warn('execute', error);
            resolve(false);
          },
        );
      });
    });
  }
}

export default SqliteConnection;
