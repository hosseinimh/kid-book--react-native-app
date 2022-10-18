import {SPEAKERS_API_URLS as API_URLS} from '../../constants';
import Entity from './Entity';

export class Speaker extends Entity {
  constructor() {
    super();
  }

  async paginate(_pn = 1, _pi = 10) {
    return await this.handlePost(API_URLS.FETCH_SPEAKERS, {
      _pn,
      _pi,
    });
  }

  async get(id) {
    return await this.handlePost(API_URLS.FETCH_SPEAKER + '/' + id);
  }
}
