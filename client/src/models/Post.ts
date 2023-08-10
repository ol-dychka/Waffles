export interface Post {
  id: string;
  title: string;
  date: Date;
  description: string;
  category: string;
  image: string | null;
}

export class Post implements Post {
  constructor(init?: PostFormValues) {
    Object.assign(this, init);
  }
}

export class PostFormValues {
  id?: string = undefined;
  date?: Date;
  title: string = "";
  description: string = "";
  image: string = "";
  category: string = "";
}

export enum Category {
  Humor = "Humor",
  Food = "Food",
  News = "News",
  Animals = "Animals",
  Sports = "Sports",
}
