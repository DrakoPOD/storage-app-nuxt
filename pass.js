const crypto = require('crypto');

// generate example password with salt
let pass = {
  password: 'password',
  salt: crypto.randomBytes(16).toString('hex'),
  hashed: '',
};

// hash password with salt
crypto.pbkdf2(
  pass.password,
  pass.salt,
  100000,
  64,
  'sha512',
  (err, hashedPassword) => {
    if (err) {
      console.log(err);
    }

    pass.hashed = hashedPassword.toString('hex');
    console.log(pass);
  }
);

// Sincronizatee