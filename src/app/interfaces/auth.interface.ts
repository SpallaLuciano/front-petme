export interface Auth {
  token: string | null;
  user: number | null;
  email: string | null;
  admin: boolean;
  validToken: boolean;
  isSignedUp: boolean;
  isEmailValidated: boolean;
}
