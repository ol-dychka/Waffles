import { makeAutoObservable, runInAction } from "mobx";
import { Post, PostFormValues } from "../models/Post";
import api from "../api";
import { v4 as uuid } from "uuid";

export default class postStore {
  postRegistry = new Map<string, Post>();
  selectedPost: Post | undefined = undefined;
  loading = false;

  constructor() {
    makeAutoObservable(this);
  }

  get posts() {
    const postsFromRegistry = Array.from(this.postRegistry.values());
    return postsFromRegistry.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }

  loadPosts = async () => {
    this.loading = true;
    try {
      const result = await api.Posts.list();
      runInAction(() => {
        result.forEach((post) => {
          this.postRegistry.set(post.id, post);
        });
        console.log(this.postRegistry);
        this.loading = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => (this.loading = false));
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
    post.id = uuid();
    post.date = new Date();
    try {
      await api.Posts.create(post);
      runInAction(() => {
        this.postRegistry.set(post.id!, new Post(post));
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
}
