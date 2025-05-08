export type RegisterUser = {
  name: string;
  email: string;
  mobileNo: string;
  password: string;
  confirmPassword: string;
};
export type LoginUser = {
  identifier: string;
  password: string;
};
