import { PaletteMode } from "@mui/material";
import { makeAutoObservable, reaction } from "mobx";
import { ServerError } from "../models/ServerError";

export default class appStore {
  // persist mode in cookie
  mode: PaletteMode = localStorage.getItem("mode")
    ? (localStorage.getItem("mode") as PaletteMode)
    : "light";
  token: string | null = localStorage.getItem("jwt");
  appLoaded = false;
  error: ServerError | null = null;

  constructor() {
    makeAutoObservable(this);

    // doesn't work 1st time (initialization in class)
    // token is set in store -> sets token in localstore, so when reopen token stays in store.
    // token is set to null -> basically logout, nothing in localstore, reopen and have to login.
    reaction(
      () => this.token,
      (token) => {
        if (token) {
          localStorage.setItem("jwt", token);
        } else {
          localStorage.removeItem("jwt");
        }
      }
    );

    reaction(
      () => this.mode,
      (mode) => {
        localStorage.setItem("mode", mode);
      }
    );
  }

  setServerError(error: ServerError) {
    this.error = error;
  }

  changeMode = () => {
    this.mode = this.mode === "light" ? "dark" : "light";
  };

  setToken = (token: string | null) => {
    this.token = token;
  };

  setAppLoaded = () => {
    this.appLoaded = true;
  };
}
