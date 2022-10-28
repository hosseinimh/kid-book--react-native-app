const appConfig = require('../../app-config.json');
let {serverUrl} = appConfig;
serverUrl += '/app/download';

const ResourceUrls = {
  STORY_THUMBNAIL: `${serverUrl}?type=STORY_THUMBNAIL&filename=`,
  STORY_IMAGE: `${serverUrl}?type=STORY_IMAGE&filename=`,
  STORY_ITEM_IMAGE: `${serverUrl}?type=STORY_ITEM_IMAGE&filename=`,
  AUTHOR_IMAGE: `${serverUrl}?type=AUTHOR_IMAGE&filename=`,
  TRANSLATOR_IMAGE: `${serverUrl}?type=TRANSLATOR_IMAGE&filename=`,
  SPEAKER_IMAGE: `${serverUrl}?type=SPEAKER_IMAGE&filename=`,
};

export default ResourceUrls;
