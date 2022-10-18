import {STORY_ITEMS_API_URLS as API_URLS} from '../../constants';
import Entity from './Entity';

export class StoryItem extends Entity {
  constructor() {
    super();
  }

  async getAll(storyId) {
    return await this.handlePost(API_URLS.FETCH_STORY_ITEMS + '/' + storyId);
  }

  async get(id) {
    return await this.handlePost(API_URLS.FETCH_STORY_ITEM + '/' + id);
  }
}
