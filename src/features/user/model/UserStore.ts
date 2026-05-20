import { makeAutoObservable } from 'mobx';
import type { RootStore } from '@/shared/lib/mobxStore';
import type { User } from '@/entities/User/model/types';

export class UserStore {
  private rootStore: RootStore;

  constructor(rootStore: RootStore) {
    makeAutoObservable(this);
    this.rootStore = rootStore;
  }

  get profile(): User | null {
    return this.rootStore.authStore.user;
  }
}