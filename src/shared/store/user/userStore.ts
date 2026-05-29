import { UserStateStore } from './models/userStateStore';
import { UserSyncStore } from './models/userSyncStore';
import { UserAsyncStore } from './models/userAsyncStore';
import type { RootStore } from '../index';

class UserStore {
  state: UserStateStore;
  sync: UserSyncStore;
  async: UserAsyncStore;

  constructor(
    state: UserStateStore,
    sync: UserSyncStore,
    async: UserAsyncStore
  ) {
    this.state = state;
    this.sync = sync;
    this.async = async;
  }
}

const state = new UserStateStore();
const sync = new UserSyncStore(state);

// Временно создаём async без rootStore, затем установим
const async = new UserAsyncStore(state, sync);
export const userStore = new UserStore(state, sync, async);

// Функция для установки rootStore после создания корневого хранилища
export const setUserStoreRoot = (rootStore: RootStore) => {
  userStore.async.setRootStore(rootStore);
};