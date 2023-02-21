export interface IAuth {
    id: number;
    username: string;
    email: string;
    status?: 'loading' | 'fulfilled' | 'rejected';
  }
  