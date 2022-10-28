import axios from 'axios';

import {Settings} from '../storage/models';

const TIMEOUT = 5000;

const createFileConfig = () => {
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };

  return config;
};

export const post = async (url, data = null) => {
  let response = null;
  const source = axios.CancelToken.source();
  const settings = new Settings();
  const item = await settings.get();

  setTimeout(() => {
    if (response === null) {
      source.cancel();
    }
  }, TIMEOUT);

  try {
    response = await axios.post(url, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${item?.token}`,
      },
      cancelToken: source.token,
    });

    return response;
  } catch {}

  return null;
};

export const postWithoutToken = async (url, data = null) => {
  let response = null;
  const source = axios.CancelToken.source();

  setTimeout(() => {
    if (response === null) {
      source.cancel();
    }
  }, TIMEOUT);

  try {
    response = await axios.post(url, data, {
      headers: {
        'Content-Type': 'application/json',
      },
      cancelToken: source.token,
    });

    return response;
  } catch {}

  return null;
};

export const postFile = async (url, data = null) => {
  const response = await axios.post(url, data, createFileConfig());

  return response;
};
