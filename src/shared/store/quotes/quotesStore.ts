import { QuotesStateStore } from './models/quotesStateStore';
import { QuotesSyncStore } from './models/quotesSyncStore';
import { QuotesAsyncStore } from './models/quotesAsyncStore';

class QuotesStore {
  state: QuotesStateStore;
  sync: QuotesSyncStore;
  async: QuotesAsyncStore;

  constructor(
    state: QuotesStateStore,
    sync: QuotesSyncStore,
    async: QuotesAsyncStore
  ) {
    this.state = state;
    this.sync = sync;
    this.async = async;
  }
}

const state = new QuotesStateStore();
const sync = new QuotesSyncStore(state);
const async = new QuotesAsyncStore(state, sync);

export const quotesStore = new QuotesStore(state, sync, async);