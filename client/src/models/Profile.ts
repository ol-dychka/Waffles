import { User } from "./User";

export interface IProfile {
  username: string;
  displayName: string;
  bio?: string;
  image?: string;
  following: boolean;
  followersCount: number;
  subscriptionsCount: number;
}

export class Profile implements IProfile {
  constructor(user: User) {
    this.username = user.username;
    this.displayName = user.displayName;
    this.image = user.image;
  }

  username: string;
  displayName: string;
  bio?: string;
  image?: string;
  following = false;
  followersCount = 0;
  subscriptionsCount = 0;
}

export interface Photo {
  id: string;
  url: string;
}

export enum Predicate {
  Followers = "followers",
  Subscriptions = "subscriptions",
  Friends = "friends",
}
