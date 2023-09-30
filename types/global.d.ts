type MustHaveKeys<V, K extends Record<string, V>> = K;

type Validator<T> = {
  [P in keyof T]: (v: string, ...args) => boolean; //{ message: string; valid: boolean };
};
