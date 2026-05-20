import { UserStore } from './user';
import { QuotesStore } from './quotes';
import { SettingsStore } from './settings';
import React from 'react';

export class RootStore {
  userStore: UserStore;
  quotesStore: QuotesStore;
  settingsStore: SettingsStore;

  constructor() {
    this.userStore = new UserStore(this);
    this.quotesStore = new QuotesStore(this);
    this.settingsStore = new SettingsStore(this);
  }
}

export const rootStore = new RootStore();
export const StoreContext = React.createContext<RootStore>(rootStore);
export const useStore = () => React.useContext(StoreContext);