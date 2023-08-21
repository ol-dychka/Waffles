import { User } from "./User";

export interface Profile {
  username: string;
  displayName: string;
  bio?: string;
  image?: string;
}

export class Profile implements Profile {
  constructor(user: User) {
    this.username = user.username;
    this.displayName = user.displayName;
    this.image = user.image;
  }
}
