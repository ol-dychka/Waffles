export interface chatComment {
  id: number;
  createdAt: Date;
  body: string;
  username: string;
  displayName: string;
  image: string;
  replies: chatComment[];
  indent: number;
}
