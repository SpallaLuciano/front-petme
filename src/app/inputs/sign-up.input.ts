export interface SignUpInput {
  name: string;
  lastname: string;
  email: string;
  password: string;
  rePassword: string;
  birthdate: string | null;
}
