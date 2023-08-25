import { Photo, Profile } from "./Profile";

export interface Post {
  id: string;
  title: string;
  date: Date;
  description: string;
  category: string;
  image: string | null;
  creator: Profile;
  likes: Profile[];
  isLiked: boolean;
}

export class Post implements Post {
  constructor(init?: PostFormValues) {
    Object.assign(this, init);
  }
}

export class PostFormValues {
  id?: string = undefined;
  title: string = "";
  description?: string = "";
  photo?: Blob;
  category: string = "";
}

export enum Category {
  Humor = "Humor",
  Food = "Food",
  News = "News",
  Animals = "Animals",
  Sports = "Sports",
}
