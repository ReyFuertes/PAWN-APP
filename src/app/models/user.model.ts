
export interface UserLogin {
  email: string;
  password: string;
  token?: string;
  branch: string;
}

export interface Branch {
  label: string;
  value: string;
}
