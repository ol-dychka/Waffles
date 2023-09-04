import { makeAutoObservable, runInAction } from "mobx";
import { User, UserFormValues } from "../models/User";
import api from "../api";
import { store } from "./store";
import { router } from "../layout/Routes";

export default class userStore {
  user: User | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  get isLogged() {
    return !!this.user;
  }

  login = async (creds: UserFormValues) => {
    try {
      const user = await api.Account.login(creds);
      store.appStore.setToken(user.token);
      runInAction(() => (this.user = user));
      router.navigate("/");
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  register = async (creds: UserFormValues) => {
    try {
      const user = await api.Account.register(creds);
      store.appStore.setToken(user.token);
      runInAction(() => (this.user = user));
      router.navigate("/");
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  getUser = async () => {
    try {
      const user = await api.Account.current();
      // uncomment when token lasts 1 minute or so and is refreshed
      //store.appStore.setToken(user.token);
      runInAction(() => (this.user = user));
    } catch (error) {
      console.log(error);
    }
  };

  logout = () => {
    store.appStore.setToken(null);
    this.user = null;
    //router.navigate("/welcome");
  };

  setImage = (image: string) => {
    this.user!.image = image;
  };

  removeImage = () => {
    this.user!.image = undefined;
  };

  setDisplayName = (displayName: string) => {
    if (this.user) this.user.displayName = displayName;
  };
}
