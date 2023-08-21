import axios, { AxiosResponse } from "axios";
import { Post, PostFormValues } from "./models/Post";
import { User, UserFormValues } from "./models/User";
import { store } from "./store/store";
import { Profile } from "./models/Profile";

const sleep = (delay: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
};

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

axios.interceptors.response.use(async (response) => {
  if (process.env.NODE_ENV === "development") await sleep(1000);
  return response;
});

axios.interceptors.request.use((config) => {
  const token = store.appStore.token;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

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
  like: (id: string) => requests.post<void>(`/posts/${id}/like`, {}),
};

const Account = {
  current: () => requests.get<User>("/account"),
  login: (user: UserFormValues) => requests.post<User>("/account/login", user),
  register: (user: UserFormValues) =>
    requests.post<User>("/account/register", user),
};

const Profiles = {
  get: (username: string) => requests.get<Profile>(`/profiles/${username}`),
  posts: (username: string) =>
    requests.get<Post[]>(`/profiles/${username}/posts`),
};

const api = {
  Posts,
  Account,
  Profiles,
};

export default api;
