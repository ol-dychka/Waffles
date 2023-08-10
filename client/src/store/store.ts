import { createContext, useContext } from "react";
import postStore from "./postStore";
import appStore from "./appStore";

interface Store {
  postStore: postStore;
  appStore: appStore;
}

export const store: Store = {
  postStore: new postStore(),
  appStore: new appStore(),
};

export const StoreContext = createContext(store);

export const useStore = () => {
  return useContext(StoreContext);
};
