import axios from 'axios';
import {Settings} from '../storage/models';

const createConfig = async () => {
  const settings = new Settings();
  let item = await settings.get();

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${item?.token}`,
    },
  };

  return config;
};

const createConfigWithoutToken = async () => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  return config;
};

const createFileConfig = () => {
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };

  return config;
};

export const get = async (url, data = null) => {
  const response = await axios.get(url, data, createConfig());

  return response;
};

export const post = async (url, data = null) => {
  const response = await axios.post(url, data, await createConfig());

  return response;
};

export const postWithoutToken = async (url, data = null) => {
  const response = await axios.post(url, data, createConfigWithoutToken());

  return response;
};

export const postFile = async (url, data = null) => {
  const response = await axios.post(url, data, createFileConfig());

  return response;
};
