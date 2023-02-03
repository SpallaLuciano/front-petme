export interface SignUp {
  name: string;
  lastname: string;
  email: string;
  password: string;
  rePassword: string;
  birthdate: string | null;
}

export interface Registration {
  isSignedUp: boolean;
  error: string | null;
}

export interface Confirmation {
  isConfirmed: boolean;
  error: string | null;
}
