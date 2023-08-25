import { makeAutoObservable, runInAction } from "mobx";
import { Profile } from "../models/Profile";
import api from "../api";
import { Post } from "../models/Post";
import { store } from "./store";

export default class profileStore {
  profile: Profile | null = null;
  userPostRegistry = new Map<string, Post>();
  loading = false;
  editing = false;

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

  uploadPhoto = async (file: Blob) => {
    this.editing = true;
    try {
      const response = await api.Profiles.uploadPhoto(file);
      const photo = response.data;
      store.userStore.setImage(photo.url);
      runInAction(() => {
        if (this.profile) {
          this.profile.image = photo.url;
        }
        this.editing = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => (this.editing = false));
    }
  };

  deletePhoto = async () => {
    this.editing = true;
    try {
      await api.Profiles.deletePhoto();
      store.userStore.removeImage();
      runInAction(() => {
        if (this.profile) this.profile.image = undefined;
        this.editing = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => (this.editing = false));
    }
  };

  updateProfile = async (profile: Partial<Profile>) => {
    this.editing = true;
    try {
      await api.Profiles.updateProfile(profile);
      runInAction(() => {
        if (
          profile.displayName &&
          profile.displayName !== store.userStore.user?.displayName
        )
          store.userStore.setDisplayName(profile.displayName);
        this.profile = { ...this.profile, ...(profile as Profile) };
        this.editing = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => (this.editing = false));
    }
  };
}
