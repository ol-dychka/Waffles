import { makeAutoObservable, reaction, runInAction } from "mobx";
import { Predicate, Profile } from "../models/Profile";
import api from "../api";
import { Post } from "../models/Post";
import { store } from "./store";

export default class profileStore {
  profile: Profile | null = null;
  userPostRegistry = new Map<string, Post>();
  loading = false;
  editing = false;
  followings: Profile[] = [];
  loadingFollowings = false;
  predicate = Predicate.Followers;

  constructor() {
    makeAutoObservable(this);

    reaction(
      () => this.predicate,
      (predicate) => {
        if (this.profile) this.loadFollowings(this.profile.username, predicate);
      }
    );
  }

  get posts() {
    const postsFromRegistry = Array.from(this.userPostRegistry.values());
    return postsFromRegistry.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }

  setPredicate = (predicate: Predicate) => {
    this.predicate = predicate;
  };

  loadProfile = async (username: string) => {
    this.loading = true;
    try {
      const profile = await api.Profiles.get(username);
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
      // freezes ???
      runInAction(() => {
        this.profile!.image = undefined;
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

  updateFollowing = async (username: string, setTo: boolean) => {
    this.editing = true;
    try {
      await api.Profiles.updateFollowing(username);
      store.postStore.updateFollowing(username);
      runInAction(() => {
        this.updatePostFollowing(username);
        this.updateSelfFollowings(setTo);
        if (
          this.profile &&
          this.profile.username !== store.userStore.user?.username
        ) {
          setTo ? this.profile.followersCount++ : this.profile.followersCount--;
          this.profile.following = !this.profile.following;
        }
        this.followings.forEach((profile) => {
          if (profile.username === username) {
            profile.following
              ? profile.followersCount--
              : profile.followersCount++;
            profile.following = !profile.following;
          }
        });
        this.editing = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => (this.editing = false));
    }
  };

  updatePostFollowing = (username: string) => {
    this.userPostRegistry.forEach((post) => {
      post.creator!.following = !post.creator!.following;
      post.likes.forEach((like) => {
        if (like.username === username) {
          like.following ? like.followersCount-- : like.followersCount++;
          like.following = !like.following;
        }
      });
    });
  };

  loadFollowings = async (username: string, predicate: string) => {
    this.loadingFollowings = true;
    try {
      const followings = await api.Profiles.listFollowings(username, predicate);
      runInAction(() => {
        this.followings = followings;
        this.loadingFollowings = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => (this.loadingFollowings = false));
    }
  };

  updateSelfFollowings = (setTo: boolean) => {
    if (
      this.profile &&
      this.profile.username === store.userStore.user?.username
    ) {
      setTo
        ? this.profile.subscriptionsCount++
        : this.profile.subscriptionsCount--;
    }
  };
}
