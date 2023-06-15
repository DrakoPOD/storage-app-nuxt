import passport from 'passport';
import { Strategy } from 'passport-local';
import crypto from 'crypto';

// generate example password with salt
const pass = {
  password: 'password',
  salt: '02ec9ed8b3d29800e57e22474a81b464',
  hashed: '83a8953bf132eccf55e661115e6cd10f9f9c46bcc60577e563521de5ed849cd288e8884145b77eb76c9cebf6acfdd3e10117a6364660fd9e6496205ac1c01b40',
};

passport.use(
  new Strategy(function verify(username, password, cb) {
    crypto.pbkdf2(
      password,
      pass.salt,
      100000,
      64,
      'sha512',
      (err, hashedPassword) => {
        if (err) {
          return cb(err);
        }

        if (!crypto.timingSafeEqual(Buffer.from(pass.hashed), hashedPassword)) {
          return cb(null, false, {
            message: 'Incorrect password or user name.',
          });
        }

        return cb(null, { username, password });
      }
    );
  })
);
