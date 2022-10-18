const appConfig = require('../../app-config.json');
const {serverUrl} = appConfig;

const ResourceUrls = {
  STORY_IMAGE: `${serverUrl}/storage/stories/thumbnails`,
};

export default ResourceUrls;
