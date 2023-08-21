import { makeAutoObservable, runInAction } from "mobx";
import { Profile } from "../models/Profile";
import api from "../api";
import { Post } from "../models/Post";
import { store } from "./store";

export default class profileStore {
  profile: Profile | null = null;
  userPostRegistry = new Map<string, Post>();
  loading = false;

  constructor() {
    makeAutoObservable(this);
  }

  get posts() {
    const postsFromRegistry = Array.from(this.userPostRegistry.values());
    return postsFromRegistry.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }

  loadProfile = async (username: string) => {
    this.loading = true;
    try {
      const profile = await api.Profiles.get(username);
      console.log(profile);
      runInAction(() => {
        this.profile = profile;
        this.loading = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => (this.loading = false));
    }
  };

  loadPosts = async (username: string) => {
    this.loading = true;
    const user = store.userStore.user;
    if (user) {
      try {
        const result = await api.Profiles.posts(username);
        runInAction(() => {
          result.forEach((post) => {
            post.isLiked = post.likes.some((l) => l.username === user.username);
            this.userPostRegistry.set(post.id, post);
          });
          this.loading = false;
        });
      } catch (error) {
        console.log(error);
        runInAction(() => (this.loading = false));
      }
    }
  };

  clearPosts = () => {
    this.userPostRegistry.clear();
  };
}
