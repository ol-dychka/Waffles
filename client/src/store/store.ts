import { createContext, useContext } from "react";
import postStore from "./postStore";
import appStore from "./appStore";
import userStore from "./userStore";
import profileStore from "./profileStore";
import commentStore from "./commentStore";

interface Store {
  postStore: postStore;
  appStore: appStore;
  userStore: userStore;
  profileStore: profileStore;
  commentStore: commentStore;
}

export const store: Store = {
  postStore: new postStore(),
  appStore: new appStore(),
  userStore: new userStore(),
  profileStore: new profileStore(),
  commentStore: new commentStore(),
};

export const StoreContext = createContext(store);

export const useStore = () => {
  return useContext(StoreContext);
};
