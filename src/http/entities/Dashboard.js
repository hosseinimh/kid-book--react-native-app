import {DASHBOARD_API_URLS as API_URLS} from '../../constants';
import Entity from './Entity';

export class Dashboard extends Entity {
  constructor() {
    super();
  }

  async getItems() {
    return await this.handlePost(API_URLS.FETCH_ITEMS);
  }
}
