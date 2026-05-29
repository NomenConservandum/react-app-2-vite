import { makeAutoObservable } from 'mobx';
import type { User } from '@/entities/User/model/types';

export class UserStateStore {
  user: User | null = null;
  isAuth: boolean = false;
  accessToken: string | null = null;
  isInitialized: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }
}