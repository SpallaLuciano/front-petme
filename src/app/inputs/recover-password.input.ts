export interface RecoverPasswordInput {
  email: string;
}

export interface ResetPasswordInput {
  password: string;
  rePassword: string;
  token?: string;
}
