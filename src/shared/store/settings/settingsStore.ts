import { SettingsStateStore } from './models/settingsStateStore';
import { SettingsSyncStore } from './models/settingsSyncStore';
import { SettingsAsyncStore } from './models/settingsAsyncStore';

class SettingsStore {
  state: SettingsStateStore;
  sync: SettingsSyncStore;
  async: SettingsAsyncStore;

  constructor(
    state: SettingsStateStore,
    sync: SettingsSyncStore,
    async: SettingsAsyncStore
  ) {
    this.state = state;
    this.sync = sync;
    this.async = async;
  }
}

const state = new SettingsStateStore();
const sync = new SettingsSyncStore(state);
const async = new SettingsAsyncStore(state, sync);

export const settingsStore = new SettingsStore(state, sync, async);