export const inputValidations: Record<string, (value: string) => boolean> = {
  text: (value: string) => true,
  email: (value: string) => {
    const regex = /^[\w-\.]+[^_\-\.]@([\w-]+)\.+[\w.]{2,64}[^_\-\.]/;
    return regex.test(value);
  },
  number: (value: string) => !isNaN(Number(value)),
  password: (value: string) => true,
  textArea: (value: string) => true,
};

/*
regex: That group is the email address local-part and the second group is the domain name.
^([\w-.\_]+)@([\w-]+)\.+([\w-.]{2,64})
*/

export const useInputVuetify = {
  required: (value: string) => !!value || 'Required',
  min: (v: string) => (v && v.length >= 8) || 'Min 8 characters',
  emailMatch: (v: string) => {
    const pattern =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return pattern.test(v) || 'Invalid e-mail.';
  },
  safePassword: (v: string) => {
    const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    return (
      pattern.test(v) ||
      'Password must contain at least 8 characters, one uppercase, one lowercase and one number.'
    );
  },
  noNumbers: (v: string) => /[^0-9]/.test(v) || 'Cannot contain numbers',
  number: (v: string) => !isNaN(Number(v)) || 'Must be a number',
  minChars: (v: string) => (v && v.length >= 3) || 'Min 3 characters',
  fileSize: (v: File[]) => {
    return (
      !v ||
      !v.length ||
      v[0].size < 5000000 ||
      'Image size should be less than 5 MB!'
    );
  },
};
