import { userStore } from './user/userStore';
import { quotesStore } from './quotes/quotesStore';
import { settingsStore } from './settings/settingsStore';
import React from 'react';

class RootStore {
  userStore = userStore;
  quotesStore = quotesStore;
  settingsStore = settingsStore;
}

export const rootStore = new RootStore();
export const StoreContext = React.createContext(rootStore);
export const useStore = () => React.useContext(StoreContext);

export type { RootStore };