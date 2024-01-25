import { makeAutoObservable, reaction, runInAction } from "mobx";
import {
  Category,
  FilterPredicate,
  Post,
  PostFormValues,
} from "../models/Post";
import api from "../api";
import { v4 as uuid } from "uuid";
import { store } from "./store";
import { Photo, Profile } from "../models/Profile";
import { Pagination, PagingParams } from "../models/Pagination";

export default class postStore {
  postRegistry = new Map<string, Post>();
  selectedPost: Post | undefined = undefined;
  newPhoto: Photo | undefined = undefined;
  loading = false;
  uploading = false;
  pagination: Pagination | null = null;
  pagingParams = new PagingParams();
  predicate = new Map().set(FilterPredicate.All, true);

  constructor() {
    makeAutoObservable(this);

    // make a reaction for selectPost to load comments
    // from API when details page is opened
    // it can take a long time to do it as all posts load
    reaction(
      () => this.predicate.keys(),
      () => {
        this.pagingParams = new PagingParams();
        this.postRegistry.clear();
        this.loadPosts();
      }
    );
  }

  get posts() {
    const postsFromRegistry = Array.from(this.postRegistry.values());
    return postsFromRegistry.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }

  get axiosParams() {
    const params = new URLSearchParams();
    params.append("pageNumber", this.pagingParams.pageNumber.toString());
    params.append("pageSize", this.pagingParams.pageSize.toString());
    this.predicate.forEach((value, key) => {
      params.append(key, value);
    });
    return params;
  }

  setPredicate = (predicate: FilterPredicate, value?: Category) => {
    const resetPredicate = () => {
      this.predicate.forEach((_, key) => {
        this.predicate.delete(key);
      });
    };
    switch (predicate) {
      case FilterPredicate.IsFollowed:
        resetPredicate();
        this.predicate.set(FilterPredicate.IsFollowed, true);
        break;
      case FilterPredicate.IsLiked:
        resetPredicate();
        this.predicate.set(FilterPredicate.IsLiked, true);
        break;
      case FilterPredicate.Category:
        resetPredicate();
        this.predicate.set(FilterPredicate.Category, value);
        break;
      case FilterPredicate.All:
        resetPredicate();
        this.predicate.set(FilterPredicate.All, value);
        break;
      default:
        resetPredicate();
        this.predicate.set(FilterPredicate.All, true);
        break;
    }
  };

  setPagingParams = (pagingParams: PagingParams) => {
    this.pagingParams = pagingParams;
  };

  loadPosts = async () => {
    this.loading = true;
    const user = store.userStore.user;
    if (user) {
      try {
        const result = await api.Posts.list(this.axiosParams);
        runInAction(() => {
          result.data.data.forEach((post) => {
            post.isLiked = post.likes.some((l) => l.username === user.username);
            this.postRegistry.set(post.id, post);
          });
          this.setPagination(result.data.pagination);
          this.loading = false;
        });
      } catch (error) {
        console.log(error);
        runInAction(() => (this.loading = false));
      }
    }
  };

  setPagination = (pagination: Pagination) => {
    this.pagination = pagination;
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
      newPost.image = "/placeholder.png";
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
    let post: Post | undefined;
    if (store.profileStore.userPostRegistry.size > 0) {
      post = store.profileStore.userPostRegistry.get(id);
    } else {
      post = this.postRegistry.get(id);
    }
    console.log("updating like");
    console.log(post);
    try {
      if (post?.isLiked) {
        runInAction(() => {
          post!.likes = post!.likes.filter(
            (l) => l.username !== user?.username
          );
          post!.isLiked = false;
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

  updateFollowing = (username: string) => {
    this.postRegistry.forEach((post) => {
      if (post.creator!.username === username) {
        post.creator!.following = !post.creator!.following;
      }
      post.likes.forEach((like) => {
        if (like.username === username) {
          like.following ? like.followersCount-- : like.followersCount++;
          like.following = !like.following;
        }
      });
    });
  };
}
