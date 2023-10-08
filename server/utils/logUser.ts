import { useFetch } from '@vueuse/core';
import bcrypt from 'bcrypt';

export const comparePassword = async (password: string, hash: string) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, hash, (err, result) => {
      if (err) {
        resolve(500);
      }

      if (!result) {
        resolve(400);
      }

      resolve(200);
    });
  });
};

export const getGeoLocation = async (ip: string) => {
  if (ip == '127.0.0.1') {
    return Promise.resolve('local');
  }
  const { data, error } = await useFetch(
    `https://api.ip2location.io/?key=CA3A7B127F778511311AA3445B249680&ip=${ip}`,
    {
      // initialCache: false,
    }
  );
  if (error.value) {
    console.log(error);
    return Promise.resolve(null);
  }
  return Promise.resolve(data.value);
};
