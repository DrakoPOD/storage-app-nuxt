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
