import RNRestart from 'react-native-restart';

import {get, post, postFile, postWithoutToken} from '../http';
import {utils} from '../../utils';
import {utils as strings} from '../../constants/strings';
import SqliteConnection from '../../storage/models/SqliteConnection';

class Entity {
  constructor() {
    this.errorMessage = '';
    this.errorCode = 0;
  }

  async handlePost(url, data) {
    try {
      this.errorMessage = '';
      this.errorCode = 0;
      const response = await post(url, data);

      return this.handleResponse(response);
    } catch (error) {
      console.log(error);
      this.errorMessage = error.message;
      this.errorCode = 1000;

      return null;
    }
  }

  async handlePostWithoutToken(url, data) {
    try {
      this.errorMessage = '';
      this.errorCode = 0;
      const response = await postWithoutToken(url, data);

      return this.handleResponse(response);
    } catch (error) {
      console.log(error);
      this.errorMessage = error.message;
      this.errorCode = 1000;

      return null;
    }
  }

  async handleGet(url, data) {
    try {
      this.errorMessage = '';
      this.errorCode = 0;
      const response = await get(url, data);

      return this.handleResponse(response);
    } catch (error) {
      console.log(error);
      this.errorMessage = error.message;
      this.errorCode = 1000;

      return null;
    }
  }

  async handlePostFile(url, data) {
    try {
      this.errorMessage = '';
      this.errorCode = 0;

      const response = await postFile(url, data);

      return this.handleResponse(response);
    } catch (error) {
      console.log(error);
      this.errorMessage = error.message;
      this.errorCode = 1000;

      return null;
    }
  }

  handleResponse(response) {
    try {
      if (!utils.isJsonString(response.data)) {
        this.errorMessage = strings.notValidJson;

        return null;
      }

      if (response.data._result !== '1') {
        this.errorMessage = response.data._error;
        this.errorCode = response.data._errorCode;
        this.handleError();

        return null;
      }

      return response.data;
    } catch (error) {
      console.log(error);
      this.errorMessage = error.message;
      this.errorCode = 1000;

      return null;
    }
  }

  handleError() {
    try {
      switch (this.errorCode) {
        case 1:
        case 2:
          this.logout();

          break;
        default:
          return;
      }
    } catch (error) {}

    return;
  }

  async logout() {
    try {
      const sqlite = new SqliteConnection(null);

      await sqlite.dropDb();

      RNRestart.Restart();
    } catch (error) {
      console.log(error);
    }
  }
}

export default Entity;
