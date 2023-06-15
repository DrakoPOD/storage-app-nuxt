interface IResponse {
  status: number;
  body: any;
}

export const useUploadFile = async (
  file: File,
  url: string,
  uploadProgress: globalThis.Ref<number> | null = null
): Promise<IResponse> => {
  return new Promise((resolve, reject) => {
    const formData = new FormData();
    formData.append('file', file);

    const xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    // url = 'http://localhost:3000' + url;

    xhr.open('POST', url, true);

    xhr.upload.onprogress = (event) => {
      if (uploadProgress) {
        uploadProgress.value = Math.round((event.loaded / event.total) * 100);
      }
    };

    xhr.onreadystatechange = () => {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          console.log('Uploaded!');
          resolve(xhr.response);
        } else {
          console.log('Error!');
          reject(xhr.response);
        }
      }
    };

    xhr.send(formData);
  });
};
