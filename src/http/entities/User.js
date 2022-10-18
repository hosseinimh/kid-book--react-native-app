import {USERS_API_URLS as API_URLS} from '../../constants';
import Entity from './Entity';

export class User extends Entity {
  constructor() {
    super();
  }

  async get(id) {
    return await this.handlePost(API_URLS.FETCH_USER + '/' + id);
  }

  async signUp() {
    return await this.handlePostWithoutToken(API_URLS.SIGN_UP);
  }

  async getToken(username) {
    return await this.handlePostWithoutToken(API_URLS.GET_TOKEN, {
      username,
    });
  }
}
