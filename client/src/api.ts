import axios, { AxiosResponse } from "axios";
import { Post, PostFormValues } from "./models/Post";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;
//axios.defaults.baseURL = "http://localhost:5000/api";

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T>(url: string, body: {}) =>
    axios.post<T>(url, body).then(responseBody),
  put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
  del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
};

const Posts = {
  list: () => requests.get<Post[]>("/posts"),
  single: (id: string) => requests.get<Post>(`/posts/${id}`),
  create: (post: PostFormValues) => requests.post<void>("/posts", post),
  delete: (id: string) => requests.del<void>(`/posts/${id}`),
};

const api = {
  Posts,
};

export default api;
