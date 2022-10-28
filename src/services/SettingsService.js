import {Settings as Model} from '../storage/models';

export const isConnected = async () => {
  try {
    const model = new Model();
    const result = await model.get();

    if (result?.server_connected_at) {
      const connectedTimestamp = Date.parse(result.server_connected_at);
      const currentTimestamp = Date.parse(new Date());

      if (
        !isNaN(connectedTimestamp) &&
        currentTimestamp <= connectedTimestamp * 60 * 1000
      ) {
        return true;
      }
    }
  } catch {}

  return false;
};
