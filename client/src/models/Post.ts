import { Profile } from "./Profile";

export interface IPost {
  id: string;
  title: string;
  date: Date;
  description: string;
  category: string;
  image: string | null;
  creator?: Profile;
  likes: Profile[];
  isLiked: boolean;
}

export class Post implements IPost {
  constructor(init: PostFormValues) {
    this.id = init.id!;
    this.title = init.title;
    if (init.description) this.description = init.description;
    this.category = init.category;
  }

  id: string;
  title: string;
  date: Date = new Date();
  description: string = "";
  category: string;
  image: string | null = null;
  creator?: Profile;
  likes: Profile[] = [];
  isLiked: boolean = false;
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
