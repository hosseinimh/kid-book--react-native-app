import {get, post, postFile, postWithoutToken} from '../http';
import {utils} from '../../utils';
import {utils as strings} from '../../constants/strings';
import {LoginService} from '../../services';

class Entity {
  constructor() {
    this.url == '';
    this.data = {};
    this.method = 'post';
    this.errorMessage = '';
    this.errorCode = 0;
  }

  async handlePost(url, data) {
    try {
      this.url = url;
      this.data = data;
      this.method = 'post';
      this.errorMessage = '';
      this.errorCode = 0;
      const response = await post(url, data);

      return await this.handleResponse(response);
    } catch (error) {
      console.warn('handlePost', error);
      this.errorMessage = error.message;
      this.errorCode = 1000;

      return null;
    }
  }

  async handlePostWithoutToken(url, data) {
    try {
      this.url = url;
      this.data = data;
      this.method = 'postWithoutToken';
      this.errorMessage = '';
      this.errorCode = 0;
      const response = await postWithoutToken(url, data);

      return await this.handleResponse(response);
    } catch (error) {
      console.warn('handlePostWithoutToken', error);
      this.errorMessage = error.message;
      this.errorCode = 1000;

      return null;
    }
  }

  async handleGet(url, data) {
    try {
      this.url = url;
      this.data = data;
      this.method = 'get';
      this.errorMessage = '';
      this.errorCode = 0;
      const response = await get(url, data);

      return await this.handleResponse(response);
    } catch (error) {
      console.warn('handleGet', error);
      this.errorMessage = error.message;
      this.errorCode = 1000;

      return null;
    }
  }

  async handlePostFile(url, data) {
    try {
      this.url = url;
      this.data = data;
      this.method = 'postFile';
      this.errorMessage = '';
      this.errorCode = 0;

      const response = await postFile(url, data);

      return await this.handleResponse(response);
    } catch (error) {
      console.warn('handlePostFile', error);
      this.errorMessage = error.message;
      this.errorCode = 1000;

      return null;
    }
  }

  async handleResponse(response) {
    try {
      if (!utils.isJsonString(response?.data)) {
        this.errorMessage = strings.notValidJson;

        return null;
      }

      if (response?.data?._result !== '1') {
        this.errorMessage = response.data._error;
        this.errorCode = response.data._errorCode;

        return await this.handleError();
      }

      return response.data;
    } catch (error) {
      console.warn('handleResponse', error);
      this.errorMessage = error.message;
      this.errorCode = 1000;

      return null;
    }
  }

  async handleError() {
    try {
      switch (this.errorCode) {
        case 1:
        case 2:
          return await this.logout();

          break;
        default:
          return;
      }
    } catch (error) {
      console.warn('handleError', error);
    }

    return null;
  }

  async logout() {
    try {
      if (await LoginService.login()) {
        switch (this.method) {
          case 'post':
            return await this.handlePost(this.url, this.data);
          case 'postWithoutToken':
            return await this.handlePostWithoutToken(this.url, this.data);
          case 'postFile':
            return await this.handlePostFile(this.url, this.data);
          case 'get':
            return await this.handleGet(this.url, this.data);
          default:
            return null;
        }
      }
    } catch (error) {
      console.warn('logout', error);
    }

    return null;
  }
}

export default Entity;
