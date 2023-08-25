import { makeAutoObservable, runInAction } from "mobx";
import { Post, PostFormValues } from "../models/Post";
import api from "../api";
import { v4 as uuid } from "uuid";
import { store } from "./store";
import { Photo, Profile } from "../models/Profile";

export default class postStore {
  postRegistry = new Map<string, Post>();
  selectedPost: Post | undefined = undefined;
  newPhoto: Photo | undefined = undefined;
  loading = false;
  uploading = false;

  constructor() {
    makeAutoObservable(this);

    // make a reaction for selectPost to load comments
    // from API when details page is opened
    // it can take a long time to do it as all posts load
  }

  get posts() {
    const postsFromRegistry = Array.from(this.postRegistry.values());
    return postsFromRegistry.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }

  loadPosts = async () => {
    this.loading = true;
    const user = store.userStore.user;
    if (user) {
      try {
        const result = await api.Posts.list();
        runInAction(() => {
          result.forEach((post) => {
            post.isLiked = post.likes.some((l) => l.username === user.username);
            this.postRegistry.set(post.id, post);
          });
          this.loading = false;
        });
      } catch (error) {
        console.log(error);
        runInAction(() => (this.loading = false));
      }
    }
  };

  loadPost = async (id: string) => {
    let post = this.postRegistry.get(id);
    if (post) {
      this.selectedPost = post;
    } else {
      try {
        post = await api.Posts.single(id);
        runInAction(() => {
          this.selectedPost = post;
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  clearSelectedPost = () => {
    this.selectedPost = undefined;
  };

  createPost = async (post: PostFormValues) => {
    // have to init fields before posting to backend
    const user = store.userStore.user;
    post.id = uuid();
    try {
      await api.Posts.create(post);
      const newPost = new Post(post);
      newPost.creator = new Profile(user!);
      newPost.date = new Date();
      newPost.likes = [];
      runInAction(() => {
        this.postRegistry.set(post.id!, newPost);
      });
    } catch (error) {
      console.log(error);
    }
  };

  deletePost = async (id: string) => {
    try {
      await api.Posts.delete(id);
      runInAction(() => {
        this.postRegistry.delete(id);
      });
    } catch (error) {
      console.log(error);
    }
  };

  updateLike = async (id: string) => {
    const user = store.userStore.user;
    const post = this.postRegistry.get(id);
    try {
      if (post?.isLiked) {
        runInAction(() => {
          post.likes = post.likes.filter((l) => l.username !== user?.username);
          post.isLiked = false;
        });
      } else {
        runInAction(() => {
          post?.likes.push(new Profile(user!));
          post!.isLiked = true;
        });
      }
      // calling API later because liking/disliking post should be instant.
      await api.Posts.like(id);
      // i guess postRegistry just updates object within itself automatically? we don't really need this next line
      // that is also the reason i had to use runInAction on post object in if-else block (because it updated postRegistry)
      //runInAction(() => this.postRegistry.set(id, post!));
    } catch (error) {
      console.log(error);
    }
  };
}
