export interface Auth {
  token: string | null;
  user: string | null;
  email: string | null;
  admin: boolean;
  validToken: boolean;
}
