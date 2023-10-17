import type { UserPayload } from './user';

declare module 'h3' {
  interface H3EventContext {
    user: UserPayload;
    valid: boolean;
    token: string;
  }
}

export default {};
