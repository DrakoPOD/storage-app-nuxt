import { useStorage } from '@vueuse/core';

export const useGet = async <T>(
  url: string,
  params: Record<string, any>,
  query: object = {},
  cache: boolean = true
): Promise<T> => {
  url += '?';
  url += new URLSearchParams(params).toString();

  if (query) {
    url += '&';
    url += new URLSearchParams({ query: JSON.stringify(query) }).toString();
  }

  const cached = useStorage<T>(url, null);

  if (cache) {
    if (cached.value) {
      return Promise.resolve(cached.value);
    }
  }

  const { data, error } = await useFetch(url, {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (error.value) {
    console.error(error);
    return Promise.reject(error);
  }

  if (cache) {
    cached.value = data.value as T;
  }

  return Promise.resolve(data.value!) as T;
};

export const usePost = async <T>(
  url: string,
  body: { db: { type: string }; data: any },
  params: Record<string, any> | null = null
) => {
  // if params include params, add them to the url
  if (params) {
    url += '?';
    url += new URLSearchParams(params).toString();
  }

  const { data, error } = await useFetch(url, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
    watch: false,
  });

  if (error.value) {
    console.error(error.value);
    return Promise.reject(error.value);
  }

  useStorage<T>(url, data.value as T);

  return Promise.resolve(data.value!) as T;
};
