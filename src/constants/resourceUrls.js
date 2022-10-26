const appConfig = require('../../app-config.json');
const {serverUrl} = appConfig;

const ResourceUrls = {
  STORY_THUMBNAIL: `${serverUrl}/storage/stories/thumbnails`,
  STORY_IMAGE: `${serverUrl}/storage/stories/images`,
  STORY_ITEM_IMAGE: `${serverUrl}/storage/story_items/images`,
  AUTHOR_IMAGE: `${serverUrl}/storage/authors/avatars`,
  TRANSLATOR_IMAGE: `${serverUrl}/storage/translators/avatars`,
  SPEAKER_IMAGE: `${serverUrl}/storage/speakers/avatars`,
};

export default ResourceUrls;
