import {
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
} from "@microsoft/signalr";
import { chatComment } from "../models/Comment";
import { makeAutoObservable, runInAction } from "mobx";
import { store } from "./store";

export default class commentStore {
  comments: chatComment[] = [];
  hubConnection: HubConnection | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  get formattedComments() {
    // console.log(JSON.stringify(this.comments));
    return this.commentDFS(this.comments, 0);
  }

  commentDFS = (comments: chatComment[], depth: number) => {
    var list: chatComment[] = [];
    for (let i = 0; i < comments.length; i++) {
      let c = comments[i];
      c.indent = depth;
      list.push(c);
      if (c.replies === null) continue;
      list = list.concat(this.commentDFS(c.replies, depth + 1));
    }
    return list;
  };

  createHubConnection = (postId: string) => {
    if (store.postStore.selectedPost) {
      this.hubConnection = new HubConnectionBuilder()
        .withUrl("http://localhost:5000/chat?postId=" + postId, {
          accessTokenFactory: () => store.userStore.user?.token!,
        })
        .withAutomaticReconnect()
        .configureLogging(LogLevel.Information)
        .build();

      this.hubConnection
        .start()
        .catch((error) =>
          console.log("Error establishing the connection: ", error)
        );
      this.hubConnection.on("LoadComments", (comments: chatComment[]) => {
        runInAction(() => {
          comments.forEach((comment) => {
            comment.createdAt = new Date(comment.createdAt + "Z");
          });
          this.comments = comments;
        });
      });
      this.hubConnection.on("ReceiveComment", (comment: chatComment) => {
        runInAction(() => {
          comment.createdAt = new Date(comment.createdAt);
          this.comments.push(comment);
        });
      });
    }
  };

  stopHubConnection = () => {
    this.hubConnection
      ?.stop()
      .catch((error) => console.log("Error stopping the connection: ", error));
  };

  clearComments = () => {
    this.comments = [];
    this.stopHubConnection();
  };

  addComment = async (values: any, comment: chatComment) => {
    values.postId = store.postStore.selectedPost?.id;
    if (comment) values.commentId = comment.id;
    try {
      await this.hubConnection?.invoke("SendComment", values);
    } catch (error) {
      console.log(error);
    }
  };
}
