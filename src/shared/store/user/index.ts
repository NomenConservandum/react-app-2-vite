import { UserState } from './models/userState';
import { UserSync } from './models/userSync';
import { UserAsync } from './models/userAsync';
import type { RootStore } from '../index';

export class UserStore {
  state: UserState;
  sync: UserSync;
  async: UserAsync;

  constructor(rootStore: RootStore) {
    this.state = new UserState();
    this.sync = new UserSync(this.state);
    this.async = new UserAsync(this.state, this.sync, rootStore);
    
    // Инициализация auth после создания async
    this.async.initializeAuth();
    
    // Привязываем методы
    this.login = this.login.bind(this);
    this.register = this.register.bind(this);
    this.logout = this.logout.bind(this);
    this.checkAuth = this.checkAuth.bind(this);
  }

  // Прокси для удобства использования
  get user() { return this.state.user; }
  get isAuth() { return this.state.isAuth; }
  get accessToken() { return this.state.accessToken; }
  get isInitialized() { return this.state.isInitialized; }
  
  // Прокси для методов
  login(credentials: any) {
    return this.async.login(credentials);
  }

  register(data: any) {
    return this.async.register(data);
  }

  logout() {
    return this.sync.logout();
  }

  checkAuth() {
    return this.async.checkAuth();
  }
}