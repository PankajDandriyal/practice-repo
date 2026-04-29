export interface User {
  id: number;
  name: string;
  email: string;
  company: {
    name: string;
  };
}

export interface UserState {
  data: User[];
  loading: boolean;
  error: string | null;
}