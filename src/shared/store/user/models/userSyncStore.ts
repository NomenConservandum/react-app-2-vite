import { makeAutoObservable } from 'mobx';
import type { UserStateStore } from './userStateStore';
import type { User } from '@/entities/User/model/types';
import { setTokens, removeTokens } from '@/shared/utils/cookie';

export class UserSyncStore {
  constructor(private state: UserStateStore) {
    makeAutoObservable(this);
  }

  setAuth(response: any) {
    let token = null;
    let userData = null;

    if (typeof response === 'string') {
      token = response;
    } else if (response.accessToken) {
      token = response.accessToken;
      userData = response.user;
    } else if (response.token) {
      token = response.token;
      userData = response.user;
    }

    if (token) {
      this.state.accessToken = token;
      this.state.isAuth = true;
      setTokens(token, token);
    }

    if (userData) {
      this.state.user = userData;
    }
  }

  logout() {
    this.state.user = null;
    this.state.accessToken = null;
    this.state.isAuth = false;
    removeTokens();
  }

  setUser(user: User) {
    this.state.user = user;
  }

  setInitialized(value: boolean) {
    this.state.isInitialized = value;
  }
}