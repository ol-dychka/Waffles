import { createContext, useContext } from "react";
import postStore from "./postStore";
import appStore from "./appStore";
import userStore from "./userStore";

interface Store {
  postStore: postStore;
  appStore: appStore;
  userStore: userStore;
}

export const store: Store = {
  postStore: new postStore(),
  appStore: new appStore(),
  userStore: new userStore(),
};

export const StoreContext = createContext(store);

export const useStore = () => {
  return useContext(StoreContext);
};
