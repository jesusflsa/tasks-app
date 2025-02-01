export type AuthType = {
  token: string;
  refresh_token: string;
  expires: number;
};

export type ErrorType = {
  errors: {
    [field: string]: string;
  }
}

export type ApiErrorType = {
  field: string;
  message: string;
};

export type UserType = {
  username: string;
};

export type ApiUserType = {
  username: string;
  email: string;
};
